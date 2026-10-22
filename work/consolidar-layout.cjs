const fs = require('fs');
const desktop = fs.readFileSync('work/layout-desktop.css', 'utf8').replace(/(-?\d*\.?\d+)px\b/g, (_, value) => `calc(${value} * var(--u))`);
const shared = '\n.faq-item{border-width:1px}.faq-item summary{min-height:calc(100 * var(--u) - 2px)}\n';
const mobile = fs.readFileSync('work/layout-mobile.css', 'utf8');
const reducedMotion = '\n@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{transition:none!important;animation:none!important}}\n';
fs.writeFileSync('outputs/site-joice/style.css', desktop + shared + mobile + reducedMotion);
console.log('Layout desktop preservado; layout mobile reconstruído.');
