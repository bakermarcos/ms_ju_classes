# Legado: configuração da HostGator

Arquivos usados quando o site era servido por hospedagem compartilhada na
HostGator via cPanel. Guardados só para consulta.

- `cpanel.yml` (era `.cpanel.yml` na raiz): deploy por Git™ Version Control do cPanel. Rodava
  `rsync --delete` de `dist/` para `public_html`.
- `htaccess` (era `.htaccess` na raiz): regras do Apache para fallback de SPA, tipos MIME e cache.

**Nada disso é usado hoje.** O site está no Firebase Hosting; o equivalente
dessas regras vive em `firebase.json` (rewrites, headers, cache). Ver
[`../migracao-dominio.md`](../migracao-dominio.md).
