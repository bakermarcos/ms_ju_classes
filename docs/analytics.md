# Analytics

Google Analytics 4 via Firebase. O código está pronto e no ar. **Falta um passo
manual:** criar a propriedade GA4 e colar o ID no `.env`.

Enquanto o ID não existir, o site não baixa o SDK de analytics nem envia evento
nenhum. Não há meio-termo quebrado.

---

## 1. Ligar o Analytics (3 cliques)

Console do Firebase › engrenagem › **Configurações do projeto** › aba
**Integrações** › **Google Analytics** › **Ativar**.

```bash
open "https://console.firebase.google.com/project/msju-site/settings/integrations?authuser=bakermarcos52@gmail.com"
```

Ele cria (ou reaproveita) uma propriedade GA4 e vincula ao projeto. Não precisa
configurar nada dentro do GA.

## 2. Pegar o ID e colar no `.env`

Configurações do projeto › **Geral** › em **Seus apps**, o app `landing` passa a
mostrar um campo `measurementId`, no formato `G-XXXXXXXXXX`.

```
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 3. Publicar

```bash
npm run deploy
```

O `.env` é lido **no build**, então sem republicar o ID não chega ao site.

## 4. Conferir

Abra o site e, no GA4, vá em **Relatórios › Tempo real**. Sua visita aparece em
segundos. Clique num botão "Quero esse" e o evento `contato_whatsapp` deve
surgir na lista de eventos.

---

## O que é medido

Pageview sozinho diz pouco num site de uma página só. A pergunta que interessa é
**qual plano faz a pessoa chamar no WhatsApp**, então os eventos carregam essa
informação.

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `page_view` | ao carregar | `page_title`, `page_location` |
| `contato_whatsapp` | clique em qualquer link `wa.me` | `secao`, `rotulo`, `plano`, `preco`, `modalidade` |
| `clique_instagram` | clique em link do Instagram | `secao`, `rotulo` |

`secao` é o id da seção de origem: `top`, `planos`, `online-kit`, `masterclass`,
`informacoes`, `galeria` ou `rodape`. Nos cards de preço, `plano`, `preco` e
`modalidade` vêm do próprio card; fora deles ficam como `nenhum`.

Assim dá para responder, no GA4: *o botão do hero converte mais que os cards? O
plano de R$ 880 com kit é clicado mais que o presencial? A seção de master class
gera contato de escola?*

### Como está implementado

[`lib/analytics.ts`](../lib/analytics.ts) carrega o SDK por import dinâmico,
depois do evento `load`, e só se houver `measurementId`. O chunk é separado
(~35 kB) e não entra no bundle principal.

[`lib/useCtaTracking.ts`](../lib/useCtaTracking.ts) usa **um único listener
delegado** no `document` em vez de `onClick` espalhado pelos componentes. Um CTA
novo passa a ser medido sem editar componente nenhum.

Eventos disparados antes do SDK terminar de carregar entram numa fila (máx. 20)
e são enviados quando ele fica pronto, então o `page_view` não se perde.

---

## Content Security Policy

A CSP do site é fechada. Sem liberar os domínios do Google, o Analytics seria
**bloqueado em silêncio**. Já foi ajustada em [`firebase.json`](../firebase.json):

```
script-src  ... https://www.googletagmanager.com
img-src     ... https://www.google-analytics.com https://www.googletagmanager.com
connect-src ... https://www.google-analytics.com https://*.google-analytics.com
                https://*.analytics.google.com https://www.googletagmanager.com
```

> ⚠️ O mesmo vale para qualquer script de terceiro que você adicionar depois
> (Meta Pixel, Hotjar, chat). Sem liberar na CSP, ele não roda e o navegador só
> avisa no console. Ver [`seguranca.md`](seguranca.md).

---

## Privacidade

O código respeita **Do Not Track**: se o navegador manda esse sinal, nada é
carregado nem enviado.

> ⚠️ **LGPD.** O GA4 usa cookies e processa dados pessoais (IP, identificador de
> dispositivo). Este é um site voltado a pais de crianças, o que aumenta a
> sensibilidade. O padrão brasileiro hoje é ter, no mínimo:
>
> - um aviso de cookies com opção real de recusar, e
> - uma página de política de privacidade dizendo o que é coletado e por quê.
>
> Nada disso existe no site ainda. Como o Analytics só liga quando você criar o
> `measurementId`, dá para decidir isso antes de ativar. Se quiser, o código já
> está estruturado para carregar o SDK só depois de um "aceito": basta chamar
> `initAnalytics()` no clique do banner em vez de no `load`.

---

## Desligar

Remova a linha `VITE_FIREBASE_MEASUREMENT_ID` do `.env` e rode `npm run deploy`.
O SDK deixa de ser baixado. Não é preciso mexer no código.
