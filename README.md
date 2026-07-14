# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

## Moments publishing

The existing static site works without any backend configuration. To enable the private publishing studio and public Moments feed:

1. Create a Supabase project.
2. Run `supabase/setup.sql` in the Supabase SQL editor.
3. In Authentication, create the single administrator user and disable public sign-ups.
4. Copy the user's UUID from Authentication and run:

   ```sql
   insert into public.site_admins (user_id) values ('YOUR_AUTH_USER_UUID');
   ```

5. Copy `.env.example` to `.env` and set the project URL and publishable key. Never use a secret or service-role key in `PUBLIC_*` variables.
6. Add the same two environment variables to the production deployment and rebuild.

Public feed: `/moments/`  
Private studio: `/studio/`

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
