const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const core = require('../src/core');
function response(req, overrides = {}) {
  const answers = Object.fromEntries(Object.entries(req.questions).map(([id,q]) => {
    let a;
    if(q.type==='noul') a={type:'noul',noul:0.9};
    else if(q.type==='choice') {const keys=Object.keys(q.criteria);a={type:'choice',choice:keys[0],confidence:1,probabilities:Object.fromEntries(keys.map((k,i)=>[k,i===0?1:0]))};}
    else {const keys=q.criteria.map((_,i)=>String(i));a={type:'score',score:0,confidence:1,legend:Object.fromEntries(keys.map((k,i)=>[k,q.criteria[i]])),probabilities:Object.fromEntries(keys.map((k,i)=>[k,i===0?1:0]))};}
    return [id,{...a,...overrides}];
  }));
  return {model:'jev-test',answers,usage:{input_tokens:10,output_tokens:3}};
}
function store(){const map=new Map();return {getProperty:k=>map.get(k)||null,setProperty(k,v){map.set(k,v);return this;},setProperties(o){Object.entries(o).forEach(([k,v])=>map.set(k,v));return this;},deleteProperty(k){map.delete(k);return this;}};}
function runtime(){
  let user='alice', doc='one';const users={},docs={}, calls=[];
  const ctx={JevCore:core,PropertiesService:{getUserProperties:()=>users[user]||(users[user]=store()),getDocumentProperties:()=>docs[doc]||(docs[doc]=store())},SpreadsheetApp:{getActiveSpreadsheet:()=>({getId:()=>doc})},UrlFetchApp:{fetch(url,options){calls.push({url,options});return {getResponseCode:()=>200,getContentText:()=>JSON.stringify(response(JSON.parse(options.payload)))};}}};
  vm.createContext(ctx);vm.runInContext(fs.readFileSync('src/addon.js','utf8'),ctx);
  return {ctx,calls,users,docs,asUser:v=>user=v,asDoc:v=>doc=v};
}
test('state preserves typed values and scopes the question',()=>{
  for(const value of ['dog',0,false,'{"dog":true}','quote " and\nnewline']) {
    const req=core.request('noul',value,'Is it a mammal?',[]);
    assert.equal(JSON.parse(JSON.stringify(req)).state.data,value);
    assert.match(req.questions.result.instructions,/`data`/);
  }
  assert.equal(core.request('noul',new Date('2026-09-18T12:00:00Z'),'Date?',[]).state.data,'2026-09-18T12:00:00.000Z');
});
test('blank inputs skip inference but zero and FALSE do not',()=>{
  const r=runtime();assert.equal(r.ctx.JEV_NOUL('',''), '');assert.equal(r.calls.length,0);
  assert.throws(()=>r.ctx.JEV_NOUL(0,'Zero?'),/No account connected/);
  assert.throws(()=>r.ctx.JEV_NOUL(false,'False?'),/No account connected/);
});
test('scalar normalization rejects ranges and invalid values',()=>{
  assert.equal(core.data([['dog']]).value,'dog');
  for(const x of [[['a'],['b']],{x:1},NaN,Infinity,new Date('invalid')]) assert.throws(()=>core.data(x));
  assert.throws(()=>core.request('noul','dog',' ',[]),/Question/);
});
test('threshold equality is strictly false and bounds are enforced',()=>{
  const r=runtime();r.ctx.jevSaveKey('fixture-key','Account');r.ctx.jevConnect();
  assert.equal(r.ctx.JEV_NOUL('dog','Mammal?',0.9),false);
  assert.equal(r.ctx.JEV_NOUL('dog','Mammal?',0.8),true);
  assert.equal(r.ctx.JEV_NOUL('dog','Mammal?',0),true);
  assert.equal(r.ctx.JEV_NOUL('dog','Mammal?',1),false);
  assert.equal(r.ctx.JEV_NOUL('dog','Mammal?'),true);
  for(const t of [-1,2,'80%',null,false,NaN]) assert.throws(()=>r.ctx.JEV_NOUL('dog','Mammal?',t),/Threshold/);
});
test('choice lists preserve order and handle object special keys',()=>{
  const req=core.request('choice','dog','Classify',[[['Mammal'],['Bird']],'Other']);
  assert.deepEqual(Object.keys(req.questions.result.criteria),['Mammal','Bird','Other']);
  assert.equal(Object.getPrototypeOf(req.questions.result.criteria),null);
  assert.deepEqual(Object.keys(core.request('choice','x','q',['__proto__','constructor']).questions.result.criteria),['__proto__','constructor']);
  for(const list of [['a'],['a','a'],['a',' '],[[['a','b']]],Array.from({length:256},(_,i)=>''+i)]) assert.throws(()=>core.request('choice','x','q',list));
});
test('score rubric supports 2–10 ordered levels',()=>{
  assert.deepEqual(core.request('score','x','q',[[['Low'],['High']]]).questions.result.criteria,['Low','High']);
  for(const n of [0,1,11]) assert.throws(()=>core.request('score','x','q',Array(n).fill('level')));
});
test('raw preserves structured content and rejects invalid envelopes',()=>{
  const questions={q:{type:'score',instructions:{dimension:'quality'},criteria:[{description:'poor'},{description:'good'}]}};
  const req=core.raw('{"nested":[1,true]}',JSON.stringify(questions),'jev-test');
  assert.deepEqual(req.questions,questions);assert.deepEqual(req.state,{nested:[1,true]});assert.equal(req.model,'jev-test');
  assert.equal(core.raw('"dog"','{"q":{"type":"noul","instructions":"Mammal?"}}').state,'dog');
  for(const state of ['bad','null','false','42']) assert.throws(()=>core.raw(state,JSON.stringify(questions)));
  for(const q of ['[]','{}','null','{"q":{"type":"other","instructions":"q"}}']) assert.throws(()=>core.raw('"dog"',q));
});
test('response validation checks types, distribution, score bounds, and IDs',()=>{
  for(const type of ['noul','choice','score']) {
    const req=core.request(type,'x','q',['Low','High']);assert.equal(core.validate(response(req),req).model,'jev-test');
    assert.throws(()=>core.validate({answers:{}},req));
    assert.throws(()=>core.validate(response(req,{type:'bad'}),req));
  }
  const nr=core.request('noul','x','q',[]);for(const noul of ['0.9',-1,2,null]) assert.throws(()=>core.validate(response(nr,{noul}),nr));
  const sr=core.request('score','x','q',['low','high']);for(const score of [-1,2,NaN]) assert.throws(()=>core.validate(response(sr,{score}),sr));
  const cr=core.request('choice','x','q',['a','b']);assert.throws(()=>core.validate(response(cr,{choice:'c'}),cr));assert.throws(()=>core.validate(response(cr,{probabilities:{a:1,b:1}}),cr));
});
test('credentials are personal; explicit connection is document-scoped',()=>{
  const r=runtime();r.ctx.jevSaveKey('alice-key','Alice');assert.equal(r.ctx.jevSettingsStatus().connected,false);r.ctx.jevConnect();
  r.asUser('bob');assert.equal(r.ctx.jevSettingsStatus().saved,false);assert.equal(r.ctx.jevConnectedKey_(),'alice-key');
  r.ctx.jevSaveKey('bob-key','Bob');assert.equal(r.ctx.jevConnectedKey_(),'alice-key');r.ctx.jevConnect();assert.equal(r.ctx.jevConnectedKey_(),'bob-key');
  r.asDoc('two');assert.equal(r.ctx.jevSettingsStatus().connected,false);assert.throws(()=>r.ctx.jevConnectedKey_(),/No account/);
  r.docs.two.setProperty('JEV_CONNECTION',r.docs.one.getProperty('JEV_CONNECTION'));assert.throws(()=>r.ctx.jevConnectedKey_(),/No account/);
  r.ctx.jevConnect();assert.equal(r.ctx.jevConnectedKey_(),'bob-key');r.ctx.jevDisconnect();assert.throws(()=>r.ctx.jevConnectedKey_(),/No account/);
  r.asDoc('one');r.ctx.jevRemoveKey();assert.equal(r.ctx.jevSettingsStatus().saved,false);assert.equal(r.ctx.jevConnectedKey_(),'bob-key');
  assert.ok(!JSON.stringify(r.ctx.jevSettingsStatus()).includes('bob-key'));
});
test('fetch sends the key only in Authorization and sanitizes remote failures',()=>{
  const r=runtime();r.ctx.jevSaveKey('fixture-secret','Account');r.ctx.jevConnect();r.ctx.JEV_NOUL('dog','Mammal?');
  assert.equal(r.calls[0].url,'https://api.typesafe.ai/v1/systemone');assert.equal(r.calls[0].options.headers.Authorization,'Bearer fixture-secret');assert.equal(r.calls[0].options.followRedirects,false);assert.ok(!r.calls[0].options.payload.includes('fixture-secret'));
  for(const code of [400,401,403,429,500]) {
    r.ctx.UrlFetchApp.fetch=()=>({getResponseCode:()=>code,getContentText:()=>'{"error":"fixture-secret"}'});
    assert.throws(()=>r.ctx.JEV_NOUL('dog','Mammal?'),e=>!e.message.includes('fixture-secret')&&e.message.startsWith('Jev:'));
  }
  r.ctx.UrlFetchApp.fetch=()=>{throw new Error('fixture-secret');};assert.throws(()=>r.ctx.JEV_NOUL('dog','Mammal?'),/Could not reach TypeSafe/);
  r.ctx.UrlFetchApp.fetch=()=>({getResponseCode:()=>200,getContentText:()=>'<bad>'});assert.throws(()=>r.ctx.JEV_NOUL('dog','Mammal?'),/invalid JSON/);
});
test('wrappers return native values and complete raw response',()=>{
  const r=runtime();r.ctx.jevSaveKey('fixture-key','Account');r.ctx.jevConnect();
  assert.equal(r.ctx.JEV_CHOICE('dog','Type?','Mammal','Bird'),'Mammal');assert.equal(r.ctx.JEV_SCORE('dog','Intensity?','Low','High'),0);
  const raw=JSON.parse(r.ctx.JEV('"dog"','{"q":{"type":"noul","instructions":"Mammal?"}}'));
  assert.equal(raw.answers.q.noul,0.9);assert.equal(raw.usage.input_tokens,10);
});
