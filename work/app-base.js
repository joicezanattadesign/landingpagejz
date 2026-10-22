// The 1920 px design uses one shared unit throughout the whole page.
function updateDesignUnit() {
  document.documentElement.style.setProperty('--design-unit', `${document.documentElement.clientWidth / 1920}px`);
}
updateDesignUnit();
window.addEventListener('resize', updateDesignUnit, {passive:true});

// SVGs keep their original dimensions; only the containing layer is scaled.
const vectorObserver = watchElementSizes(document.querySelectorAll('.vector'), entries => {
  for (const {target,contentRect} of entries) {
    const originalWidth = Number(target.style.getPropertyValue('--vw'));
    target.style.setProperty('--scale', contentRect.width / originalWidth);
  }
});

const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-toggle');
function closeMenu() {
  header.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.navigation a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && header.classList.contains('menu-open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
onMediaChange(window.matchMedia('(min-width: 1024px)'), closeMenu);

const faqItems = [...document.querySelectorAll('.faq-item')];
faqItems.forEach(item => item.addEventListener('toggle', () => {
  if (item.open) faqItems.forEach(other => { if (other !== item) other.open = false; });
}));

// Place the full-width fade using the current portrait, rather than a fixed section height.
// Figma: portrait y=7187, h=906; fade y=7770, h=441, with the original gradient stops.
const aboutSection = document.querySelector('.about');
const aboutPortrait = document.querySelector('.about-art');
let aboutFadeFrame = 0;
function updateAboutFade() {
  cancelAnimationFrame(aboutFadeFrame);
  aboutFadeFrame = requestAnimationFrame(() => {
    if (window.matchMedia('(min-width:1024px)').matches) return;
    const section = aboutSection.getBoundingClientRect();
    const portrait = aboutPortrait.getBoundingClientRect();
    if (!portrait.height) return;
    aboutSection.style.setProperty('--about-fade-top', `${portrait.top - section.top + portrait.height * 583 / 906}px`);
    aboutSection.style.setProperty('--about-fade-height', `${portrait.height * 441 / 906}px`);
  });
}
const aboutLayoutObserver = watchElementSizes([document.querySelector('.about-layout'),aboutPortrait], updateAboutFade);
afterLocalFonts(updateAboutFade);
window.addEventListener('resize', updateAboutFade, {passive:true});
window.addEventListener('load', updateAboutFade, {once:true});
updateAboutFade();

// Scale both contact layers together, preserving the Figma aspect ratios and offset.
const contactSection = document.querySelector('.contact');
function updateContactBackground() {
  if (window.matchMedia('(min-width:1024px)').matches) return;
  const contentHeight = contactSection.querySelector('.section-content').getBoundingClientRect().height;
  const bottomPadding = parseFloat(getComputedStyle(contactSection).paddingBottom);
  const scale = Math.max(contactSection.clientWidth / 2000, (contentHeight + bottomPadding + 20) / (723 - 150));
  contactSection.style.setProperty('--contact-background-width', `${scale * 2000}px`);
  contactSection.style.setProperty('--contact-padding-top', `${scale * 150 + 20}px`);
}
watchElementSizes([contactSection], updateContactBackground);
window.addEventListener('resize', updateContactBackground, {passive:true});
updateContactBackground();

if (!(window.CSS && CSS.supports && CSS.supports('aspect-ratio', '1 / 1'))) {
  watchElementSizes(document.querySelectorAll('.vector,.review-card,.hero-art,.process-art,.about-art'), applyAspectFallbacks);
  applyAspectFallbacks();
}

