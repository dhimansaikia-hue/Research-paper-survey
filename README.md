# Ananta Landwise Parcel Tracker (Vite + React)

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill Supabase values.
3. Run SQL in `supabase/schema.sql` then `supabase/seed.sql`.
4. `npm run dev`

## Notes
- Requires Supabase bucket named `parcel-assets`.
- Auth is email/password (admin-created users only).
