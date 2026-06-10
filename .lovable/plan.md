## Objetivo
1. Corrigir o bug visual `AVAILABILITY.STATUS.UNKNOWN` mostrando "Disponível" por defeito.
2. Migrar as fracções para a base de dados e criar um backoffice (`/admin`) onde pode gerir o estado de cada fracção, ver/gerir reservas e ver contactos.

## Parte 1 — Fix imediato do estado

- Em `src/data/units.ts`: mudar o tipo `UnitStatus` para `"available" | "reserved" | "sold"` e o estado inicial de todas as fracções de `"unknown"` para `"available"`.
- Em `src/components/AvailabilitySection.tsx`: substituir a label "unknown" por `availability.status.available` (PT "Disponível", EN "Available", ES "Disponible"). Adicionar variantes de cor: verde subtil para disponível, neutro para reservado, mais escuro para vendido. O botão "Reservar" fica desativado se `reserved` ou `sold`.
- Remover (ou deixar vazia) a chave `availability.status.unknown` — deixa de ser usada.

## Parte 2 — Backend de gestão

### Base de dados (Lovable Cloud)

Novas tabelas:

- **`units`** (23 linhas) — espelho das fracções: `id` (PK, ex. "A01"), `building`, `floor`, `type`, `area`, `parking`, `orientation`, `status` ("available" | "reserved" | "sold"), `updated_at`. Seed com os 23 valores atuais. Leitura pública (`anon` SELECT), escrita só admin.
- **`user_roles`** + enum `app_role` ("admin") + função `has_role()` (security definer) — padrão recomendado.

Atualizações nas tabelas existentes:
- `reservations` e `contact_leads` ganham políticas adicionais SELECT/UPDATE/DELETE para admin (via `has_role(auth.uid(), 'admin')`).

### Auth

- Ativar email + password. Sem auto-confirm. Sem signups anónimos.
- Activar HIBP (proteção contra passwords vazadas).
- A app pública não tem signup; só a página `/admin/login` permite **login** (não cria contas). O primeiro utilizador admin é criado por mim através do Lovable Cloud → Users, depois é inserido em `user_roles`. Vou explicar esse passo no fim.

### Frontend

- `useReservedUnits` é substituído por um hook `useUnitStatuses` que lê da tabela `units` (com canal realtime para refrescar quando o admin muda o estado).
- Novas rotas (não indexadas no menu, sem links públicos):
  - `/admin/login` — formulário email+password.
  - `/admin` — layout protegido (redireciona se não autenticado / não admin). Sidebar com 3 separadores:
    - **Fracções** — tabela com as 23 fracções e um `<Select>` por linha para alterar estado (Disponível/Reservado/Vendido). Update otimista + toast.
    - **Reservas** — lista das submissões em `reservations` com filtros por estado; ações para marcar `confirmed`/`cancelled`.
    - **Contactos** — lista read-only de `contact_leads` (nome, email, telefone, tipologia, mensagem, data) com pesquisa simples.

### Detalhes técnicos
- Componentes shadcn já existentes (Dialog, Select, Table, Tabs, Toast).
- Validação Zod nos formulários de login e mudança de estado.
- RLS: tudo escrito via Data API com policies baseadas em `has_role`. Edge functions não são necessárias.
- `noindex` nas páginas `/admin*`.

## Passos pós-implementação (utilizador)
1. Ir a Backend → Users e criar o utilizador admin com email/password.
2. Eu adiciono uma linha em `user_roles` (vou pedir confirmação com o `user_id` após criar a conta) para promover esse utilizador a admin.
3. Aceder a `/admin/login`.