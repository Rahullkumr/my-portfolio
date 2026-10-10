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
- **Blog** posts come from dev.to: the site lists the articles of the `devto` username in `profile.ts`, so publishing on DEV is all it takes. The list is cached on the server for 30 minutes, and the last good copy is shown if dev.to is down.

## Versions

The site keeps every design it has had. All versions show the same content; each one only decides how it looks. A dropdown in the header switches between them.

- The newest version is the live site at `/` and `/blog`.
- Every version is also kept at `/<id>` and `/<id>/blog`, for example `/v1/blog`. These copies are marked `noindex` so search engines only index the live site.

To add a version, for example v2:

1. Create `src/versions/v2/` with `home.tsx`, `blog.tsx`, its components and a `v2.css`.
2. Scope everything in `v2.css` under `[data-version='v2']` (see `v1/v1.css`) and import it in `src/styles.css`. To change colours, override the theme tokens there.
3. Add `v2` to the top of the list in `src/versions/meta.ts` and its pages in `src/versions/pages.ts`.
4. Put `<VersionSwitcher />` from `#/components/version-switcher` in the new design.

v2 then becomes the live site and v1 stays reachable at `/v1`.

## Project structure

```
src/
  data/profile.ts        all site content, shared by every version
  lib/devto.ts           fetches blog posts from dev.to (server function)
  components/            shared by every version: theme toggle, version switcher
  versions/
    meta.ts              list of versions, newest first
    pages.ts             each version's home and blog page
    v1/                  the v1 design: pages, components and v1.css
  routes/                / and /blog (live version), /$version and /$version/blog
  styles.css             theme tokens (light and dark) and base styles
public/                  photo, favicons
render.yaml              Render Blueprint
```

## Deploy

[`render.yaml`](render.yaml) is a Render Blueprint. In Render, choose **New > Blueprint**, connect this repo and deploy. Render sets `PORT`; the Nitro server reads it at runtime. No environment secrets are needed.
