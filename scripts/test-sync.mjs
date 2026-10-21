import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url);
async function load(file,mocks={}){
 const source=await fs.readFile(file,'utf8');
 const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const exports={};new Function('require','exports',js)(name=>Object.hasOwn(mocks,name)?mocks[name]:require(name),exports);return exports;
}
const {optimisticUpdate}=await load('lib/optimistic-update.ts');
const row=id=>({id,kind:'task',data:{name:id,status:'Pendiente'},version:1,updatedAt:''});
const first=row('first'),second=row('second');let rows=[first,second],visiblePending=new Set();const pending=new Set();
const updateRows=update=>{rows=update(rows)},onPending=ids=>{visiblePending=ids};
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});return {promise,resolve,reject}};
const one=deferred(),two=deferred();let writes=0;
const start=(previous,request)=>optimisticUpdate({previous,next:{...previous,data:{...previous.data,status:'Hecha'}},pending,updateRows,onPending,persist:()=>{writes++;return request.promise}});
const saveOne=start(first,one);const failure=assert.rejects(saveOne,/offline/);
assert.equal(rows[0].data.status,'Hecha','Checkbox changes before the network resolves');
assert.ok(visiblePending.has(first.id),'Pending marker is visible until acknowledgement');
assert.equal(await start(first,one),false,'Repeated clicks cannot send an outdated version');assert.equal(writes,1);
const saveTwo=start(second,two);assert.equal(writes,2,'Other tasks are not blocked');
two.resolve({...second,data:{...second.data,status:'Hecha'},version:2});await saveTwo;
assert.equal(visiblePending.size,1);one.reject(Error('offline'));await failure;
assert.deepEqual(rows[0],first,'Failed task is restored');assert.equal(rows[1].version,2,'Rollback preserves another task’s confirmed save');assert.equal(rows[1].data.status,'Hecha');assert.equal(pending.size,0);assert.equal(visiblePending.size,0);
const retry=deferred(),retrying=start(first,retry);retry.resolve({...first,data:{...first.data,status:'Hecha'},version:2});await retrying;assert.equal(rows[0].version,2,'Retry uses the confirmed server version');
console.log('Task sync passed: immediate update, pending feedback, double-click lock, parallel records, rollback and retry.');

const api=await load('lib/api.ts'),models=await load('lib/models.ts');
let authorized=true,calls=[],responses=[];
const supabase={from(table){const call={table,filters:[],action:'select'};calls.push(call);const q={select(){return q},eq(k,v){call.filters.push([k,v]);return q},update(data){call.action='update';call.data=data;return q},insert(data){call.action='insert';call.data=data;return q},maybeSingle:async()=>responses.shift(),single:async()=>responses.shift()};return q}};
const route=await load('app/api/data/route.ts',{'../../../lib/agency-auth':{getAgencyAccess:async()=>authorized?{supabase}:null},'../../../lib/models':models,'../../../lib/api':api});
const task={name:'Revisión',projectId:'project',status:'Hecha',priority:'Alta',due:'2026-11-01',assignee:'Joaquín',notes:'',timeEntries:[]};
async function post(body,reply=[],origin='https://traka.test'){calls=[];responses=[...reply];return route.POST(new Request('https://traka.test/api/data',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)}))}
let response=await post({kind:'task',id:'task',version:1,data:task},[{data:{id:'task',kind:'task',data:task,version:2,updated_at:'now'},error:null}]);
assert.equal(response.status,200);assert.equal(calls.length,1,'Normal task save is a single DB statement');assert.equal(calls[0].action,'update');assert.deepEqual(calls[0].filters,[['id','task'],['kind','task'],['version',1]]);assert.equal((await response.json()).row.version,2);assert.match(response.headers.get('Server-Timing'),/auth;dur=.*database;dur=.*total;dur=/);
response=await post({kind:'task',id:'task',version:1,data:task},[{data:null,error:null}]);assert.equal(response.status,409,'Stale or deleted records are rejected');
response=await post({kind:'task',version:0,data:task},[{data:null,error:{code:'23503'}}]);assert.equal(response.status,409,'DB reference validation reaches the client');assert.equal(calls.length,1);
response=await post({kind:'task',version:0,data:{...task,due:''}});assert.equal(response.status,400);assert.equal(calls.length,0);
response=await post({kind:'task',version:-1,data:task});assert.equal(response.status,400);assert.equal(calls.length,0);
response=await post({kind:'task',version:1,data:task},[],'https://other.test');assert.equal(response.status,403);assert.equal(calls.length,0);
authorized=false;response=await post({kind:'task',version:1,data:task});assert.equal(response.status,401);assert.equal(calls.length,0);authorized=true;
const document={name:'Brief',projectId:'project',url:'',fileKey:'documents/original',mime:'application/pdf',size:4,status:'Borrador',notes:''};
response=await post({kind:'document',id:'doc',version:1,data:{...document,fileKey:'documents/changed'}},[{data:{data:document},error:null}]);assert.equal(response.status,400);assert.equal(calls.length,1,'Document path cannot change');
response=await post({kind:'document',version:0,data:document});assert.equal(response.status,400);assert.equal(calls.length,0,'Documents still require the upload endpoint');
console.log('API passed: one write, version conflicts, reference errors, validation, origin/auth denial, immutable document paths and server timing.');

let claims={sub:'user',email:'member@example.test'},jwtError=null,member={role:'owner'},membershipReads=0;
const authClient={auth:{getClaims:async()=>({data:claims?{claims}:null,error:jwtError}),getUser(){throw Error('Unexpected Auth round trip')}},from(){membershipReads++;return {select(){return this},eq(){return this},maybeSingle:async()=>({data:member,error:null})}}};
const {getAgencyAccess}=await load('lib/agency-auth.ts',{'./supabase/server':{configured:()=>true,createClient:async()=>authClient}});
assert.equal((await getAgencyAccess()).user.id,'user');await getAgencyAccess();assert.equal(membershipReads,2,'Membership is never cached across requests');member=null;assert.equal(await getAgencyAccess(),null);jwtError=Error('invalid token');const before=membershipReads;assert.equal(await getAgencyAccess(),null);assert.equal(membershipReads,before,'Unverified claims do not reach membership lookup');
console.log('Auth passed: verified claims required and fresh membership on every request.');
require('next/dist/server/node-environment-baseline');
const {unstable_doesMiddlewareMatch}=require('next/experimental/testing/server');
const {config}=await load('proxy.ts',{'@supabase/ssr':{},'next/server':{}});
for(const url of ['/api/data','/api/files','/api/files/doc','/api/auth'])assert.equal(unstable_doesMiddlewareMatch({config,url}),false,`${url} must not repeat Auth in the proxy`);
assert.equal(unstable_doesMiddlewareMatch({config,url:'/'}),true);assert.equal(unstable_doesMiddlewareMatch({config,url:'/login'}),true);
console.log('Proxy passed: API handlers authenticate once; pages retain session refresh.');
