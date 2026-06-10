## Botão flutuante WhatsApp

Adicionar um CTA flutuante de WhatsApp, sempre visível, canto inferior direito.

### Novo componente `src/components/WhatsAppFAB.tsx`
- Link `<a>` para `https://wa.me/351914383708?text=<mensagem traduzida>`, `target="_blank"`, `rel="noopener noreferrer"`.
- Ícone `MessageCircle` do `lucide-react` (lucide não tem ícone oficial WhatsApp; alternativa: usar SVG inline da marca WhatsApp — opto por **SVG inline do logo WhatsApp** para reconhecimento imediato).
- Estilo: botão redondo 56×56 px (mobile) / 60×60 px (desktop), fundo verde WhatsApp `#25D366`, ícone branco, sombra suave, `fixed bottom-6 right-6 z-50`.
- Hover: leve scale (1.05) + sombra reforçada. Animação de entrada suave (fade + slide-up) após ~600 ms via `framer-motion`, respeitando `useReducedMotion`.
- `aria-label` traduzido ("Contactar via WhatsApp" / "Contact via WhatsApp" / "Contactar por WhatsApp").
- Tooltip opcional no hover desktop (mostra "Fale connosco" traduzido). Opcional, simples via `title` para já.

### Traduções (`src/i18n/translations.ts`)
Adicionar chaves:
- `whatsapp.aria` — "Contactar via WhatsApp" / "Contact via WhatsApp" / "Contactar por WhatsApp"
- `whatsapp.message` — 
  - PT: "Olá, entre em contacto com o vendedor."
  - EN: "Hello, please get in touch with the sales agent."
  - ES: "Hola, póngase en contacto con el vendedor."

A mensagem é codificada com `encodeURIComponent` no URL.

### Integração
- Importar e montar `<WhatsAppFAB />` em `src/pages/Index.tsx`, no fim do layout (fora das secções, para ficar fixo sobre tudo).

### Detalhes técnicos
- Número: `351914383708` (sem `+` e sem espaços, formato `wa.me`).
- `z-50` para ficar acima das secções; não sobrepõe modais (modal de reserva usa portal/overlay próprio com z maior).
- Sem dependências novas — usa `framer-motion` já instalado.
