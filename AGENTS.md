# Site de Joice Zanatta

## Preferências e decisões da cliente

- Leia o Figma atual antes de sincronizar o site: arquivo yswugBOWY9QScx4qtarJQb, frame 2679:92. Compare todas as seções modificadas. Preserve correções já solicitadas ao incorporar novidades.
- Mantenha as fontes originais e os pesos: Libre Baskerville, Lato, Manrope e Carattere, servidos localmente. Não substitua por fontes semelhantes.
- Preserve a escala global de 1920 unidades no desktop. Ajuste o fluxo para o conteúdo caber sem cortes e sem sobreposição, conferindo também celular. Não altere somente a primeira dobra.
- Use as fotos, imagens, recortes, transparências e ícones atuais do Figma. Preserve a opacidade de 30% no fundo dos serviços.
- Ambas as transições com faixas devem conter a faixa bege inclinada e a faixa branca abaixo, com as letras inteiras.
- O degradê branco da seção Sobre deve atravessar toda a largura e acompanhar a altura e as paradas atuais do Figma. Não o limite à área da foto.
- Os depoimentos usam prints reais, com setas, indicadores que acompanham a seleção, toque, arraste e teclado. Atualize a quantidade de indicadores quando houver novos prints. O maior print não pode cobrir o título nem os controles; preserve o espaço acima dele e abaixo até as setas.
- A cliente rejeitou bolinhas com contornos na navegação dos depoimentos. Use uma barra horizontal discreta e arrastável, marcador retangular, contador e setas simples sem moldura. Preserve contraste, indicação da seleção, teclado e área de toque no celular.
- Os textos são objetivos, sem listas desnecessárias de exemplos ou repetição dos tipos de serviço. A apresentação deve mostrar o valor de comunicação, conteúdo e design, além da estética. Não invente experiência, métricas ou resultados garantidos.
- Personalização considera necessidades, objetivos, estilo, preferências visuais e tom de voz. Não enumere tipos de tom de voz na resposta.
- Criação dos textos pode ser incluída conforme a necessidade avaliada no planejamento. Joice não publica posts nem faz gerenciamento de redes sociais; entrega conteúdos finalizados em PNG ou JPG.
- Menu vigente: Serviços, Projetos, Depoimentos, Processo, Sobre mim, Dúvidas. Projetos abre o Behance em nova aba. Os demais itens levam às respectivas seções, com Processo antes de Sobre mim.
- WhatsApp: https://wa.me/5551994169356. Portfólio: https://www.behance.net/joicezanatta.
- Trabalhe na prévia local. Não publique sem solicitação da cliente.

## Fontes de implementação

- HTML: work/montar-site.cjs gera outputs/site-joice/index.html.
- CSS: work/layout-desktop.css, work/layout-mobile.css e work/consolidar-layout.cjs geram outputs/site-joice/style.css. O layout de celular e tablet até 1023 px fica em layout-mobile.css; layout-mobile-original.css é apenas referência antiga e não entra na geração.
- No celular, use composição compacta com texto à esquerda e foto à direita, conforme a correção da cliente de 22/10/2026. Não separe título, foto e subtítulo em blocos grandes empilhados. Reduza os títulos, fotos, espaços e cartões em todas as dobras; botões devem ter largura proporcional ao rótulo, sem ocupar a tela inteira. Equilibre as quebras para evitar palavras isoladas. O menu e o carrossel usam a mesma mudança de layout em 1024 px.
- No celular, mostre mais de um depoimento ou parte dos vizinhos, em escala menor. Os prints podem ser ampliados com um toque e fechados por botão ou Escape; preserve os recortes reais, setas, arraste e indicadores.
- A foto da abertura deve ter presença maior, mantendo o texto à esquerda e a dobra compacta. Em Processo, mantenha título e introdução agrupados, sem centralizar o texto na altura da foto. O degradê de Sobre acompanha a foto em toda a largura; o contato mantém as proporções dos fundos.
- Revisão 15: aumentar novamente a foto da abertura sem mudar a altura da dobra. No celular, não mostrar o pontilhado; manter as faixas bege e branca próximas, com letras inteiras. O carrossel acompanha a altura dos prints visíveis, e as ondas terminam antes dos controles. Quem faz fica com texto contínuo e fundo limpo, sem foto abaixo de 600 px; preservar foto e efeitos em tablet e computador. As camadas do contato usam a mesma escala e deixam espaço acima do título.
- Revisão 16: preservar a composição de computador; afastar a assinatura decorativa do botão da abertura. No computador, usar controles maiores com Anterior, Próximo, contador e bolinhas. No carrossel, permitir apenas rolagem interna horizontal: gesto vertical deve rolar a página, sem deslocar ou cortar os prints. Manter altura adaptável e a ampliação com um toque.
- Revisão 17 substitui o visual dos controles da revisão 16: barra com marcador retangular arrastável, contador e setas sem círculos, cápsulas, bordas ou sombras. O foco por teclado destaca o marcador e a linha. Preservar as demais correções e a composição da página.
- Preserve as cores claras do projeto também no modo escuro automático do navegador, com color-scheme only light e text-size-adjust 100%. Confira larguras pequenas e o limite de 1024 px; não presuma que testar uma largura equivale a testar um aparelho real.
- Carrossel: work/carrossel.js corresponde à parte final de outputs/site-joice/app.js. Mantenha ambos sincronizados.
- JavaScript base: work/app-base.js. work/montar-site.cjs reúne esse arquivo e work/carrossel.js ao gerar outputs/site-joice/app.js.
- Aprovações textuais: outputs/textos-aprovados.txt. Snapshot mais recente nesta revisão: work/figma-revisao16.txt, idêntico à revisão 15 em conteúdo e layout. O Figma atual tem sete depoimentos, com remoção de cb037.png e posição inicial atualizada; preservar os textos aprovados.
- Mude as fontes de geração, não apenas os arquivos gerados. Não reverta conteúdo aprovado ao reconstruir a página.
