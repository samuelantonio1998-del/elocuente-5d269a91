# Substituição dos renders do projeto

Substituir as imagens atualmente em `src/assets/render-*.jpg` e `interior-living.jpg` pelas 6 novas imagens enviadas (1.jpeg–6.jpeg).

## Mapeamento proposto

Cada imagem nova é atribuída ao slot que melhor corresponde ao seu enquadramento, mantendo os imports existentes (nenhum componente precisa de ser editado):

| Slot atual | Nova imagem | Porquê |
|---|---|---|
| `render-entrance.jpg` | imagem **1** | entrada com portão e sinalética |
| `interior-living.jpg` | imagem **2** | terraço/varanda — estilo de vida |
| `render-front.jpg` | imagem **3** | fachada principal vista da rua |
| `render-back.jpg` | imagem **4** | volume traseiro com passadiço |
| `render-side.jpg` | imagem **5** | fachada lateral com árvores |
| `render-garden.jpg` | imagem **6** | jardim interior / pátio |
| `render-aerial.jpg` | imagem **3** (reutilizada) | sem render aéreo nos envios; usar a mais panorâmica |
| `render-detail.jpg` | imagem **4** (reutilizada) | sem novo detalhe; usar render do passadiço |

## Detalhes técnicos

1. Fazer upload das 6 imagens via `lovable-assets create` a partir de `/mnt/user-uploads/{1..6}.jpeg` para o CDN, gerando ficheiros `*.asset.json` em `src/assets/`.
2. Substituir os ficheiros binários atuais (`render-front.jpg`, `render-side.jpg`, `render-back.jpg`, `render-garden.jpg`, `render-entrance.jpg`, `render-detail.jpg`, `render-aerial.jpg`, `interior-living.jpg`) — atualizar os imports nos componentes (`HeroSection`, `GallerySection`, `AboutSection`, `AmenitiesSection`, `LocationSection`, `SilverCoastLanding`, `GuidePage`) para apontar para os novos `.asset.json` em vez dos `.jpg` antigos.
3. Apagar os `.jpg` antigos que deixam de ser referenciados.
4. Não tocar em `hero-building.jpg`, `interior-bedroom.jpg`, `amenities-pool.jpg` (não usados na app atualmente).

## Pontos a confirmar

- Confirmas a sinalética **"MONTE GRANDE VILLAGE"** visível na imagem 1 (não diz "Elocuente")?
- Ok reutilizar a imagem 3 para o slot "aéreo" e a imagem 4 para "detalhe"?
