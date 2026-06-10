## Alterações

### 1. Tipografia — Playfair Display → Jost
Mudar a fonte de títulos (`font-heading`) de "Playfair Display" para **Jost** (já está pré-carregado no `index.html`), mantendo "Montserrat" no corpo.

- `tailwind.config.ts`: `heading: ['Jost', 'sans-serif']`.
- `index.html`: estender o import do Jost para incluir os pesos 500/600/700 (atualmente só 300/400) e remover Playfair Display do URL.
- Resultado: todos os títulos de secção, "T2/T3" nos cards, etc., passam a sans geométrico em harmonia com o wordmark "ELOCUENTE".

### 2. Hero — reduzir tamanho do subtítulo em 2 passos
`src/components/HeroSection.tsx` linha 55:
- antes: `text-2xl md:text-4xl lg:text-5xl`
- depois: `text-lg md:text-2xl lg:text-3xl`

### 3. Fração A02: T2 → T3
- `src/data/units.ts`: alterar A02 para `type: "T3"`.
- Base de dados: `UPDATE public.units SET type='T3' WHERE id='A02'`.

A ABP de 130 m² mantém-se; total passa a 2 T2/T3 corretos (A02 e A11 como T3).

### 4. CTA "Enviar Pedido" — promover a primário
`src/components/ContactSection.tsx` (linha 198):
- antes: `bg-foreground text-background hover:bg-gold`
- depois: `bg-gold text-charcoal hover:bg-gold/90` (igual ao "PEDIR INFO" do header), com altura ligeiramente maior (`py-5`) e tracking mantido. Mantém o estado disabled.

## Confirmações de consistência
- Não há outros sítios a usar `font-heading` que dependam de serifa; a mudança é uniforme.
- Não toco em componentes/funcionalidades; só estilos e dados.