<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Ms. Ju Classes – Landing Page

Landing page para apresentar as aulas de inglês da Teacher Júlia Tamietti, com foco em atrair novos alunos infantis e adultos. O site destaca metodologia, planos, galeria de fotos e um CTA direto para o WhatsApp.

---

## ✨ Destaques do projeto
- **Hero cativante** com chamada para agendar conversa via WhatsApp.
- **Seção “Sobre”** explicando a metodologia personalizada.
- **Planos infantis e adultos** exibidos em componentes separados.
- **Informações práticas** sobre local, calendário, pagamento e matrícula.
- **Galeria expandida** com imagens em alta resolução hospedadas localmente.

## 🛠️ Stack
- React 19 + Vite
- TypeScript
- CSS modularizado (arquivo `index.css`)
- Deploy estático (apenas HTML, CSS e JS)

---

## 🚀 Executar localmente

Pré-requisito: Node.js 18+ instalado.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` (ou a porta exibida no terminal) para visualizar a página.

## 📦 Gerar build de produção

```bash
npm run build
```

Os arquivos otimizados são gerados em `dist/`.

---

## 🌐 Publicar na HostGator (cPanel)
1. Rode `npm run build` no seu computador.
2. Compacte o **conteúdo interno** da pasta `dist/` (ex.: `index.html` e a pasta `assets/`) em um `.zip`.
3. No cPanel, abra **Gerenciador de Arquivos > public_html**.
4. Apague `default.html`, envie o `.zip` e use **Extrair** para soltar os arquivos ali mesmo.
5. Verifique se `public_html` contém `index.html` e a pasta `assets/`. Depois disso o site já estará no ar.

Sempre que fizer alterações, gere um novo build e substitua os arquivos em `public_html`.

---

## 🔧 Personalizações rápidas
- Conteúdo textual: componentes em `components/` (ex.: `Hero.tsx`, `About.tsx`, `Pricing.tsx`).
- Imagens: pasta `public/images/` (referenciadas via `lib/images.ts`).
- Estilos globais: `index.css`.
- Links para WhatsApp: `lib/whatsapp.ts`.

---
