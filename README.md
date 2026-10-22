# Site de Joice Zanatta

Página de apresentação dos serviços de Joice Zanatta, desenvolvida em HTML, CSS e JavaScript a partir do Figma aprovado.

## Arquivos do site

A pasta `outputs/site-joice` contém a página completa, com imagens e fontes locais. Ela é a pasta a ser publicada na hospedagem. O site não exige instalação de dependências nem compilação para funcionar.

Para visualizar, abra `outputs/site-joice/index.html` no navegador ou sirva essa pasta com um servidor local.

## Edição

- `work/montar-site.cjs`: gera o HTML.
- `work/layout-desktop.css`: estilos do modelo de 1920 unidades.
- `work/layout-mobile.css` e `work/consolidar-layout.cjs`: layout de celular/tablet até 1023 px e geração do CSS final. `layout-mobile-original.css` guarda apenas as regras antigas.
- `work/carrossel.js`: comportamento dos depoimentos. Manter sincronizado com a parte final de `outputs/site-joice/app.js`.
- `work/app-base.js`: menu, dúvidas, escala dos vetores e posição responsiva do degradê. O gerador HTML reúne `work/compatibilidade.js`, este arquivo e `work/carrossel.js` para gerar `app.js`.
- `work/compatibilidade.js` e `work/compatibilidade.css`: proteções do tema claro e alternativas por recurso disponível no navegador. O gerador inclui esses arquivos, preservando o layout aprovado.
- `work/testar-compatibilidade.cjs`: verifica alternativas das APIs e cria uma prévia QA local com recursos recentes desativados. A prévia não entra no Git nem na publicação.
- `work/preparar-mobile.py`: gera versões WebP menores das fotos e texturas para celular, com Python e Pillow. Os originais permanecem disponíveis para computador.

Para reconstruir HTML e CSS, execute na raiz do repositório, com Node.js instalado:

```sh
node work/montar-site.cjs
node work/consolidar-layout.cjs
```

Os arquivos prontos já estão incluídos. A hospedagem pode publicar diretamente `outputs/site-joice`, sem executar esses comandos.

## Hospedagem

Na Vercel, configure **Root Directory** como `outputs/site-joice` e **Framework Preset** como `Other`. O site é estático e não precisa de comando de build. Após alterar essa configuração, faça uma nova publicação para que ela seja aplicada.

O bloqueio de indexação da prévia foi removido da versão publicada e do gerador do HTML.

WhatsApp: https://wa.me/5551994169356

Portfólio: https://www.behance.net/joicezanatta

Conteúdo e identidade visual de Joice Zanatta. Todos os direitos reservados.
