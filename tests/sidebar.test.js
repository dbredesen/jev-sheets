const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function sidebar() {
  const elements = Object.fromEntries(['save','test','connect','disconnect','remove','key','label','message','personal','connection','connection-heading'].map(id => [id, {value:'', textContent:'', disabled:false}]));
  elements['connection-heading'].scrollIntoView = options => {elements['connection-heading'].scrollOptions=options;};
  elements['connection-heading'].focus = options => {elements['connection-heading'].focusOptions=options;};
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
  assert.equal(s.elements.save.className,'primary');
  for(const id of ['test','connect','disconnect','remove']) assert.equal(s.elements[id].disabled,true);
  s.elements.key.value='test-only-placeholder';
  s.elements.label.value='Review';
  s.elements.save.onclick();
  assert.equal(s.elements.save.disabled,true);
  s.succeed({saved:true,connected:false,label:'Review'});
  assert.equal(s.elements.key.value,'');
  assert.equal(s.elements.label.value,'');
  assert.equal(s.elements.personal.textContent,'Saved key: Review.');
  assert.equal(s.elements['connection-heading'].scrollOptions.block,'start');
  assert.equal(s.elements['connection-heading'].focusOptions.preventScroll,true);
  assert.equal(s.elements.save.textContent,'Replace saved key');
  assert.equal(s.elements.save.className,'');
  assert.equal(s.elements.connect.textContent,'Connect this spreadsheet');
  assert.equal(s.elements.connect.className,'primary');
  assert.equal(s.elements.connect.disabled,false);
  assert.equal(s.elements.disconnect.disabled,true);
  s.elements.connect.onclick();
  s.succeed({saved:true,connected:true,label:'Review',connectionLabel:'Review',connectionMatchesSaved:true});
  assert.equal(s.elements.label.value,'');
  assert.equal(s.elements.connection.textContent,'Connected: Review (same as saved key).');
  assert.equal(s.elements.connect.textContent,'Update spreadsheet connection');
  assert.equal(s.elements.connect.className,'');
  assert.equal(s.elements.disconnect.disabled,false);
  s.elements.key.value='replacement-key';
  s.elements.label.value='Replacement';
  s.elements.save.onclick();
  s.succeed({saved:true,connected:true,label:'Replacement',connectionLabel:'Review',connectionMatchesSaved:false});
  assert.equal(s.elements.label.value,'');
  assert.equal(s.elements.connection.textContent,'Connected: Review (different from saved key).');
  assert.equal(s.elements.connect.className,'primary');
  assert.equal(s.elements.message.textContent,'');
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
