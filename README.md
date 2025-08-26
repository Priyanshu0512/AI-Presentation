# 🚀 AI-Presentation — AI-Powered Slide Builder

&nbsp; &nbsp;

## 🎯 Overview

**AI-Presentation** is a modern, full-stack slide-creation app built on **Next.js (App Router)**. It turns prompts and outlines into structured presentations with a themeable, responsive editor—ideal for pitching, teaching, or shipping decks without death-by-PowerPoint.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-components-000?style=for-the-badge)](https://ui.shadcn.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Bun](https://img.shields.io/badge/Bun-lockfile-000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

---

---

## 🎉 Demo Showcase

Add screenshots to `/public` and reference them here:

<img width="1600" alt="Editor Screenshot" src="/public/screens/editor.png" />

---

## ✨ Key Features

- ⚡ **Prompt → Slides** — Generate titles, sections, and bullets from a single prompt.
- 🎨 **Themeable & Clean UI** — Tailwind + shadcn/ui components for consistent, modern styling.
- 📝 **Rich Editing** — Tweak slide content after generation.
- 🧠 **Pluggable AI Providers** — Works with OpenAI or Gemini (configure via `.env`).
- 💾 **Persistent Storage** — Prisma models for saving decks, slides, and themes.
- 🌗 **Dark/Light Themes** — Easy on the eyes at 2 a.m. and during boardroom demos.
- 📤 **Export-ready** — Ship as PDF/HTML; PPTX export optional (provider/adapter).
- 🔐 **Auth-ready** — Optional auth layer (Clerk/NextAuth) can be added without rewiring core.

---

## 🚀 Tech Stack

**Frontend**

- Framework: **Next.js (App Router)**
- Language: **TypeScript**
- Styling: **Tailwind CSS** + **shadcn/ui**

**Backend**

- Runtime: **Next.js Route Handlers**
- ORM: **Prisma** (SQLite by default; Postgres/MySQL supported)
- Providers: **OpenAI** or **Google Gemini** (opt-in via env)

**Tooling**

- Package Manager: **npm**/**bun**
- Linting/Types: **ESLint**, **TypeScript**
- Deploy: **Vercel**

---

## 📁 Project Structure

```bash
ai-presentation/
├── prisma/                  # Prisma schema & migrations
├── public/                  # Static assets (screenshots, logos, favicons)
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (editor)/        # Editor / Deck views
│   │   ├── api/             # Route handlers (e.g., /api/generate, /api/export)
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/          # Reusable UI (shadcn/ui wrappers, editor UI)
│   ├── lib/                 # Provider clients, utils (e.g., openai.ts)
│   └── config/              # App config (theming, constants)
├── components.json          # shadcn/ui setup
├── tailwind.config.ts       # Tailwind config
├── tsconfig.json            # TS config
└── next.config.ts           # Next.js config
```

---

## 🛠 Getting Started

**Prerequisites**

- Node.js 18+ (or Bun)
- A database (SQLite by default)
- One AI provider key:
  - `OPENAI_API_KEY` **or**
  - `GOOGLE_GENERATIVE_AI_API_KEY`

### Quick Installation

```bash
git clone https://github.com/Priyanshu0512/AI-Presentation.git
cd AI-Presentation

# Install dependencies
npm install    # or: bun install

# Set up environment
cp .env.example .env    # create and fill values
```

### .env example

```bash
# Database
DATABASE_URL="file:./dev.db"   # SQLite default; swap for Postgres/MySQL as needed

# Choose one provider (or wire both)
OPENAI_API_KEY="sk-..."
# or
GOOGLE_GENERATIVE_AI_API_KEY="..."

# Optional
NEXT_PUBLIC_APP_NAME="AI Presentation"
```

### Prisma & DB

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Run Dev Server

```bash
npm run dev
# or
bun dev
```

Open http://localhost:3000 to view the app.

---

## 📦 Deployment

**Vercel (recommended)**

```bash
vercel
# Add env vars in Vercel dashboard
vercel --prod
```

**Notes**

- Ensure `DATABASE_URL` is production-grade (e.g., Postgres on Neon/Supabase/RDS).
- Run migrations on deploy: `prisma migrate deploy`.

---

## 📚 API (Core Endpoints)

> Names/paths follow standard Next.js Route Handler conventions. Adjust if you’ve customized.

- `POST /api/generate`

  - Body: `{ prompt: string, slides?: number, tone?: string, theme?: string }`
  - Returns: `{ deckId, slides: Slide[] }`

- `POST /api/export`

  - Body: `{ deckId: string, format: "pdf" | "html" }`
  - Returns: `ArrayBuffer` (file stream)

- `GET /api/decks/:id`
  - Returns a saved deck with slides & metadata

---

## 🧪 Testing & Quality

```bash
npm run type-check
npm run lint
npm run build
```

---

## 🗺️ Roadmap

- [ ] PPTX export adapter
- [ ] Collaborative editing (CRDT)
- [ ] Image generation on-slide (provider plugin)
- [ ] Shareable public deck URLs with analytics

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/awesome-thing`)
3. Commit (`git commit -m "feat: add awesome thing"`)
4. Push (`git push origin feat/awesome-thing`)
5. Open a PR

---

## ❤️ Author

Crafted with care by [**Priyanshu**](https://github.com/Priyanshu0512).  
If this saves you hours of slide-polishing, **star the repo**—that’s the currency of open source.
