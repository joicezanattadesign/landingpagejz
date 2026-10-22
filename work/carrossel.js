const reviews = document.querySelector('.reviews');
const cards = [...document.querySelectorAll('.review-card')];
const dots = [...document.querySelectorAll('.review-dot')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const previousReview = document.querySelector('.review-arrow.previous');
const nextReview = document.querySelector('.review-arrow.next');
const reviewStatus = document.querySelector('.review-status');
let currentReview = 4;
let requestedReview = null;
let drag = null;
let suppressReviewClick = false;

function showReviewState(index) {
  currentReview = index;
  dots.forEach((dot,i) => {
    dot.classList.toggle('active', i === index);
    dot.setAttribute('aria-pressed', String(i === index));
  });
  previousReview.disabled = index === 0;
  nextReview.disabled = index === cards.length - 1;
  reviewStatus.textContent = `Depoimento ${index + 1} de ${cards.length}`;
}
function goToReview(index, behavior = reducedMotion.matches ? 'instant' : 'smooth') {
  const target = Math.max(0, Math.min(cards.length - 1, index));
  requestedReview = target;
  showReviewState(target);
  const left = cards[target].offsetLeft - (reviews.clientWidth - cards[target].offsetWidth) / 2;
  reviews.scrollTo({left, behavior});
}
dots.forEach((dot,index) => dot.addEventListener('click', () => goToReview(index)));
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
  const end = compact ? 20 : Math.max(0, (viewportWidth - cards[cards.length - 1].offsetWidth) / 2);
  reviews.style.setProperty('--edge-start', `${start}px`);
  reviews.style.setProperty('--edge-end', `${end}px`);
  if (initial && window.innerWidth > 1023) {
    reviews.scrollTo({left:start + 1414 * document.documentElement.clientWidth / 1920, behavior:'instant'});
  } else goToReview(initial ? 0 : currentReview, 'instant');
}
sizeReviewEdges(true);
let firstReviewSize = true;
new ResizeObserver(() => {
  if (firstReviewSize) { firstReviewSize = false; return; }
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
