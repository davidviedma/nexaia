# Nexa IA — web

Landing de **Nexa IA**, digitalización e IA para pymes. Next.js 16 (App Router), Tailwind CSS 4, shadcn/ui, HugeIcons.

## Arrancar

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # build de producción
pnpm lint       # ESLint
pnpm typecheck  # TypeScript
```

## Dónde está cada cosa

- `lib/site.ts` — nombre, email, WhatsApp, redes y dominio. **Rellena los TODO antes de publicar.**
- `lib/content.ts` — todos los textos de la web, sección por sección.
- `app/globals.css` — paleta de marca (`@theme`), animaciones y utilidades.
- `components/Sections/*` — una sección por archivo, compuestas en `app/page.tsx`.
- `components/nav.tsx` — navegación flotante tipo "isla".
- `public/` — logo (`logo-icon.png`, `logo-wordmark.webp`) y `og-image.jpg`.
