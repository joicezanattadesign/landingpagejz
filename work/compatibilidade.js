// Feature-based fallbacks keep the same layout on older Safari and Android WebViews.
function watchElementSizes(elements, callback) {
  const targets = Array.from(elements);
  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver(callback);
    targets.forEach(element => observer.observe(element));
    return observer;
  }
  let frame = 0;
  let disconnected = false;
  const update = () => {
    if (disconnected) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => callback(targets.map(target => ({target, contentRect:target.getBoundingClientRect()}))));
  };
  window.addEventListener('resize', update, {passive:true});
  window.addEventListener('load', update, {once:true});
  afterLocalFonts(update);
  update();
  return {disconnect() {
    disconnected = true;
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', update);
    window.removeEventListener('load', update);
  }};
}

function onMediaChange(query, callback) {
  if (typeof query.addEventListener === 'function') query.addEventListener('change', callback);
  else if (typeof query.addListener === 'function') query.addListener(callback);
}

function afterLocalFonts(callback) {
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(callback);
  else callback();
}

function scrollReviewElement(element, left, behavior) {
  if (typeof element.scrollTo === 'function') {
    try { element.scrollTo({left, top:0, behavior}); return; } catch (_) { /* Older options API. */ }
  }
  element.scrollLeft = left;
  element.scrollTop = 0;
}

function applyAspectFallbacks() {
  if (window.CSS && CSS.supports && CSS.supports('aspect-ratio', '1 / 1')) return;
  document.querySelectorAll('.vector,.review-card,.lightbox-print').forEach(element => {
    const style = getComputedStyle(element);
    const width = Number(style.getPropertyValue('--vw') || style.getPropertyValue('--rw'));
    const height = Number(style.getPropertyValue('--vh') || style.getPropertyValue('--rh'));
    if (width && height) element.style.height = `${element.getBoundingClientRect().width * height / width}px`;
  });
  const compact = window.matchMedia('(max-width:1023.98px)').matches;
  [['.hero-art',736,914],['.process-art',793,1226],['.about-art',604,906]].forEach(([selector,width,height]) => {
    const element = document.querySelector(selector);
    if (compact) element.style.height = `${element.getBoundingClientRect().width * height / width}px`;
    else element.style.removeProperty('height');
  });
}
