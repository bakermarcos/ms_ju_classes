# Apontar msjuliatamietti.com.br para o site novo

Levantamento feito em **06/09/2026** consultando DNS, WHOIS e a API do Firebase
Hosting ao vivo. Refaça os comandos de diagnóstico antes de executar.

**O site já está publicado e funcionando em <https://msju-site.web.app>.**
Falta apenas apontar o domínio próprio para ele.

---

## 1. Como as coisas estão hoje

### O domínio aponta para a Shopify, e a loja está fora do ar

```
NS   dns3.hostgator.com.br / dns4.hostgator.com.br   ← a zona DNS é gerida na HostGator
A    23.227.38.65                                    ← IP da Shopify
www  CNAME shops.myshopify.com                       ← Shopify
MX   mx1.titan.email / mx2.titan.email               ← e-mail no Titan
TXT  v=spf1 include:spf.titan.email ~all             ← SPF do Titan
CAA  (nenhum)                                        ← nada bloqueia emissão de certificado
```

O que aponta para a Shopify são os registros `A` e `CNAME` **dentro** da zona da
HostGator, não os nameservers. Dá para migrar mexendo em dois registros, sem
tocar no Registro.br.

`https://msjuliatamietti.com.br` responde **HTTP 402** com o título "Loja
indisponível", que é o código da Shopify para assinatura suspensa ou não paga.
Apontar o domínio para o site novo **não derruba nada que esteja funcionando**.

### Não há mais hospedagem na HostGator

O painel responde *"Nenhum plano de hospedagem com espaço foi encontrado"*. Por
isso o site foi para o **Firebase Hosting** (mesmo projeto do Firestore, plano
gratuito, HTTPS automático e renovado sozinho).

Consequência: `.cpanel.yml` e `.htaccess` saíram da raiz e foram arquivados em
[`legado/`](legado/). O deploy agora é `npm run deploy`.

### msjuliatamietti.online está suspenso

```
A     127.0.0.1
SOA   ns1.verification-hold.suspended-domain.com
NS    dns19/dns20.parkpage.foundationapi.com
Registrar        PDR Ltd. (PublicDomainRegistry)
Registry Expiry  2027-09-02
```

Não expirou: está em *verification hold*. O registrador suspendeu porque a
verificação de e-mail do titular exigida pela ICANN não foi concluída. Por isso
responde `127.0.0.1` e recusa conexão na porta 80.

Para reativar, procure o e-mail de "ICANN verification" do PublicDomainRegistry
na caixa do titular e conclua a verificação. Isso é independente da migração e
pode ficar para depois.

---

## 2. O que mudar no DNS

Os valores abaixo vieram da API do Firebase Hosting, que já reconheceu os dois
domínios e listou exatamente o que falta.

### Painel HostGator › Domínios › msjuliatamietti.com.br › Zona de DNS

| Ação | Tipo | Nome | Valor |
| --- | --- | --- | --- |
| 🗑️ **remover** | `A` | `@` | `23.227.38.65` *(Shopify)* |
| ➕ **adicionar** | `A` | `@` | `199.36.158.100` |
| ➕ **adicionar** | `TXT` | `@` | `hosting-site=msju-site` |
| ➕ **adicionar** | `TXT` | `_acme-challenge` | *o valor mostrado no console, em "Configurar certificado SSL"* |
| 🗑️ **remover** | `CNAME` | `www` | `shops.myshopify.com` |
| ➕ **adicionar** | `CNAME` | `www` | `msju-site.web.app` |

> ⚠️ **Não mexa nos registros `MX` nem no `TXT` que começa com `v=spf1`.** Eles
> respondem pelo e-mail do domínio (Titan). Alterar ou apagar derruba o
> recebimento de e-mails, e não tem nenhuma relação com o site.
>
> Os dois `TXT` no `@` convivem sem problema: um é o SPF, o outro é a prova de
> propriedade do Firebase. É normal ter vários TXT no mesmo nome.

TTL: se houver o campo, use `300` (5 min) durante a migração e volte para `3600`
depois que estabilizar.

---

## 3. HTTPS

Aqui o Firebase é bem diferente do cPanel: **não existe AutoSSL para rodar, nem
regra de redirecionamento para escrever no `.htaccess`.** Tudo é automático.

| O que | Como funciona |
| --- | --- |
| Emissão do certificado | O Firebase pede um certificado à Google Trust Services assim que o DNS aponta para ele. Sem botão. |
| Renovação | Automática, para sempre. Não há data para lembrar. |
| Redirecionamento HTTP → HTTPS | Já vem ligado. `http://` responde `301` para `https://`. |
| HSTS | `Strict-Transport-Security: max-age=31556926; includeSubDomains; preload`. |
| `www` → domínio raiz | Configurado: `www.msjuliatamietti.com.br` responde `301` para `https://msjuliatamietti.com.br`. Evita conteúdo duplicado no Google. |

Estado atual dos dois domínios: `CERT_VALIDATING`. O Firebase **já começou** a
tentar emitir o certificado e está travado em duas coisas, as duas resolvidas
pela tabela da seção 2:

- `ownershipState: OWNERSHIP_MISSING` — falta o `TXT hosting-site=msju-site`.
- `hostState: HOST_MISMATCH` — o `A` ainda aponta para a Shopify.

O console pede um `TXT` em `_acme-challenge.msjuliatamietti.com.br` como prova
para emitir o certificado. Esse valor é gerado por domínio e **muda se você
remover e recadastrar o domínio** — por isso não remova o domínio no console
para "recomeçar": use o botão **Verificar**, que revalida sem gerar desafio novo.

Publicados esses registros, clique em **Verificar** no console. O Firebase não
revalida em tempo real por conta própria; o botão força o ciclo. Enquanto não sai, o domínio mostra aviso de segurança no
navegador. É esperado e passa sozinho.

O domínio do Firebase (`msju-site.web.app`) já está com HTTPS válido hoje:
certificado da Google Trust Services e redirecionamento de HTTP ativo.
Verificado.

---

## 4. Ordem de execução

1. **Aplicar os registros da tabela acima.**
2. **Esperar a propagação.** Confira com a seção 5. Costuma levar de minutos a
   algumas horas.
3. **O Firebase faz o resto sozinho:** valida a propriedade pelo `TXT`, emite o
   certificado e liga o redirecionamento. No console (Hosting › Domínios
   personalizados) o estado sai de `Ownership missing` / `Host mismatch` para
   `Connected`. Ver seção 3.

Nada precisa ser reconstruído ou republicado. O conteúdo já está no ar.

---

## 5. Verificar

```bash
# 1. O A saiu da Shopify e virou o do Firebase?
dig +short A msjuliatamietti.com.br          # esperado: 199.36.158.100

# 2. O TXT de propriedade está publicado? (junto com o SPF)
dig +short TXT msjuliatamietti.com.br        # esperado: hosting-site=msju-site + v=spf1...

# 3. O www aponta para o Hosting?
dig +short CNAME www.msjuliatamietti.com.br  # esperado: msju-site.web.app

# 4. O e-mail continua intacto?
dig +short MX msjuliatamietti.com.br         # esperado: mx1/mx2.titan.email

# 5. O HTTP redireciona para HTTPS?
curl -sI http://msjuliatamietti.com.br | grep -iE "^HTTP|^location"

# 6. O site responde e é o novo?
curl -sI https://msjuliatamietti.com.br | head -1
curl -s https://msjuliatamietti.com.br | grep -o "<title>[^<]*"

# 7. O certificado foi emitido? (emissor deve ser Google Trust Services)
echo | openssl s_client -connect msjuliatamietti.com.br:443 \
  -servername msjuliatamietti.com.br 2>/dev/null \
  | openssl x509 -noout -issuer -dates

# 8. O www redireciona para o domínio raiz?
curl -sI https://www.msjuliatamietti.com.br | grep -iE "^HTTP|^location"
```

Esperado no item 6: `HTTP/2 200` e
`<title>Ms. Ju — Aulas de Inglês e Pedagogia Bilíngue | Júlia Tamietti`.

Se ainda aparecer "Loja indisponível", o DNS não propagou. Se aparecer erro de
certificado, o DNS propagou mas o TLS ainda está sendo emitido: aguarde.

Estado do domínio no Firebase, por linha de comando:

```bash
npx firebase-tools hosting:sites:list --project msju-site
```

---

## 6. Depois que estiver no ar

- **API key do Firebase:** já está restrita e `msjuliatamietti.com.br` está na
  lista de domínios permitidos. Nenhuma ação. Ver [`seguranca.md`](seguranca.md).
- **Search Console:** cadastre `https://msjuliatamietti.com.br/`.
- **Instagram:** troque o link da bio.
- **Shopify:** se a loja não for reativada, cancele a assinatura para não gerar
  cobrança. **Antes disso, exporte pedidos e lista de clientes**: encerrada a
  conta, o acesso a esses dados se perde.
- **HostGator:** o domínio continua registrado lá e a zona DNS também. Só a
  hospedagem deixou de ser usada. Não cancele o domínio nem o e-mail Titan.
- **Compartilhamento:** mande o link no WhatsApp e confirme a prévia com a logo.

---

## 7. Publicar mudanças daqui pra frente

```bash
npm run deploy
```

Isso roda o build e envia para o Firebase Hosting. Para publicar só as regras do
Firestore:

```bash
npm run deploy:rules
```

---

## 8. Se precisar voltar para a Shopify

Reponha na zona DNS:

```
A     @    23.227.38.65
CNAME www  shops.myshopify.com
```

e remova o `TXT hosting-site=msju-site`. A propagação leva o mesmo tempo da ida.
Só faz sentido se a assinatura da Shopify for reativada. Hoje o domínio
responderia `402` de novo.
