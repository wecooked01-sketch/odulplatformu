# odulplatformu

Initial repository setup.

This repository will host a Next.js 14 + Prisma + Auth.js (NextAuth) skeleton with points/lottery/wheel modules. The full scaffold (with a left collapsible sidebar, theme colors `#24292e` background, `#360028` accents, and white text) will arrive in the first PR.

## Next steps
- Keep this initial commit to establish the base branch.
- I will open a PR that adds:
  - Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui
  - Prisma (PostgreSQL) + NextAuth (email magic link, PrismaAdapter)
  - Core data models and API route stubs (points, wheel, lottery, rewards, contact, telegram verify)
  - Left collapsible sidebar layout and theme variables
  - Dockerfile, docker-compose.example.yml, CI workflow, .env.example, seed scripts, etc.

If you prefer a different default branch name than `main`, let me know before I open the PR.