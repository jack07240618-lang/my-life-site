// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const [owner, repository] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const isUserSite = repository === `${owner}.github.io`;
const base = owner && repository && !isUserSite ? `/${repository}/` : '/';
const site = owner ? `https://${owner}.github.io` : 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
	site,
	base,
	integrations: [sitemap({ filter: (page) => !page.endsWith('/studio/') })],
	vite: {
		plugins: [tailwindcss()],
	},
});
