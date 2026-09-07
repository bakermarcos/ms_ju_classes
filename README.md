# Ms. Ju — Pedagogia Bilíngue

Landing page da Teacher Júlia Tamietti. Apresenta metodologia, planos para
crianças e adultos, formações para escolas e galeria, com CTA direto no
WhatsApp.

**No ar:** <https://msju-site.web.app> (Firebase Hosting)
**Domínio próprio:** `msjuliatamietti.com.br`, com DNS ainda apontando para a
Shopify, ver [`docs/migracao-dominio.md`](docs/migracao-dominio.md).

---

## Stack

- React 19 + Vite 6 + TypeScript
- CSS único em `index.css` (design tokens em `:root`)
- Firebase Firestore (opcional) para editar preços sem novo deploy
- Firebase Hosting, com cabeçalhos de segurança em `firebase.json`

---

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

```bash
npm run build         # gera dist/
npm run preview       # serve o dist/ localmente
npm run deploy        # build + publica no Firebase Hosting
npm run deploy:rules  # publica só as regras do Firestore
```

---

## Estrutura

| Onde | O quê |
| --- | --- |
| `components/` | Seções da página (`Hero`, `Pricing`, `OnlineKit`, `MasterClass`, …) |
| `components/Icons.tsx` | Ícones SVG inline (sem Font Awesome) |
| `lib/config.ts` | **Valores base**: preços, taxa de matrícula, duração, cidade |
| `lib/firebase.ts` | Busca a configuração remota no Firestore |
| `lib/whatsapp.ts` | Número e mensagens pré-preenchidas do WhatsApp |
| `lib/images.ts` | Caminhos das imagens (versões WebP) |
| `index.css` | Estilos globais e tokens de cor/tipografia/movimento |
| `firestore.rules` | Regras de segurança do Firestore |
| `firebase.json` | Hosting: rewrites, cache e cabeçalhos de segurança |
| `lib/analytics.ts` | Google Analytics 4 (só liga com `measurementId`) |
| `docs/` | Migração de domínio, segurança, analytics e config legada |

### Paleta

Extraída da logo: roxo `#451561` (primária) e âmbar `#F5B324` (secundária).
Todos os tons derivados estão em `:root`, no topo do `index.css`. Trocar a
marca inteira = trocar essas variáveis.

O ritmo das seções alterna as duas cores: roxo claro nos planos e na galeria,
âmbar no bloco do kit online (`.section-amber`), roxo escuro na master class
(`.section-dark`). Para texto sobre fundo âmbar use `--amber-700`, não
`--amber-500`: o tom claro não passa dos 4,5:1 exigidos em texto pequeno.

### Tipografia

Fonte do sistema em toda a página (`-apple-system` → SF Pro no iOS/macOS,
Segoe UI no Windows, Roboto no Android). Nenhuma webfont é baixada: não há
requisição externa, nem flash de fonte trocando durante o carregamento. A
hierarquia vem de peso, tamanho e *tracking*: os títulos usam tracking
negativo, os rótulos pequenos usam positivo. Preços usam `tabular-nums` para
os dígitos alinharem entre cards.

---

## Editar preços sem fazer deploy (Firestore)

O site desenha a página com os valores de `lib/config.ts` e, logo depois,
tenta buscar o documento `config/site` no Firestore. Se o documento existir,
os valores dele substituem os locais. Se o Firestore estiver fora do ar, sem
credenciais ou com formato inválido, a página continua com os valores base.
**nunca fica em branco**.

### 1. Criar o projeto

1. Acesse <https://console.firebase.google.com> e clique em **Adicionar projeto**.
   Nome sugerido: `msju-site`. Pode desativar o Google Analytics.
2. Dentro do projeto, no menu lateral: **Criar** › **Firestore Database** ›
   **Criar banco de dados**.
3. Escolha o modo **produção** (as regras corretas entram no passo 3) e a
   região `southamerica-east1` (São Paulo).

### 2. Registrar o app web e pegar as credenciais

1. Engrenagem (⚙️) › **Configurações do projeto** › aba **Geral**.
2. Em **Seus apps**, clique no ícone `</>` (Web). Apelido: `landing`.
   Já existe um app web chamado `landing` neste projeto; use as credenciais dele.
3. O console mostra um bloco `firebaseConfig`. Copie os valores.
4. Na raiz do projeto, crie o arquivo `.env` (use `.env.example` como molde):

```bash
cp .env.example .env
```

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=msju-site.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=msju-site
VITE_FIREBASE_STORAGE_BUCKET=msju-site.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123
```

> Essas chaves são **públicas por natureza**: vão dentro do JavaScript que o
> navegador baixa. Quem protege os dados são as Security Rules, não o segredo
> da chave. Ainda assim o `.env` fica fora do git.

### 3. Aplicar as regras de segurança

No console: **Firestore Database** › aba **Regras**. Cole o conteúdo de
[`firestore.rules`](firestore.rules) e publique. Elas liberam **leitura
pública apenas** da coleção `config` e bloqueiam qualquer escrita pela web
(você continua editando pelo console, que roda como admin).

### 4. Criar o documento `config/site`

**Firestore Database** › **Iniciar coleção** › ID da coleção: `config` › ID do
documento: `site`. Adicione os campos:

| Campo | Tipo | Exemplo |
| --- | --- | --- |
| `kidsPlans` | array (de map) | ver abaixo |
| `adultPlans` | array (de map) | ver abaixo |
| `enrollmentFee` | string | `R$ 200,00` |
| `classDuration` | string | `1 hora e 10 minutos` |
| `location` | string | `Lagoa Santa/MG` |

Cada item de `kidsPlans` / `adultPlans` é um **map** com:

| Chave | Tipo | Obrigatório | Observação |
| --- | --- | --- | --- |
| `title` | string | sim | `2x por Semana` |
| `price` | string | sim | `R$ 960,00`, já formatado, com `R$` |
| `modality` | string | sim | `Presencial` ou `Online` |
| `messageKey` | string | sim | chave existente em `lib/whatsapp.ts` |
| `description` | string | não | linha extra no card |
| `featured` | boolean | não | destaca o card com o selo "Mais procurado" |

`messageKey` aceita: `kids_1x`, `kids_2x`, `kids_3x`, `kids_online_kit`,
`adults_online_1x`, `adults_online_2x`, `adults_online_3x`,
`adults_presencial_1x`, `masterclass`, `general`.

> **Trocar um preço:** abra `config/site`, edite o `price` do item, salve. A
> mudança vale no próximo carregamento da página: sem build, sem deploy.
>
> Se um plano estiver malformado (faltando `title`, por exemplo), o site
> descarta a lista inteira e usa a base. Isso é proposital: melhor mostrar
> preço antigo correto do que card quebrado.

### 5. Rebuild com as credenciais

O `.env` é lido **no build**. Depois de criá-lo:

```bash
npm run build
```

Sem `.env`, o site funciona igual: só não consulta o Firestore, e o SDK
(~660 kB) nem chega a ser baixado pelo visitante.

O `.env` já está configurado nesta máquina, apontando para o projeto
`msju-site`. Ele fica fora do git: se você clonar o repositório em outro
computador, precisa recriá-lo com os valores do console.

---

## Publicar

```bash
npm run deploy
```

Build e envio para o Firebase Hosting em um comando. O site sai no ar em
<https://msju-site.web.app>.

Para apontar `msjuliatamietti.com.br` para lá, siga
[`docs/migracao-dominio.md`](docs/migracao-dominio.md): o DNS ainda está
configurado para a loja Shopify antiga, e o documento lista exatamente quais
registros trocar (sem tocar no e-mail).

> ⚠️ A hospedagem na HostGator não existe mais. `.cpanel.yml` e `.htaccess`
> foram para [`docs/legado/`](docs/legado/) e não são usados.

---

## Analytics

Google Analytics 4 já implementado, **desligado até você criar a propriedade**.
Mede `page_view`, `contato_whatsapp` (com plano, preço e seção) e
`clique_instagram`. Passo a passo em [`docs/analytics.md`](docs/analytics.md).

---

## Segurança

Verificação completa em [`docs/seguranca.md`](docs/seguranca.md), com os testes
de escrita anônima e leitura de coleções fechadas que foram executados de fato.

Dois pontos para não esquecer:

- **`firebase init` sobrescreve o `firestore.rules`** com regras abertas.
  Confira o arquivo e rode `npm run deploy:rules` depois.
- **A API key é restrita por domínio.** Trocou de domínio? Adicione o novo na
  lista antes de publicar, senão os preços param de carregar do Firestore.

---

## Personalizações rápidas

- **Preços / cidade / taxa:** `lib/config.ts` (base) ou `config/site` no Firestore (remoto).
- **Textos das seções:** componente correspondente em `components/`.
- **Número e mensagens do WhatsApp:** `lib/whatsapp.ts`.
- **Cores, fontes, curvas de animação:** bloco `:root` em `index.css`.
- **Fotos:** `public/images/` + versão WebP em `public/images/webp/`,
  referenciadas em `lib/images.ts`.
