const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function sidebar() {
  const elements = Object.fromEntries(['save','test','connect','disconnect','remove','key','label','message','personal','connection'].map(id => [id, {value:'', textContent:'', disabled:false}]));
  let success, failure;
  const calls = [];
  const runner = new Proxy({
    withSuccessHandler(fn) {success=fn; return runner;},
    withFailureHandler(fn) {failure=fn; return runner;}
  }, {get(target, prop) {return target[prop] || ((...args) => calls.push({name:prop,args}));}});
  const context = {document:{getElementById:id=>elements[id], querySelectorAll:()=>['save','test','connect','disconnect','remove'].map(id=>elements[id])}, google:{script:{run:runner}}};
  vm.runInNewContext(fs.readFileSync('src/settings.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1], context);
  return {elements, calls, succeed:value=>success(value), fail:error=>failure(error)};
}

test('sidebar enables actions only for available credentials and connection', () => {
  const s=sidebar();
  assert.equal(s.calls[0].name,'jevSettingsStatus');
  assert.equal(s.elements.save.disabled,true);
  s.succeed({saved:false,connected:false,label:''});
  assert.equal(s.elements.save.disabled,false);
  for(const id of ['test','connect','disconnect','remove']) assert.equal(s.elements[id].disabled,true);
  s.elements.key.value='test-only-placeholder';
  s.elements.save.onclick();
  assert.equal(s.elements.save.disabled,true);
  s.succeed({saved:true,connected:false,label:'Review'});
  assert.equal(s.elements.key.value,'');
  assert.equal(s.elements.connect.disabled,false);
  assert.equal(s.elements.disconnect.disabled,true);
  s.elements.connect.onclick();
  s.succeed({saved:true,connected:true,label:'Review',connectionLabel:'Review'});
  assert.equal(s.elements.disconnect.disabled,false);
  s.elements.remove.onclick();
  s.succeed({saved:false,connected:true,label:'',connectionLabel:'Review'});
  assert.equal(s.elements.connect.disabled,true);
  assert.equal(s.elements.disconnect.disabled,false);
});

test('sidebar recovers from failed requests without inventing connection state', () => {
  const s=sidebar();
  s.succeed({saved:true,connected:false,label:'Review'});
  s.elements.connect.onclick();
  s.fail({message:'Connection failed.'});
  assert.equal(s.elements.connect.disabled,false);
  assert.equal(s.elements.disconnect.disabled,true);
  assert.equal(s.elements.message.textContent,'Connection failed.');
  assert.equal(s.elements.message.className,'error');
});
