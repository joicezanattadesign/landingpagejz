const fs=require('fs');
const old=fs.readFileSync('outputs/site-joice/style.css','utf8');
const mobile=[];
const pattern=/@media\s*\(max-width:\s*(760|380)px\)\s*\{/g;
for(const match of old.matchAll(pattern)){
  let depth=1,index=match.index+match[0].length;
  while(depth&&index<old.length){if(old[index]==='{')depth++;if(old[index]==='}')depth--;index++;}
  mobile.push(old.slice(match.index,index));
}
if(!fs.existsSync('work/layout-mobile-original.css'))fs.writeFileSync('work/layout-mobile-original.css',mobile.join('\n'));
let desktop=fs.readFileSync('work/layout-desktop.css','utf8').replace(/(-?\d*\.?\d+)px\b/g,(_,value)=>`calc(${value} * var(--u))`);
desktop+='\n/* Keep hairline borders inside the design height at every browser scale. */\n.faq-item{border-width:1px}.faq-item summary{min-height:calc(100 * var(--u) - 2px)}\n';
const extra=`
@media(max-width:760px){
  :root{--u:1px}
  .header{height:auto}.hero> .container{width:calc(100% - 40px)}
  .process-copy{width:100%;margin-left:0}.process-description{min-height:0}.process-description>p{margin-bottom:30px;font-size:18px;line-height:1.6}
  .process-steps{gap:24px;margin:0}.process-steps li{margin:0}.process-copy .button{margin:30px 0 0;white-space:normal}
  .about{margin-top:0}.about-layout{min-height:0}.about-copy{max-width:100%}.about-copy>p:last-child{margin-bottom:0}
  .about:after{top:auto;bottom:60px;height:calc(min(100vw - 40px,510px) * .4)}
  .about-art{aspect-ratio:604/906}.about-portrait{width:100%;height:100%}
  .process-art{width:min(620px,110%);aspect-ratio:793/1226;max-height:none}.process-seal{left:6.81%;top:9.62%;width:19.02%}
  .service-grid{grid-template-columns:1fr}.service-card.social{margin-left:0}.service-card{padding:30px}.service-heading{min-height:0;position:relative;padding-right:68px}
  .service-heading h3,.service-card.social h3{max-width:100%;white-space:normal}.service-icon{top:0;right:0;width:58px;height:58px;margin:0}.social .service-heading{min-height:0}
  .service-card:nth-child(2) .service-icon,.social .service-icon{right:0;top:0}
  .service-card>p,.service-card:nth-child(2)>p,.social>p{max-width:100%}.services .center{display:block}.services .button{width:auto;max-width:100%;white-space:normal}
  .services:before{height:auto;bottom:140px}.services .ribbon.tilted{top:36px;left:-20%;width:250%;transform-origin:top left;transform:rotate(-4deg)}
  .ribbons.double{height:130px}.double .ribbon{height:44px;padding:0;left:-20%;width:250%;font-size:13px;letter-spacing:-.06em}
  .double .ribbon.tilted{top:36px;transform-origin:top left;transform:rotate(-4deg)}.double .ribbon.white{top:91px}
  .services .ribbon.white{top:91px;padding:0}
  .print-card{height:auto;min-height:0;padding:0}.print-plain{border-radius:0;box-shadow:none}.review-controls{height:10px}.reviews{height:auto;min-height:calc(min(85vw,373px) * 650 / 373 + 24px);margin-top:0;padding-inline:var(--edge-start,20px) var(--edge-end,20px)}
  .navigation{gap:16px 25px}
  .process-description{width:100%}
  .review-heading>.rating{display:flex}.review-heading h2{margin-top:24px}.testimonials{padding-bottom:110px}.review-wave.front{top:250px}.review-wave.back{top:365px}
  .faq{padding-top:80px;padding-bottom:80px}.faq-list{gap:12px}.faq-item summary{min-height:86px}.faq-letter{top:0}
  .contact h2{left:0}.contact-card{height:auto;left:0;justify-content:center;gap:12px;padding:30px 20px 30px 58px}
  footer{text-align:center}footer p{width:auto;margin-inline:auto}
  .hero-copy{margin-left:0}.hero-copy .button{min-width:0;max-width:100%;margin-left:0}
  .hero-copy .button,.clarity .button{white-space:normal}
}
@media(max-width:380px){.hero>.container{width:calc(100% - 32px)}.service-heading{padding-right:58px}.service-icon{width:48px;height:48px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{transition:none!important;animation:none!important}}
`;
fs.writeFileSync('outputs/site-joice/style.css',desktop+'\n'+fs.readFileSync('work/layout-mobile-original.css','utf8')+'\n'+extra);
console.log('Todas as seções agora usam a mesma escala do Figma.');
