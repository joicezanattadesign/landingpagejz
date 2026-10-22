const fs = require('fs');
const vm = require('vm');
const assert = require('assert/strict');
const source = fs.readFileSync('work/compatibilidade.js','utf8');
const events = new Map();
const frames = new Map();
let sequence = 0;
const context = {
  window:{addEventListener:(name,fn)=>events.set(name,fn),removeEventListener:name=>events.delete(name)},
  document:{},
  requestAnimationFrame:fn=>{ frames.set(++sequence,fn); return sequence; },
  cancelAnimationFrame:id=>frames.delete(id)
};
vm.createContext(context);
vm.runInContext(source,context);
let calls = 0;
const element = {getBoundingClientRect:()=>({width:200,height:100})};
const observer = context.watchElementSizes([element],entries=>{
  calls++;
  assert.equal(entries[0].contentRect.width,200);
});
function flush() { const tasks=[...frames.values()]; frames.clear(); tasks.forEach(fn=>fn()); }
flush();
assert.equal(calls,1,'Sem ResizeObserver e sem FontFaceSet, medir o layout');
events.get('resize')(); events.get('resize')(); flush();
assert.equal(calls,2,'Agrupar medições de rotação e redimensionamento');
observer.disconnect(); flush();
assert.equal(events.has('resize'),false);
let mediaCallback;
context.onMediaChange({addListener:callback=>{mediaCallback=callback;}},()=>{calls++;});
mediaCallback(); assert.equal(calls,3,'API antiga de media query deve funcionar');
const oldScroll={scrollLeft:0,scrollTop:25,scrollTo(){throw new TypeError('Legacy options');}};
context.scrollReviewElement(oldScroll,240,'auto');
assert.equal(oldScroll.scrollLeft,240); assert.equal(oldScroll.scrollTop,0);
const noScroll={scrollLeft:0,scrollTop:25};
context.scrollReviewElement(noScroll,120,'auto');
assert.equal(noScroll.scrollLeft,120); assert.equal(noScroll.scrollTop,0);
let nativeObserved=0;
context.ResizeObserver=class {constructor(callback){this.callback=callback;} observe(){nativeObserved++;}};
context.watchElementSizes([element,element],()=>{});
assert.equal(nativeObserved,2,'Usar API nativa quando disponível');

const html=fs.readFileSync('outputs/site-joice/index.html','utf8');
assert(html.indexOf('name="color-scheme"')<html.indexOf('rel="stylesheet"'));
assert(html.includes('name="darkreader-lock"'));
assert(html.includes('id="tema-inicial"'));
assert(html.includes('style.css?v=18'));
const fixture=`<script>
// QA only: feature absence is confined to this local, untracked document.
window.ResizeObserver = undefined;
Object.defineProperty(document,'fonts',{value:undefined,configurable:true});
const nativeSupports = CSS.supports.bind(CSS);
CSS.supports = (property,value)=>property==='aspect-ratio'?false:nativeSupports(property,value);
const nativeMedia = window.matchMedia.bind(window);
window.matchMedia = query=>{
  const media=nativeMedia(query);
  return {get matches(){return media.matches;},addListener:callback=>media.addEventListener('change',callback)};
};
const dialog=document.querySelector('.review-lightbox');
dialog.showModal=undefined; dialog.close=undefined;
const track=document.querySelector('.reviews');
track.scrollTo=undefined;
const nativeListen=track.addEventListener.bind(track);
track.addEventListener=(event,callback,options)=>{if(event!=='scrollend')nativeListen(event,callback,options);};
</script>`;
fs.writeFileSync('outputs/site-joice/qa-compatibilidade.html',html.replace('</body>',fixture+'\n</body>'));
console.log('6 verificações de fallback passaram. Prévia QA local criada; não entra na publicação.');
