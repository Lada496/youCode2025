# Summit Circle

**Summit Circle** helps people discover local activities, connect with others who share their interests, and organize community events on an interactive map.

🏆 **Winner of YouCode 2025**

## What it does

- Displays community events on an interactive Google Map
- Supports account creation, authentication, and user profiles
- Lets organizers create events with locations and categories
- Records event attendance without allowing duplicate check-ins
- Matches people with interest categories
- Sends category-based event notification emails

## Technology

- Next.js 15 and React 19
- TypeScript
- Supabase Authentication and PostgreSQL
- Google Maps
- Chakra UI
- Nodemailer

## Architecture

The application uses the Next.js App Router. Supabase provides authentication, profile data, event storage, and attendance relationships. Google Maps renders event locations, while a server-side notification route sends emails without exposing service credentials to the browser.

Application code lives in [`hiking-app/`](hiking-app/).

## Run locally

Requirements: Node.js 20 or later and a Supabase project.

```bash
cd hiking-app
npm install
npm run dev
```

Configure these environment variables before starting the app:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_GOOGLE_MAP_API
```

Email notifications additionally require:

```text
SUPABASE_SERVICE_ROLE_KEY
EMAIL_USER
EMAIL_PASS
```

Never commit real credentials to the repository.
