// The 1920 px design uses one shared unit throughout the whole page.
function updateDesignUnit() {
  document.documentElement.style.setProperty('--design-unit', `${document.documentElement.clientWidth / 1920}px`);
}
updateDesignUnit();
window.addEventListener('resize', updateDesignUnit, {passive:true});

// SVGs keep their original dimensions; only the containing layer is scaled.
const vectorObserver = new ResizeObserver(entries => {
  for (const {target,contentRect} of entries) {
    const originalWidth = Number(target.style.getPropertyValue('--vw'));
    target.style.setProperty('--scale', contentRect.width / originalWidth);
  }
});
document.querySelectorAll('.vector').forEach(element => vectorObserver.observe(element));

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
window.matchMedia('(min-width: 1024px)').addEventListener('change', closeMenu);

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
const aboutLayoutObserver = new ResizeObserver(updateAboutFade);
aboutLayoutObserver.observe(document.querySelector('.about-layout'));
aboutLayoutObserver.observe(aboutPortrait);
document.fonts.ready.then(updateAboutFade);
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
new ResizeObserver(updateContactBackground).observe(contactSection);
window.addEventListener('resize', updateContactBackground, {passive:true});
updateContactBackground();

const reviews = document.querySelector('.reviews');
const cards = [...document.querySelectorAll('.review-card')];
const reviewScrubber = document.querySelector('.review-scrubber');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const previousReview = document.querySelector('.review-arrow.previous');
const nextReview = document.querySelector('.review-arrow.next');
const reviewStatus = document.querySelector('.review-status');
const reviewCount = document.querySelector('.review-count');
let currentReview = 4;
let requestedReview = null;
let drag = null;
let suppressReviewClick = false;

function updateReviewHeight() {
  // The row scrolls horizontally; never retain a vertical offset after a resize or gesture.
  if (reviews.scrollTop !== 0) reviews.scrollTop = 0;
  if (window.matchMedia('(min-width:1024px)').matches) {
    reviews.style.removeProperty('--review-height');
    return;
  }
  const left = reviews.scrollLeft;
  const right = left + reviews.clientWidth;
  const visible = cards.filter(card => card.offsetLeft + card.offsetWidth > left + 1 && card.offsetLeft < right - 1);
  const height = Math.max(0, ...visible.map(card => card.offsetHeight));
  if (height) reviews.style.setProperty('--review-height', `${height + 24}px`);
}
reviews.addEventListener('scroll', updateReviewHeight, {passive:true});

function showReviewState(index) {
  currentReview = index;
  reviewScrubber.value = String(index);
  reviewScrubber.setAttribute('aria-valuetext', `Depoimento ${index + 1} de ${cards.length}`);
  previousReview.disabled = index === 0;
  nextReview.disabled = index === cards.length - 1;
  reviewStatus.textContent = `Depoimento ${index + 1} de ${cards.length}`;
  reviewCount.textContent = `${String(index + 1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
}
function goToReview(index, behavior = reducedMotion.matches ? 'instant' : 'smooth') {
  const target = Math.max(0, Math.min(cards.length - 1, index));
  requestedReview = target;
  showReviewState(target);
  const left = cards[target].offsetLeft - (reviews.clientWidth - cards[target].offsetWidth) / 2;
  reviews.scrollTo({left, behavior});
}
reviewScrubber.addEventListener('input', () => goToReview(Number(reviewScrubber.value), 'instant'));
previousReview.addEventListener('click', () => goToReview(currentReview - 1));
nextReview.addEventListener('click', () => goToReview(currentReview + 1));
reviews.addEventListener('keydown', event => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  if (event.key === 'Home') goToReview(0);
  else if (event.key === 'End') goToReview(cards.length - 1);
  else goToReview(currentReview + (event.key === 'ArrowRight' ? 1 : -1));
});
function markCurrentReview() {
  if (requestedReview !== null) return;
  if (reviews.scrollLeft <= 1) { showReviewState(0); return; }
  if (reviews.scrollWidth - reviews.clientWidth - reviews.scrollLeft <= 1) { showReviewState(cards.length - 1); return; }
  const center = reviews.scrollLeft + reviews.clientWidth / 2;
  let closest = 0;
  cards.forEach((card,index) => {
    if (Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) < Math.abs(cards[closest].offsetLeft + cards[closest].offsetWidth / 2 - center)) closest = index;
  });
  showReviewState(closest);
}
reviews.addEventListener('scroll', markCurrentReview, {passive:true});
reviews.addEventListener('scrollend', () => { requestedReview = null; markCurrentReview(); });
// Touch and trackpad use native scrolling; mouse dragging adds the desktop gesture.
reviews.addEventListener('pointerdown', event => {
  requestedReview = null;
  suppressReviewClick = false;
  if (event.pointerType !== 'mouse' || event.button !== 0) return;
  drag = {id:event.pointerId, x:event.clientX, left:reviews.scrollLeft};
});
reviews.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.id) return;
  if (Math.abs(event.clientX - drag.x) <= 6 && !reviews.hasPointerCapture(event.pointerId)) return;
  if (!reviews.hasPointerCapture(event.pointerId)) reviews.setPointerCapture(event.pointerId);
  reviews.classList.add('is-dragging');
  reviews.scrollLeft = drag.left - (event.clientX - drag.x);
});
function finishReviewDrag(event) {
  if (!drag || event.pointerId !== drag.id) return;
  const moved = Math.abs(event.clientX - drag.x) > 8;
  suppressReviewClick = moved;
  if (moved) setTimeout(() => { suppressReviewClick = false; }, 0);
  drag = null;
  reviews.classList.remove('is-dragging');
  if (reviews.hasPointerCapture(event.pointerId)) reviews.releasePointerCapture(event.pointerId);
  markCurrentReview();
  if (moved) goToReview(currentReview);
}
reviews.addEventListener('pointerup', finishReviewDrag);
reviews.addEventListener('pointercancel', finishReviewDrag);
reviews.addEventListener('lostpointercapture', event => {
  if (drag && event.pointerId === drag.id) { drag = null; reviews.classList.remove('is-dragging'); }
});
function sizeReviewEdges(initial = false) {
  const viewportWidth = reviews.parentElement.clientWidth;
  const compact = window.innerWidth < 600;
  const start = compact ? 20 : Math.max(0, (viewportWidth - cards[0].offsetWidth) / 2);
  const end = Math.max(compact ? 20 : 0, (viewportWidth - cards[cards.length - 1].offsetWidth) / 2);
  reviews.style.setProperty('--edge-start', `${start}px`);
  reviews.style.setProperty('--edge-end', `${end}px`);
  if (initial && window.matchMedia('(min-width:1024px)').matches) {
    reviews.scrollTo({left:start + 878 * document.documentElement.clientWidth / 1920, behavior:'instant'});
  } else goToReview(initial ? 0 : currentReview, 'instant');
  updateReviewHeight();
}
sizeReviewEdges(true);
let previousReviewWidth = reviews.clientWidth;
new ResizeObserver(() => {
  if (previousReviewWidth === reviews.clientWidth) return;
  previousReviewWidth = reviews.clientWidth;
  sizeReviewEdges();
}).observe(reviews);
markCurrentReview();

// Prints stay compact in the carousel and retain their exact crop when enlarged.
const reviewLightbox = document.querySelector('.review-lightbox');
const lightboxBody = reviewLightbox.querySelector('.review-lightbox-body');
const lightboxTitle = reviewLightbox.querySelector('h2');
let reviewOpener = null;
reviews.addEventListener('click', event => {
  const button = event.target.closest('.review-enlarge');
  if (!button || suppressReviewClick) return;
  const index = Number(button.dataset.enlarge);
  const preview = cards[index].cloneNode(true);
  preview.className = 'lightbox-print';
  preview.removeAttribute('role');
  preview.removeAttribute('aria-roledescription');
  preview.removeAttribute('aria-label');
  preview.querySelector('.review-enlarge').remove();
  preview.querySelector('img').loading = 'eager';
  lightboxBody.replaceChildren(preview);
  lightboxTitle.textContent = `Depoimento ${index + 1} de ${cards.length}`;
  reviewOpener = button;
  document.body.classList.add('review-open');
  reviewLightbox.showModal();
});
reviewLightbox.querySelector('.review-lightbox-close').addEventListener('click', () => reviewLightbox.close());
reviewLightbox.addEventListener('click', event => {
  if (event.target !== reviewLightbox) return;
  const bounds = reviewLightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) reviewLightbox.close();
});
reviewLightbox.addEventListener('close', () => {
  document.body.classList.remove('review-open');
  reviewOpener?.focus({preventScroll:true});
});
