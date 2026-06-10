## Objetivo
Tornar o seletor de idioma sempre visível na navbar, substituindo o dropdown atual (botão "Globe PT" que abre menu) por três botões fixos lado a lado: **PT · EN · ES**. O idioma ativo fica destacado (dourado) e os outros em tom suave, clicáveis a qualquer momento sem precisar de abrir um menu.

## Alterações

### `src/components/Navbar.tsx`
1. **Desktop (≥lg)** — Substituir o bloco do "Language switcher" (linhas ~80–122) por um grupo inline com os 3 botões PT · EN · ES separados por um ponto/divisor subtil. Remover o estado `langOpen` e o `AnimatePresence` do dropdown desktop.
2. **Mobile (<lg)** — Substituir o botão "Globe + PT" e o dropdown mobile (linhas ~126–178) pelo mesmo grupo compacto PT·EN·ES, mantido à esquerda do hamburger. Remover totalmente o `AnimatePresence` mobile do idioma.
3. Remover `useState(langOpen)` e o ícone `Globe` (já não necessário).
4. Estilos:
   - Botão ativo: `text-gold` (ou `text-foreground` quando scrolled).
   - Botões inativos: mesma cor muted usada hoje nos links.
   - Tamanho/tracking iguais aos links da navbar (`text-[11px] tracking-[0.2em] uppercase`).
   - Separadores: `·` ou `border-l` ténue entre cada idioma.

Nada mais é alterado — comportamento de `setLang`, contexto e traduções permanecem iguais.

## Resultado
- Os 3 idiomas ficam permanentemente visíveis tanto em desktop como mobile.
- Um clique muda o idioma instantaneamente, sem abrir/fechar menu.
- Mantém o estilo minimalista charcoal/gold do projeto.