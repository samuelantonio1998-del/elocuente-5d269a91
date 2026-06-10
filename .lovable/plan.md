## Objetivo
Permitir ao admin editar **ABP (área)**, **preço**, e **anexar a planta em PDF** de cada uma das 23 fracções, com reflexo imediato no site público.

## 1. Base de dados (migração)
Adicionar duas colunas à tabela `units`:
- `price` `numeric` (nullable) — preço manual em €; quando vazio, usa o cálculo dinâmico (`area × 2 250 €/m²`, mínimo 290 000 €).
- `floor_plan_url` `text` (nullable) — URL público do PDF da planta.

A coluna `area` já existe (text, ex. `"130 m²"`) — mantém-se editável.

## 2. Storage
Criar bucket público **`floor-plans`** via `supabase--storage_create_bucket` (`public: true`).
Políticas RLS em `storage.objects`:
- `SELECT` público (qualquer pessoa pode ver/descarregar plantas).
- `INSERT`/`UPDATE`/`DELETE` só para admins (`has_role(auth.uid(), 'admin')`).
Convenção de nomes: `units/{unit_id}.pdf` (substituível por upload novo).

## 3. Backoffice — `AdminUnitsTab`
Reformular a linha de cada fracção para incluir:
- **ABP**: `Input` de texto (placeholder `130 m²`) com guardar automático ao desfocar.
- **Preço (€)**: `Input` numérico. Placeholder mostra o preço calculado actual; vazio = automático.
- **Planta PDF**: botão "Carregar PDF" (input file `accept="application/pdf"`). Quando existe, mostra "Ver PDF" + "Substituir" + "Remover". Upload → Supabase Storage → guarda `floor_plan_url` na linha.
- **Estado**: mantém-se como hoje.

Feedback via `toast`; actualização optimista com rollback em caso de erro.

## 4. Site público
- `getUnitPrice(unit)`: se `unit.price != null` → devolve esse valor; senão mantém o cálculo actual.
- `useUnits` passa a expor também `price` e `floor_plan_url`.
- No modal de detalhe da fracção (`UnitDetailsModal`/`AvailabilitySection`), mostrar botão **"Ver planta"** (abre PDF em nova aba) quando `floor_plan_url` existe.
- Traduções PT/EN/ES para "Ver planta".

## 5. Notas técnicas
- Tipo `Unit` em `src/data/units.ts` ganha `price?: number | null` e `floorPlanUrl?: string | null`.
- Regenerar tipos Supabase é automático após a migração.
- Nenhuma alteração ao fluxo de reservas — usa o `getUnitPrice` actualizado.