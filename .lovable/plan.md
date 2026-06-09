# Reordenar imagens conforme a numeração 1-6

A imagem **1** passa a ser o fundo do Hero, e a galeria mostra as imagens pela ordem **1 → 2 → 3 → 4 → 5 → 6**.

## Mapeamento de ficheiros (binários a sobrescrever)

| Ficheiro | Imagem | Usado em |
|---|---|---|
| `render-front.jpg` | **1** | Hero (novo), Gallery #1, AboutSection, SilverCoastLanding |
| `render-side.jpg` | **2** | Gallery #2 |
| `render-garden.jpg` | **3** | Gallery #3, AmenitiesSection |
| `render-entrance.jpg` | **4** | Gallery #4, AmenitiesSection |
| `render-detail.jpg` | **5** | Gallery #5, AmenitiesSection |
| `render-back.jpg` | **6** | Gallery #6 |
| `render-aerial.jpg` | **1** (reutilizada) | LocationSection, GuidePage, AmenitiesSection, SilverCoastLanding — não tem slot na galeria |
| `interior-living.jpg` | **2** (reutilizada) | SilverCoastLanding |

## Alterações de código

1. **`src/components/HeroSection.tsx`** — trocar `import heroImage from "@/assets/render-side.jpg"` para `"@/assets/render-front.jpg"` (para o Hero usar a imagem 1).
2. **`src/components/GallerySection.tsx`** — reordenar `galleryImages` para 6 entradas pela ordem 1-6:
   ```
   Front (1), Side (2), Garden (3), Entrance (4), Detail (5), Back (6)
   ```
   Remover a entrada `renderAerial` da lista (e o respetivo import).
3. **Sobrescrever os 8 binários** em `src/assets/` conforme a tabela acima, copiando de `user-uploads://1.jpeg`..`6.jpeg`.

Nenhuma outra alteração nos componentes — os imports nos restantes ficheiros (Amenities, Location, About, etc.) permanecem válidos.
