# Rahul Kumar — Portfolio

Personal site built with TanStack Start, Tailwind CSS 4 and Bun. Deployed on Render.

## Run

```bash
bun install
bun --bun run dev      # http://localhost:3000
bun --bun run build
bun --bun run start
bun --bun run check    # lint + format
```

## Content

All site text lives in [`src/data/profile.ts`](src/data/profile.ts). Blog posts are pulled from dev.to.

## Versions

Each design lives in `src/versions/<id>/`. The newest is served at `/`; older ones stay at `/<id>`. Register new versions in `src/versions/meta.ts` and `src/versions/pages.ts`.

## Deploy

[`render.yaml`](render.yaml) is a Render Blueprint: **New > Blueprint**, connect repo, deploy. No secrets needed.

---

Happy coding!
