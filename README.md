# Site de Joice Zanatta

Página de apresentação dos serviços de Joice Zanatta, desenvolvida em HTML, CSS e JavaScript a partir do Figma aprovado.

## Arquivos do site

A pasta `outputs/site-joice` contém a página completa, com imagens e fontes locais. Ela é a pasta a ser publicada na hospedagem. O site não exige instalação de dependências nem compilação para funcionar.

Para visualizar, abra `outputs/site-joice/index.html` no navegador ou sirva essa pasta com um servidor local.

## Edição

- `work/montar-site.cjs`: gera o HTML.
- `work/layout-desktop.css`: estilos do modelo de 1920 unidades.
- `work/layout-mobile-original.css` e `work/consolidar-layout.cjs`: ajustes de escala e celular; geram o CSS final.
- `work/carrossel.js`: comportamento dos depoimentos. Manter sincronizado com a parte final de `outputs/site-joice/app.js`.

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
