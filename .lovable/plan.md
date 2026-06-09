## Revisão Visual do Hero

Os problemas vêm de três frentes: (1) o overlay atual é plano e prejudica a leitura do headline; (2) a navbar tem 6 links + CTA + idioma e colide com o logo central; (3) os textos "(estudo prévio – imagem indicativa)" e "TIAGO FRAZÃO ARQUITETOS LDA" estão impressos no topo do próprio render, sobrepondo a barra de navegação.

### 1. Overlay & legibilidade (`HeroSection.tsx`)
- Substituir o overlay plano `bg-charcoal/50` por **dois gradientes combinados**:
  - Gradiente vertical no topo (charcoal/70 → transparente) para dar fundo à navbar e esconder o texto impresso no render.
  - Gradiente vertical no fundo (transparente → charcoal/80) para garantir contraste no headline branco.
- Resultado: céu/edifício permanecem visíveis no centro; texto ganha contraste real.

### 2. Navbar mais respirável (`Navbar.tsx`)
- Reduzir `gap-10` para `gap-6 xl:gap-8` nos links laterais.
- Aumentar o padding lateral do logo central com `px-6` para garantir respiração entre "LOCALIZAÇÃO" / "FRAÇÕES" e o logo "ELOCUENTE".
- Botão **"PEDIR INFORMAÇÃO"** com `whitespace-nowrap` para forçar uma linha só.
- Tracking dos links reduzido de `0.25em` para `0.2em` (ganha espaço sem alterar a estética).

### 3. Créditos impressos no render
Os textos "(estudo prévio – imagem indicativa)" e "TIAGO FRAZÃO ARQUITETOS LDA" fazem parte da imagem `render-front.jpg`, não são overlay HTML. Duas opções:
- **(a)** O gradiente escuro do topo (passo 1) já os disfarça bastante. **Recomendado.**
- **(b)** Adicionar uma legenda discreta própria no canto inferior direito do Hero ("Estudo prévio · Imagem indicativa · Tiago Frazão Arquitetos") em `text-[10px] text-primary-foreground/40`, mantendo o crédito visível mas elegante.

Vou aplicar **(a) + (b)** — o gradiente esconde o texto impresso e adicionamos uma legenda limpa e legível na base.

### 4. Headline
- Trocar `max-w-3xl` por `max-w-4xl` e ajustar `leading-snug` → `leading-tight` para o bloco respirar melhor.
- Adicionar um leve `drop-shadow` subtil ao headline para reforçar legibilidade independentemente do fundo.

### Ficheiros alterados
- `src/components/HeroSection.tsx` — overlays duplos, legenda de créditos, headline.
- `src/components/Navbar.tsx` — gaps, padding do logo, `whitespace-nowrap` no CTA, tracking.

Nenhuma alteração de conteúdo, traduções ou lógica de negócio.
