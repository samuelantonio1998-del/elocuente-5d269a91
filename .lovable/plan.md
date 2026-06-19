## Objetivo

Redesenhar visualmente a secção de contacto (`ContactSection.tsx`) mantendo **todos os campos atuais do formulário** intactos, aplicando um layout mais editorial inspirado em colagens polaroid com tipografia manuscrita simulada via Playfair Display italic.

## O que muda

### Layout
- Passar de layout centrado simples para **layout assimétrico de duas colunas** em desktop:
  - **Coluna esquerda (40%)**: colagem editorial com 2–3 "polaroids" inclinadas (rotações leves -4° / +3° / -2°), molduras brancas, sombras suaves, e pequenas notas manuscritas em Playfair italic sobrepostas ("Marinha Grande", "T2 · vista jardim", etc.)
  - **Coluna direita (60%)**: cartão do formulário com fundo cream, padding generoso, e título manuscrito em Playfair italic
- Em mobile: colagem empilhada por cima, formulário por baixo

### Tipografia
- Título principal continua Playfair Display, mas adiciono uma **palavra-âncora em italic** (ex: *"Manifeste"* italic + "o seu interesse" regular)
- Pequenas anotações decorativas (etiquetas nas polaroids, "P.S." junto ao botão) em Playfair italic, tamanho pequeno, cor charcoal/60
- Corpo do formulário inalterado (DM Sans)

### Cores e materiais
- Fundo da secção: cream com leve textura/grão (gradiente subtil)
- Moldura polaroid: branco puro com `shadow-elegant` já existente
- Acentos dourados mantidos no botão e divisores

### Placeholders das imagens
- Como vais fornecer as imagens depois, deixo **3 slots polaroid** com placeholders semitransparentes referenciando paths previsíveis:
  - `src/assets/polaroid-1.jpg`
  - `src/assets/polaroid-2.jpg`
  - `src/assets/polaroid-3.jpg`
- Quando enviares as imagens, basta substituir os ficheiros.

### Animação
- Entrada via `AnimatedSection` já existente
- Polaroids com hover sutil: levantam 4px e endireitam a rotação

## O que NÃO muda

- Todos os campos do formulário (nome completo, email, telefone, data de nascimento com 3 dropdowns, tipologia, mensagem, RGPD, etc.)
- Validações e submissão para Supabase
- Traduções PT/EN/ES (apenas adapto/adiciono chaves para os novos textos decorativos)

## Ficheiros afetados

- `src/components/ContactSection.tsx` — reescrita da estrutura JSX e classes, formulário intacto
- `src/i18n/translations.ts` — adicionar chaves para as legendas das polaroids e título italic
- `src/index.css` — pequenas utilities para rotação/moldura polaroid se necessário

## Próximos passos após aprovação

1. Implementar o redesenho
2. Avisar-te para enviares as 3 imagens das polaroids
