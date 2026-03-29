# kaziUp — CV Builder

An AI-powered CV/resume builder built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Supabase.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with `tw-animate-css`
- **Components**: shadcn/ui, Radix UI, Framer Motion, Lucide React
- **PDF Generation**: `@react-pdf/renderer`
- **PDF Parsing**: `pdfjs-dist` (dynamically imported, browser-only)
- **Auth & DB**: Supabase (`@supabase/supabase-js`)
- **i18n**: Custom context-based (EN/FR), stored in `locales/`

## Project Structure

```
app/
  (auth)/login/       — Login page (client component)
  (auth)/register/    — Register page (client component)
  (user)/dashboard/   — Dashboard page
  (user)/dashboard/builder/ — CV builder page (server wrapper → BuilderClient)
  layout.tsx          — Root layout with LanguageProvider + Toaster
  page.tsx            — Landing page

components/
  BuilderClient.tsx   — Full client-side CV builder UI
  DashboardLayout.tsx — Sidebar layout for dashboard pages
  ResumeForm.tsx      — CV form editor
  PreviewContainer.tsx — Live scaled A4 preview with pagination
  ResumePreview.tsx   — Template renderer
  DownloadButton.tsx  — PDF export button (uses @react-pdf/renderer)
  CVImportModal.tsx   — Import existing CV (PDF/DOCX/image)
  templates/          — Visual HTML templates (live preview)
  pdf-templates/      — PDF-only templates (@react-pdf/renderer)
  landing/            — Landing page sections
  ui/                 — shadcn/ui primitives

integrations/supabase/
  client.ts           — Supabase client (browser-safe, graceful fallback)
  types.ts            — Generated database types

utils/
  resumeTypes.ts      — ResumeData types + defaultResumeData
  storage.ts          — localStorage helpers (SSR-safe with isBrowser guard)
  fileExtraction.ts   — PDF/image text extraction (pdfjs dynamically imported)

contexts/
  LanguageContext.tsx — Language switcher context (EN/FR)

locales/
  en.json / fr.json   — Translation strings
```

## Environment Variables

Required in `.env.local` for Supabase auth/features to work:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Without these, the app still runs but Supabase auth and CV import (AI parsing) will be non-functional.

## Running

```bash
npm run dev    # Development on port 5000 (Replit compatible)
npm run build  # Production build
npm run start  # Production server on port 5000
```

## Key Architecture Decisions

### SSR / Client Separation
- All interactive components have `"use client"` directive
- `pdfjs-dist` is dynamically imported inside async functions (never at module level) to prevent `DOMMatrix is not defined` SSR crashes
- `@react-pdf/renderer` and `pdfjs-dist` are in `serverExternalPackages` so they are never bundled by the server renderer

### Supabase Client
- Initialized with `||` fallback URLs so the app doesn't crash during SSR when env vars are missing
- `storage` uses `window.localStorage` only on the client side via `typeof window !== 'undefined'` guard

### next.config.ts
- `serverExternalPackages`: excludes browser-only PDF packages from SSR bundle
- `allowedDevOrigins`: configured for Replit's proxied preview domains
- `turbopack: {}`: explicitly opts into Turbopack (Next.js 16 default), silences config warnings
