-- Traka uses dedicated objects in the existing Supabase project.
create table public.traka_members (
 email text primary key check (email=lower(email)),
 role text not null default 'owner' check (role in ('owner','member')),
 created_at timestamptz not null default now()
);
alter table public.traka_members enable row level security;
revoke all on public.traka_members from anon, authenticated;
grant select on public.traka_members to authenticated;
create policy traka_member_self on public.traka_members for select to authenticated
 using (email=lower((select auth.jwt())->>'email'));

create table public.traka_records (
 id text primary key check (length(id) between 1 and 100),
 kind text not null check (kind in ('client','project','task','event','document','tool','lead')),
 data jsonb not null check (jsonb_typeof(data)='object'),
 client_id text generated always as (nullif(data->>'clientId','')) stored references public.traka_records(id) on delete restrict,
 project_id text generated always as (nullif(data->>'projectId','')) stored references public.traka_records(id) on delete restrict,
 version integer not null default 1 check (version>0),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 created_by uuid default auth.uid(),
 constraint traka_record_name check (length(trim(data->>'name')) between 1 and 180),
 constraint traka_project_client check (kind<>'project' or client_id is not null),
 constraint traka_child_project check (kind not in ('task','document') or project_id is not null)
);
create index traka_records_kind_updated_idx on public.traka_records(kind,updated_at desc);
create index traka_records_client_idx on public.traka_records(client_id) where client_id is not null;
create index traka_records_project_idx on public.traka_records(project_id) where project_id is not null;
create unique index traka_records_file_idx on public.traka_records((data->>'fileKey')) where kind='document' and nullif(data->>'fileKey','') is not null;
alter table public.traka_records enable row level security;
revoke all on public.traka_records from anon, authenticated;
grant select,insert,update,delete on public.traka_records to authenticated;
create policy traka_read on public.traka_records for select to authenticated
 using (exists(select 1 from public.traka_members where email=lower((select auth.jwt())->>'email')));
create policy traka_insert on public.traka_records for insert to authenticated
 with check (exists(select 1 from public.traka_members where email=lower((select auth.jwt())->>'email')));
create policy traka_update on public.traka_records for update to authenticated
 using (exists(select 1 from public.traka_members where email=lower((select auth.jwt())->>'email')))
 with check (exists(select 1 from public.traka_members where email=lower((select auth.jwt())->>'email')));
create policy traka_delete on public.traka_records for delete to authenticated
 using (exists(select 1 from public.traka_members where email=lower((select auth.jwt())->>'email')));

create function public.traka_record_guard() returns trigger
 language plpgsql security invoker set search_path='' as $$
begin
 if tg_op='UPDATE' then
  if new.id<>old.id or new.kind<>old.kind then raise exception 'Record identity cannot change'; end if;
  new.version:=old.version+1; new.created_at:=old.created_at; new.created_by:=old.created_by;
 else
  new.version:=1; new.created_at:=now(); new.created_by:=auth.uid();
 end if;
 new.updated_at:=now();
 if nullif(new.data->>'clientId','') is not null and not exists(select 1 from public.traka_records where id=new.data->>'clientId' and kind='client') then raise exception 'Invalid client reference' using errcode='23503'; end if;
 if nullif(new.data->>'projectId','') is not null and not exists(select 1 from public.traka_records where id=new.data->>'projectId' and kind='project') then raise exception 'Invalid project reference' using errcode='23503'; end if;
 return new;
end; $$;
revoke all on function public.traka_record_guard() from public;
create trigger traka_record_guard before insert or update on public.traka_records for each row execute function public.traka_record_guard();

insert into storage.buckets(id,name,public,file_size_limit) values('traka-documents','traka-documents',false,20971520);
create policy traka_storage_select on storage.objects for select to authenticated
 using (bucket_id='traka-documents' and exists(select 1 from public.traka_members where email=lower((select auth.jwt())->>'email')));
create policy traka_storage_insert on storage.objects for insert to authenticated
 with check (bucket_id='traka-documents' and exists(select 1 from public.traka_members where email=lower((select auth.jwt())->>'email')));
create policy traka_storage_delete on storage.objects for delete to authenticated
 using (bucket_id='traka-documents' and exists(select 1 from public.traka_members where email=lower((select auth.jwt())->>'email')));
