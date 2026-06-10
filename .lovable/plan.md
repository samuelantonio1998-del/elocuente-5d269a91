## Animações de scroll — assinatura por secção

Cada secção ganha um movimento próprio ao entrar no viewport, mantendo o tom minimalista (Playfair/DM Sans, charcoal/gold/cream). Animações suaves, `once: true`, com fallback a `prefers-reduced-motion`.

### Componentes novos

- `Reveal` — wrapper com variantes: `fade-up`, `fade`, `slide-left`, `slide-right`, `mask-reveal`, `scale-in`. Aceita `delay` e `duration`.
- `StaggerGroup` + `StaggerItem` — orquestra entradas sequenciais (cards, listas, imagens de galeria).
- `SplitText` — divide um título em palavras/linhas para reveal staggered (usado em headings principais).
- `Parallax` — translateY ligado ao scroll (framer-motion `useScroll` + `useTransform`).

### Assinatura por secção

| Secção | Movimento |
|---|---|
| Hero | Parallax suave na imagem (translateY 0→-60px), título com SplitText por palavra, subtítulo fade-up com delay, CTA scale-in |
| About | Texto fade-up à esquerda, imagem slide-right com leve scale 1.05→1 |
| Features | Grid de cards com StaggerGroup (80ms entre cards), ícones com scale-in |
| Apartments | Cards entram em stagger alternado (esquerda/direita), preço com fade tardio |
| Floor Plans / Phases | Mask-reveal (clip-path) nas plantas, legendas fade-up staggered |
| Gallery | Imagens com mask-reveal vertical, em stagger por coluna |
| Availability | Cabeçalho fade-up, linhas da tabela entram em stagger rápido (40ms) |
| Amenities | Ícones scale-in com stagger, títulos fade-up |
| Location | Mapa fade + scale, POIs em stagger lateral |
| Contact | Formulário fade-up, campos em stagger curto |
| Footer | Fade simples |

### Detalhes técnicos

- Base: `framer-motion` já instalado. Substituir o atual `AnimatedSection` por `Reveal` (mantendo compat: default = `fade-up`).
- Timings: duração 0.6–0.8s, easing `[0.22, 1, 0.36, 1]` (ease-out-expo suave).
- Viewport trigger: `{ once: true, margin: "-15% 0px" }`.
- Parallax e SplitText desativados em mobile (<768px) e quando `prefers-reduced-motion: reduce` — fallback para fade simples.
- Performance: usar apenas `transform` e `opacity`; `will-change` aplicado durante a animação.

### Ficheiros

- Novos: `src/components/motion/Reveal.tsx`, `Stagger.tsx`, `SplitText.tsx`, `Parallax.tsx`
- Editar: `HeroSection`, `AboutSection`, `FeaturesSection`, `ApartmentsSection`, `PhasesSection`, `GallerySection`, `AvailabilitySection`, `AmenitiesSection`, `LocationSection`, `ContactSection`, `Footer`
- `AnimatedSection.tsx` passa a reexportar `Reveal` para não quebrar imports existentes.
