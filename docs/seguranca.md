# Verificação de segurança

Testes executados em **06/09/2026** contra o projeto `msju-site` em produção.
Não são leitura de configuração: são tentativas reais de ler e gravar dados.

**Resultado: nenhum caminho para roubar ou sobrescrever dados.** Um problema foi
encontrado e corrigido durante a verificação (API key sem restrição de domínio).

---

## 1. O modelo de risco

O site é estático e anônimo. Não tem login, não tem formulário, não tem
servidor próprio. A única superfície é o Firestore, que guarda um documento com
preços e é lido pelo navegador do visitante.

As duas perguntas que importam:

1. Alguém consegue **sobrescrever os preços**?
2. Alguém consegue **ler dados que não deveria**?

---

## 2. O que protege (e o que não protege)

A chave `VITE_FIREBASE_API_KEY` vai dentro do JavaScript que o navegador baixa.
**Qualquer visitante consegue lê-la.** Isso não é um vazamento: chaves de app web
do Firebase são identificadores públicos de projeto, não senhas.

Quem decide o que pode ser lido e gravado são as **Security Rules**. Elas rodam
no servidor do Google e não dependem do cliente se comportar bem.

Por isso a verificação abaixo ataca as regras, não a chave.

---

## 3. Regras publicadas

[`firestore.rules`](../firestore.rules):

```
match /config/{document} {
  allow read: if true;    // a landing page precisa ler os preços
  allow write: if false;  // ninguém grava pela web
}

match /{document=**} {
  allow read, write: if false;  // todo o resto, fechado
}
```

Escrita acontece só pelo Console do Firebase e pela CLI, que usam credenciais de
administrador e não passam por estas regras.

---

## 4. Testes executados

### 4.1. Tentativa de sobrescrever os preços

Requisição `PATCH` anônima, com a chave pública extraída do próprio bundle:

| Alvo | Resultado |
| --- | --- |
| `config/site` | `HTTP 403 PERMISSION_DENIED` |
| `config/outro` | `HTTP 403 PERMISSION_DENIED` |
| `leads/x` | `HTTP 403 PERMISSION_DENIED` |

Repetido a partir da origem real de produção (`https://msju-site.web.app`),
via `fetch` no console do navegador: `403 PERMISSION_DENIED`.

### 4.2. Leitura de coleções que não deveriam ser públicas

| Alvo | Esperado | Resultado |
| --- | --- | --- |
| `config/site` | permitir | **permitido** (correto: é o que a página lê) |
| `leads` | negar | `Missing or insufficient permissions` |
| `alunos` | negar | `Missing or insufficient permissions` |

A mensagem `Missing or insufficient permissions` é a das Security Rules, não do
IAM. Confirma que as regras são de fato o portão, e não uma camada acima.

### 4.3. Criação de contas

```
POST identitytoolkit.googleapis.com/v1/accounts:signUp
→ HTTP 400 CONFIGURATION_NOT_FOUND
```

O Firebase Authentication não está habilitado. Ninguém cria conta no projeto.

### 4.4. Storage

```
GET firebasestorage.googleapis.com/v0/b/msju-site.firebasestorage.app/o
→ HTTP 404
```

Nenhum bucket provisionado. Não há arquivos para vazar.

### 4.5. Segredos no código publicado

- `.env` **nunca** foi commitado (`git log --diff-filter=A` limpo) e está no
  `.gitignore`.
- Nenhuma chave de conta de serviço no repositório.
- No bundle de produção, a única credencial é a API key pública, o esperado.
- As ocorrências de `password` no bundle são a lista interna de tipos de
  `<input>` do React, não segredo.

---

## 5. Problema encontrado e corrigido

### API key sem restrição de domínio

**Antes:** `browserKeyRestrictions: {}`. Qualquer site do mundo podia copiar a
chave do bundle e usá-la contra o projeto.

Isso **não** permitia roubar ou gravar dados: as regras continuavam bloqueando.
O risco real era **consumo de cota**: alguém apontando tráfego para o projeto e
estourando o limite gratuito, derrubando a leitura de preços do site.

**Depois:** a chave só funciona com requisições originadas destes domínios:

```
msjuliatamietti.com.br/*
*.msjuliatamietti.com.br/*
msju-site.web.app/*
msju-site.firebaseapp.com/*
localhost/*
localhost:*/*
```

> ⚠️ Se um dia o site mudar de domínio, **inclua o novo domínio nesta lista
> antes de publicar**, senão a leitura de preços para de funcionar e o site cai
> silenciosamente nos valores base de `lib/config.ts`. Console do Google Cloud ›
> APIs e Serviços › Credenciais › *Browser key (auto created by Firebase)*.

---

## 6. Cabeçalhos de segurança do site

Configurados em [`firebase.json`](../firebase.json) e verificados na resposta
real de `https://msju-site.web.app`:

| Cabeçalho | Valor | Para quê |
| --- | --- | --- |
| `Content-Security-Policy` | `default-src 'self'` + lista restrita | Bloqueia script de terceiros injetado. `connect-src` só permite o Firestore. |
| `Strict-Transport-Security` | `max-age=31556926; includeSubDomains; preload` | Força HTTPS no navegador. |
| `X-Content-Type-Options` | `nosniff` | Impede o navegador de adivinhar tipo de arquivo. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Não vaza a URL completa para terceiros. |
| `Permissions-Policy` | câmera, microfone, GPS, pagamento e USB desligados | A página não precisa de nada disso. |
| `frame-ancestors 'none'` | (dentro da CSP) | Impede que o site seja embutido em iframe de outro domínio (clickjacking). |

O site carrega apenas recursos próprios: sem CDN, sem webfont externa, sem
Font Awesome, sem tag de analytics. É o que permite uma CSP tão fechada.

> ⚠️ Se um dia você adicionar Google Analytics, Meta Pixel, ou qualquer script de
> terceiro, **a CSP vai bloqueá-lo** e ele simplesmente não vai rodar. É preciso
> liberar o domínio dele em `script-src` e `connect-src` no `firebase.json`.

---

## 7. Riscos que permanecem (e por que são aceitáveis)

| Risco | Avaliação |
| --- | --- |
| A API key é visível no bundle | Por design. As regras é que protegem. |
| Qualquer um lê `config/site` | Intencional: são os preços, que já estão na página. |
| Quem tem acesso ao Console pode alterar preços | É o objetivo do sistema. Proteja a conta Google com 2FA. |
| A conta do Firebase é o ponto único de falha | Ative a verificação em duas etapas em `bakermarcos52@gmail.com`. |

---

## 8. Se você mexer no Firebase depois

> ⚠️ **`firebase init` sobrescreve o `firestore.rules`** com as regras abertas de
> teste (`allow read, write: if true`, válidas por 30 dias). Isso aconteceu
> durante esta configuração e foi revertido antes de qualquer dado ser gravado.
>
> Depois de rodar `firebase init`, sempre confira o arquivo e republique:
>
> ```bash
> cat firestore.rules          # tem que ter "allow write: if false"
> npm run deploy:rules
> ```

Para repetir esta verificação a qualquer momento:

```bash
KEY=$(grep VITE_FIREBASE_API_KEY .env | cut -d= -f2)
B="https://firestore.googleapis.com/v1/projects/msju-site/databases/(default)/documents"

# leitura pública dos preços: deve funcionar
curl -s "$B/config/site?key=$KEY" | head -c 120

# escrita anônima: deve dar PERMISSION_DENIED
curl -s -X PATCH "$B/config/site?key=$KEY" \
  -H "Content-Type: application/json" \
  -d '{"fields":{"enrollmentFee":{"stringValue":"teste"}}}'

# coleção fechada: deve dar Missing or insufficient permissions
curl -s "$B/leads?key=$KEY"
```
