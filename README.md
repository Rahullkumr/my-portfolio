# Rahul Kumar — Portfolio

My personal site: who I am, where I work, what I've built and the tools I use.

I'm a full-stack engineer at Oplandtech, building an ERP platform with TypeScript, React, Fastify, MySQL and AWS Lambda.

## Featured project

**[Padh Ke Batao](https://github.com/Rahullkumr/padh-ke-batao)** — 🏆 Winner, *Best Use of ElevenLabs*, DEV Hacktoberfest 2026 "Build for a Friend"

Photograph a bank notice, hospital report or government letter and get a plain-language explanation in Hindi or English, read aloud. Built for my grandfather. A local vision model (Qwen 3.5 on Ollama) reads the photo on a CPU-only laptop, so the document never leaves the machine; only the explanation text goes to ElevenLabs for the voice.

[GitHub](https://github.com/Rahullkumr/padh-ke-batao) · [Demo video](https://youtu.be/VO9MM8JvKCQ) · [Write-up on DEV](https://dev.to/rahullkumr/padh-ke-batao-an-ai-that-reads-my-grandfathers-documents-to-him-on-a-laptop-with-no-gpu-3818)

## Built with

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR through Nitro)
- [Tailwind CSS 4](https://tailwindcss.com/) and [lucide-react](https://lucide.dev/) icons
- [Vite](https://vite.dev/), [Biome](https://biomejs.dev/) for linting and formatting
- [Bun](https://bun.sh/) as package manager and runtime
- Deployed on [Render](https://render.com/)

## Run locally

```bash
bun install
bun --bun run dev      # http://localhost:3000
```

Build and run the production server:

```bash
bun --bun run build
bun --bun run start
```

Lint and format:

```bash
bun --bun run check    # lint + format check
bun --bun run format
```

## Editing the content

All text on the site lives in [`src/data/profile.ts`](src/data/profile.ts): profile, about, experience, projects and stack. Edit that file; the components read from it.

- **Projects** take an optional `award` (shown with a trophy under the title) and `links` (GitHub, YouTube or a plain link, shown along the bottom of the card).
- Search the file for `TODO` to find details still to fill in.
- The profile photo is [`public/rahullkumr.webp`](public/rahullkumr.webp).

## Project structure

```
src/
  data/profile.ts        all site content
  components/            hero, sections (about, experience, work, stack), contact, header, theme toggle
  routes/                index page and root layout
  styles.css             theme tokens (light and dark) and shared styles
public/                  photo, favicons
render.yaml              Render Blueprint
```

## Deploy

[`render.yaml`](render.yaml) is a Render Blueprint. In Render, choose **New > Blueprint**, connect this repo and deploy. Render sets `PORT`; the Nitro server reads it at runtime. No environment secrets are needed.
