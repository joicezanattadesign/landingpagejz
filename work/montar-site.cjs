const fs = require('fs');
const path = require('path');
const root = path.resolve('outputs/site-joice');
const assets = JSON.parse(fs.readFileSync('work/figma-assets-atualizados.json', 'utf8'));
const dimensions = {};
for (const a of assets.filter(a => a.file.endsWith('.svg'))) {
  const fd = fs.openSync(path.join(root,'assets',a.file),'r');
  const buf = Buffer.alloc(2048); const count = fs.readSync(fd,buf,0,buf.length,0); fs.closeSync(fd);
  const head = buf.toString('utf8',0,count).match(/<svg\b[^>]*>/)?.[0] || '';
  const vb = head.match(/viewBox="([^"]+)"/)?.[1].split(/\s+/).map(Number);
  dimensions[a.file] = [parseFloat(head.match(/\bwidth="([^"]+)"/)?.[1]) || vb?.[2], parseFloat(head.match(/\bheight="([^"]+)"/)?.[1]) || vb?.[3]];
}
function vector(file, cls='', style='') {
  const [w,h] = dimensions[file];
  if (!w || !h) throw Error('Dimensões ausentes: '+file);
  return `<span class="vector ${cls}" style="--vw:${w};--vh:${h};aspect-ratio:${w}/${h};${style}" aria-hidden="true"><img src="assets/${file}" width="${w}" height="${h}" alt="" loading="eager"></span>`;
}
const wa = 'https://wa.me/5551994169356';
const cta = (text,cls='') => `<a class="button ${cls}" href="${wa}" target="_blank" rel="noopener noreferrer">${text}</a>`;
const rating = (file='05e85.svg') => `<span class="rating" aria-hidden="true">${vector(file,'google')}${Array.from({length:5},()=>vector('5e148.svg','star')).join('')}</span>`;
const reviewImages = [
  {file:'2497e.png',w:406,h:330,iw:'100%',ih:'265.78%',top:'-30.73%',alt:'Mensagem de Raquel Rocha: Ameeeei!'},
  {file:'efcc1.png',w:416,h:256,iw:'141.99%',ih:'100%',top:'0',alt:'Print de uma conversa por WhatsApp sobre um material desenvolvido.'},
  {file:'18643.png',w:600,h:280,iw:'108.8%',ih:'100.07%',top:'0.17%',plain:true,alt:'Depoimento de cliente sobre o trabalho desenvolvido por Joice.'},
  {file:'ad026.png',w:539,h:294,iw:'119.25%',ih:'473.37%',top:'-136.09%',alt:'Mensagem de cliente elogiando o resultado e as cores do projeto.'},
  {file:'0362a.png',w:464,h:280,iw:'109.48%',ih:'100.05%',top:'-0.02%',plain:true,alt:'Registro de uma avaliação de cliente sobre o projeto.'},
  {file:'5382a.png',w:432,h:280,iw:'100%',ih:'334.03%',top:'-44.05%',alt:'Mensagem de Raquel Rocha elogiando o trabalho de Joice e dizendo que amou.'},
  {file:'cb037.png',w:516,h:234,iw:'100%',ih:'475.94%',top:'-364.29%',alt:'Registro de um projeto de comunicação visual apresentado no Figma.'},
  {file:'1a986.png',w:373,h:650,iw:'117.5%',ih:'145.95%',top:'-15.51%',alt:'Conversa com cliente sobre a entrega do projeto.'}
];
const steps = [
  ['Conversa inicial','Conversamos sobre seu negócio, suas necessidades e o que você deseja alcançar.'],
  ['Planejamento','Alinhamos a direção do projeto, os conteúdos necessários, as entregas e os prazos.'],
  ['Criação e desenvolvimento','Organizo os conteúdos e desenvolvo o projeto conforme os objetivos e a identidade da sua marca.'],
  ['Revisão e aprovação','Você avalia a proposta e fazemos os ajustes combinados antes da finalização.'],
  ['Entrega','Você recebe o projeto finalizado nos formatos e nas condições definidos no planejamento.']
];
const faqs = [
  ['Preciso saber exatamente qual serviço contratar?','Não precisa. Na conversa inicial, vamos entender seu negócio e o que você precisa comunicar para definir uma solução adequada ao seu objetivo.'],
  ['Qual é a diferença entre site e landing page?','Um site apresenta o negócio de forma mais ampla, organizando seus serviços e informações. Uma landing page concentra a comunicação em uma oferta ou ação específica, como solicitar um orçamento.'],
  ['Os projetos são personalizados?','Sim. Cada projeto é criado conforme as necessidades e os objetivos do seu negócio. Busco entender o estilo, as preferências visuais e o tom de voz da sua marca para desenvolver uma comunicação que represente sua identidade e converse com seu público.'],
  ['O serviço inclui a criação dos textos?','Se você ainda não tem os textos, a criação pode ser incluída no projeto. No planejamento, avaliamos quais conteúdos serão necessários de acordo com seus objetivos.'],
  ['Quanto custa um site ou uma landing page?','O valor depende do escopo, dos conteúdos e das funcionalidades necessárias. Entre em contato pelo WhatsApp para conversar sobre o projeto e solicitar uma proposta.'],
  ['Em quanto tempo recebo meu projeto?','O prazo é definido na proposta, de acordo com o escopo do projeto. A organização dos conteúdos e as etapas de revisão e aprovação também são alinhadas antes do início.'],
  ['Você publica os posts nas minhas redes sociais?','Não. Eu crio os conteúdos e entrego os arquivos finalizados em PNG ou JPG, prontos para você publicar. Não realizo publicação nem gerenciamento de redes sociais.']
];
const plus = (dark=false) => `<span class="faq-icon">${vector(dark?'dc397.svg':'1a06d.svg','faq-circle')}${vector(dark?'d388c.svg':'1deff.svg','plus-horizontal')}${vector(dark?'3877c.svg':'0f7de.svg','plus-vertical')}</span>`;
const band = `<span>${Array(9).fill('Web Designer • Redes Sociais • Landing Page &amp; Sites').join(' ')}</span>`;
const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#302c1e">
  <title>Joice Zanatta — Sites, landing pages e design</title>
  <meta name="description" content="Sites, landing pages e design para redes sociais. Comunicação clara e uma presença digital coerente com o seu negócio. Conheça o trabalho de Joice Zanatta.">
  <link rel="icon" type="image/svg+xml" href="assets/f025f.svg">
  <link rel="preload" href="assets/fonts/Carattere-400.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="preload" href="assets/fonts/Libre-Baskerville-500.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="preload" href="assets/fonts/Lato-Medium.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="fonts.css?v=5">
  <link rel="stylesheet" href="style.css?v=11">
  <script src="app.js?v=10" defer></script>
</head>
<body>
<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
<main id="conteudo">
  <section class="hero" id="inicio" aria-labelledby="hero-title">
    <div class="hero-ghost" aria-hidden="true"><img src="assets/5c77c.png" alt=""></div>
    <header class="header container">
      <a class="brand" href="#inicio" aria-label="Joice Zanatta — início">${vector('f025f.svg','brand-symbol')}<span>Joice Zanatta</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation"><span>Menu</span><span class="menu-bars" aria-hidden="true"></span></button>
      <nav class="navigation" id="navigation" aria-label="Menu principal">
        <a href="#servicos">Serviços</a>
        <a href="https://www.behance.net/joicezanatta" target="_blank" rel="noopener noreferrer">Projetos<span class="external-arrow" aria-hidden="true">↗</span><span class="sr-only"> — portfólio no Behance, abre em nova aba</span></a>
        <a href="#depoimentos">Depoimentos</a>
        <a href="#processo">Processo</a>
        <a href="#sobre">Sobre mim</a>
        <a href="#faq">Dúvidas</a>
        <a class="nav-whatsapp" href="${wa}" target="_blank" rel="noopener noreferrer" aria-label="Conversar com Joice pelo WhatsApp">${vector('b1089.svg')}</a>
      </nav>
    </header>
    <div class="hero-layout container">
      <div class="hero-copy">
        <h1 id="hero-title">Seu trabalho é bom. Sua <strong>presença digital</strong> precisa mostrar isso.</h1>
        <p>Organizo a comunicação do seu negócio com sites, landing pages e posts para redes sociais que apresentam seus serviços com clareza, coerência visual e profissionalismo.</p>
        ${cta('Solicitar orçamento')}
      </div>
      <div class="hero-art">
        <img class="hero-portrait" src="assets/e2bc7.png" alt="Joice Zanatta com blazer claro, segurando um café" fetchpriority="high" width="736" height="914">
        <span class="floating-icon internet"><img src="assets/76f92.png" alt="" width="47" height="47"></span>
        <span class="floating-icon shopping"><img src="assets/836e7.png" alt="" width="49" height="49"></span>
      </div>
    </div>
    <span class="hero-signature signature" aria-hidden="true">Joice Zanatta</span>
  </section>

  <section class="clarity" aria-labelledby="clarity-title">
    ${vector('45c71.svg','dot-grid')}${vector('691f8.svg','clarity-backdrop')}
    <div class="container section-content">
      <h2 id="clarity-title">Um bom trabalho não deveria ser difícil de entender</h2>
      <div class="clarity-cards">
        <article class="clarity-card"><h3>Seu trabalho<br> bem explicado</h3><p>Quando alguém conhece seu negócio pela internet, precisa entender o que você faz, para quem trabalha e como pode contratar você.</p></article>
        <article class="clarity-card reversed"><h3>Coerência na apresentação</h3><p>Informações espalhadas, posts sem unidade visual e um site desatualizado dificultam essa compreensão e podem enfraquecer a confiança de quem ainda não conhece seu trabalho.</p></article>
        <article class="clarity-card"><h3>Facilidade<br> para decidir</h3><p>Sua comunicação precisa facilitar a decisão do cliente, não criar mais dúvidas.</p></article>
      </div>
      ${cta('Quero conhecer o serviço ideal para mim','large')}
    </div>
  </section>

  <div class="ribbons double" aria-hidden="true"><div class="ribbon tilted">${band}</div><div class="ribbon white">${band}</div></div>

  <section class="testimonials" id="depoimentos" aria-labelledby="testimonials-title">
    <div class="testimonial-decoration" aria-hidden="true">${vector('126da.svg','review-wave back')}${vector('1815e.svg','review-wave front')}</div>
    <div class="review-heading container">
      ${rating()}
      <h2 id="testimonials-title">Quem já passou por aqui, conta como foi</h2>
    </div>
    <div class="reviews" id="review-track" tabindex="0" role="region" aria-roledescription="carrossel" aria-label="Depoimentos de clientes. Use as setas ou deslize para navegar.">
      ${reviewImages.map((r,i)=>`<article class="review-card print-card${r.plain?' print-plain':''}" role="group" aria-roledescription="slide" aria-label="${i+1} de ${reviewImages.length}" style="--rw:${r.w};--rh:${r.h};aspect-ratio:${r.w}/${r.h}"><img class="review-print" src="assets/${r.file}" alt="${r.alt}" draggable="false" loading="lazy" style="width:${r.iw};height:${r.ih};top:${r.top};"></article>`).join('')}
    </div>
    <div class="review-controls" role="group" aria-label="Navegar pelos depoimentos">
      <button class="review-arrow previous" type="button" aria-label="Depoimento anterior" aria-controls="review-track"><span aria-hidden="true">←</span></button>
      ${reviewImages.map((q,i)=>`<button type="button" class="review-dot${i===4?' active':''}" aria-label="Mostrar depoimento ${i+1}" aria-controls="review-track" data-review="${i}"></button>`).join('')}
      <button class="review-arrow next" type="button" aria-label="Próximo depoimento" aria-controls="review-track"><span aria-hidden="true">→</span></button>
    </div>
    <p class="review-status" aria-live="polite" aria-atomic="true"></p>
  </section>

  <section class="services" id="servicos" aria-labelledby="services-title">
    <div class="container">
      <p class="eyebrow">Entenda como funciona</p>
      <h2 id="services-title">Escolha o que seu negócio precisa apresentar melhor.</h2>
      <p class="section-intro">Conheça projetos desenvolvidos para apresentar serviços, organizar informações e fortalecer a comunicação visual de cada negócio.</p>
      <div class="service-grid">
        <article class="service-card"><div class="service-heading"><h3>Sites institucionais</h3><span class="service-icon"><img src="assets/2112e.png" alt="" width="72" height="72" loading="lazy"></span></div><p>Para empresas e profissionais que precisam apresentar seus serviços, organizar informações e construir uma presença digital própria.</p></article>
        <article class="service-card"><div class="service-heading"><h3>Landing pages</h3><span class="service-icon"><img src="assets/088c0.png" alt="" width="72" height="72" loading="lazy"></span></div><p>Para apresentar uma oferta, divulgar um serviço ou direcionar o público para uma ação específica.</p></article>
        <article class="service-card social"><div class="service-heading"><h3>Design de posts &amp; Copy para redes sociais</h3><span class="service-icon"><img src="assets/b8fe5.png" alt="" width="72" height="72" loading="lazy"></span></div><p>Para manter uma comunicação visual mais consistente e apresentar seus conteúdos com organização e profissionalismo.</p></article>
      </div>
      <div class="center">${cta('Quero um projeto para meu negócio')}</div>
    </div>
    <div class="ribbons service-ribbons" aria-hidden="true"><div class="ribbon tilted">${band}</div><div class="ribbon white">${band}</div></div>
  </section>

  <section class="process" id="processo" aria-labelledby="process-title">
    <div class="container process-layout">
      <div class="process-copy">
        <h2 id="process-title">Meus processos</h2>
        <div class="process-description"><p>Você acompanha cada etapa do projeto, com clareza sobre o que será feito, os prazos e os momentos de aprovação.</p>
        <ol class="process-steps">${steps.map(([title,text])=>`<li><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol></div>
        ${cta('Quero um projeto para meu negócio')}
      </div>
      <div class="process-art"><img class="process-portrait" src="assets/c4efa.png" alt="Joice Zanatta com blazer claro e uma xícara" loading="lazy">${vector('27a87.svg','process-seal')}</div>
    </div>
  </section>

  <section class="about" id="sobre" aria-labelledby="about-title">
    ${vector('29cc5.svg','about-backdrop')}
    <img class="about-texture" src="assets/222ae.png" alt="" loading="lazy" width="2000" height="1109">
    <div class="container about-layout">
      <div class="about-art"><img class="about-portrait" src="assets/48ee7.png" alt="Joice Zanatta com camisa clara, apoiada em uma mesa" loading="lazy" width="604" height="906"></div>
      <div class="about-copy"><p class="eyebrow">Sobre a profissional</p><h2 id="about-title">Quem faz</h2><p>Sou Joice Zanatta, designer com formação em Relações Públicas. Uno estratégia de comunicação, conteúdo e design para ajudar negócios a apresentar seu valor, transmitir confiança e facilitar a contratação dos seus serviços.</p><p>Meu trabalho considera quem você quer alcançar, o que diferencia sua marca e o que seu público precisa saber para escolher você. Isso orienta a organização das informações, a linguagem e as escolhas visuais de cada projeto.</p><p>O objetivo é que sua presença digital comunique o valor do seu trabalho e dê ao cliente segurança para escolher você.</p></div>
    </div>
  </section>

  <section class="faq" id="faq" aria-labelledby="faq-title">
    <span class="faq-letter signature" aria-hidden="true">Z</span>
    <div class="container section-content"><h2 id="faq-title">Antes de contratar, esclareça suas dúvidas.</h2>
      <div class="faq-list">${faqs.map(([q,a],i)=>`<details class="faq-item${i===0?' first':''}"><summary>${q}${plus(i===0)}</summary><div class="faq-answer"><p>${a}</p></div></details>`).join('')}</div>
    </div>
  </section>

  <section class="contact" id="contato" aria-labelledby="contact-title">
    ${vector('135d8.svg','contact-backdrop')}<img class="contact-texture" src="assets/7484e.png" alt="" loading="lazy" width="2000" height="688">
    <div class="container section-content"><h2 id="contact-title">Vamos organizar a apresentação do seu negócio?</h2><a class="contact-card" href="${wa}" target="_blank" rel="noopener noreferrer"><span class="contact-icon">${vector('3ee5b.svg')}</span><strong>WhatsApp:</strong><span>(51) 99416-9356</span></a></div>
  </section>
</main>
<footer><p>© 2026 <strong>Joice Zanatta.</strong> Todos os direitos reservados.</p><div class="footer-band"></div></footer>
</body></html>`;
// Smaller derivatives use the same photographs and textures; desktop retains originals.
const responsiveHtml = html.replace(/<img\b[^>]*src="assets\/(e2bc7|c4efa|48ee7|5c77c|222ae|7484e)\.png"[^>]*>/g,
  (img,asset)=>`<picture class="responsive-media"><source media="(max-width:1023px)" srcset="assets/mobile/${asset}.webp">${img}</picture>`);
fs.writeFileSync(path.join(root,'index.html'),responsiveHtml);
fs.writeFileSync('work/figma-vector-dimensions.json',JSON.stringify(dimensions,null,2));
console.log('Página montada conforme a revisão atual do Figma.');
