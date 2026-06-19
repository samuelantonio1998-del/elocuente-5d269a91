## Objetivo

Substituir o carrossel automático em "O Empreendimento" por um efeito de scroll: a coluna da imagem fica fixa (sticky) enquanto se faz scroll, e a imagem muda à medida que cada bloco de texto entra em vista. Após o último bloco, o scroll da página continua normalmente.

## Como vai funcionar

```text
┌──────────────────────┬──────────────────────┐
│                      │  Bloco 1 (texto)     │
│   IMAGEM 1           │                      │
│   (sticky)           ├──────────────────────┤
│                      │  Bloco 2 (texto)     │
│   → muda p/ IMAGEM 2 │                      │
│                      ├──────────────────────┤
│   → muda p/ IMAGEM 3 │  Bloco 3 (texto)     │
└──────────────────────┴──────────────────────┘
       scroll continua para a próxima secção
```

- Coluna esquerda: container `sticky top-0 h-screen` com as 3 imagens sobrepostas (fade entre elas).
- Coluna direita: os 3 blocos de texto, cada um ocupando aprox. uma altura de viewport para criar o "espaço" de scroll.
- Um `IntersectionObserver` em cada bloco define qual imagem está ativa (índice 0/1/2).
- A transição entre imagens é um fade suave (opacity), mantendo a estética minimal atual.
- No fim do último bloco, o sticky liberta e a página continua o scroll normal para a secção seguinte.

## Mobile

Em ecrãs pequenos (`lg` abaixo), mantém o layout empilhado atual com uma única imagem fixa no topo da secção (sem sticky), porque o efeito side-by-side só faz sentido em desktop. Alternativa: usar a primeira imagem como estática no mobile.

## Detalhes técnicos

- Ficheiro: `src/components/AboutSection.tsx`.
- Remover `setInterval` e o estado baseado em tempo.
- Estrutura:
  - Wrapper `grid lg:grid-cols-2`.
  - Esquerda: `<div className="lg:sticky lg:top-0 lg:h-screen">` com as 3 `<img>` em `absolute inset-0` e `opacity` controlado por `activeIdx`.
  - Direita: 3 `<div>` cada um `lg:min-h-screen flex items-center`, com `ref` registado num `IntersectionObserver` (`threshold: 0.5` ou `rootMargin: "-40% 0px -40% 0px"`) que faz `setActiveIdx(i)`.
- Manter as animações `Reveal`/`Stagger` existentes dentro de cada bloco.
- Sem libs novas — apenas React + IntersectionObserver nativo.
