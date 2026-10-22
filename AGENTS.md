# Site de Joice Zanatta

## Preferências e decisões da cliente

- Leia o Figma atual antes de sincronizar o site: arquivo yswugBOWY9QScx4qtarJQb, frame 2679:92. Compare todas as seções modificadas. Preserve correções já solicitadas ao incorporar novidades.
- Mantenha as fontes originais e os pesos: Libre Baskerville, Lato, Manrope e Carattere, servidos localmente. Não substitua por fontes semelhantes.
- Preserve a escala global de 1920 unidades no desktop. Ajuste o fluxo para o conteúdo caber sem cortes e sem sobreposição, conferindo também celular. Não altere somente a primeira dobra.
- Use as fotos, imagens, recortes, transparências e ícones atuais do Figma. Preserve a opacidade de 30% no fundo dos serviços.
- Ambas as transições com faixas devem conter a faixa bege inclinada e a faixa branca abaixo, com as letras inteiras.
- O degradê branco da seção Sobre deve atravessar toda a largura e acompanhar a altura e as paradas atuais do Figma. Não o limite à área da foto.
- Os depoimentos usam prints reais, com setas, indicadores que acompanham a seleção, toque, arraste e teclado. Atualize a quantidade de indicadores quando houver novos prints. O maior print não pode cobrir o título nem os controles; preserve o espaço acima dele e abaixo até as setas.
- As bolinhas de navegação devem ser visíveis sobre o fundo claro, clicáveis e com indicação clara da bolinha selecionada. Preserve o contraste e a área de clique no celular.
- Os textos são objetivos, sem listas desnecessárias de exemplos ou repetição dos tipos de serviço. A apresentação deve mostrar o valor de comunicação, conteúdo e design, além da estética. Não invente experiência, métricas ou resultados garantidos.
- Personalização considera necessidades, objetivos, estilo, preferências visuais e tom de voz. Não enumere tipos de tom de voz na resposta.
- Criação dos textos pode ser incluída conforme a necessidade avaliada no planejamento. Joice não publica posts nem faz gerenciamento de redes sociais; entrega conteúdos finalizados em PNG ou JPG.
- Menu vigente: Serviços, Projetos, Depoimentos, Processo, Sobre mim, Dúvidas. Projetos abre o Behance em nova aba. Os demais itens levam às respectivas seções, com Processo antes de Sobre mim.
- WhatsApp: https://wa.me/5551994169356. Portfólio: https://www.behance.net/joicezanatta.
- Trabalhe na prévia local. Não publique sem solicitação da cliente.

## Fontes de implementação

- HTML: work/montar-site.cjs gera outputs/site-joice/index.html.
- CSS: work/layout-desktop.css, work/layout-mobile.css e work/consolidar-layout.cjs geram outputs/site-joice/style.css. O layout de celular e tablet até 1023 px fica em layout-mobile.css; layout-mobile-original.css é apenas referência antiga e não entra na geração.
- No celular, mantenha o título antes da foto e agrupe a imagem ao conteúdo da própria seção. Não devolva as fotos do processo e da apresentação ao fim de blocos longos. O menu e o carrossel usam a mesma mudança de layout em 1024 px.
- Carrossel: work/carrossel.js corresponde à parte final de outputs/site-joice/app.js. Mantenha ambos sincronizados.
- Aprovações textuais: outputs/textos-aprovados.txt. Snapshot mais recente nesta revisão: work/figma-revisao8.txt. A revisão 8 ajustou somente a posição dos depoimentos; as demais seções permanecem como aprovadas.
- Mude as fontes de geração, não apenas os arquivos gerados. Não reverta conteúdo aprovado ao reconstruir a página.
