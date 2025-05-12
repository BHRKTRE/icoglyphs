import { getDefaultHomepageIconsWithAliases } from '$lib/app/core/utils/homePageData.svelte.js';

/**
 * 	xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
 * 
 */

const mainUrl = 'https://icoglyphs.com/';

const generateSitemap = () => {
	const DefaultHomepageIcons = getDefaultHomepageIconsWithAliases();
	let sitemapXml = '';

	DefaultHomepageIcons.forEach((iconAlias) => {
		sitemapXml += `
        <url>
            <loc>${mainUrl}icon/${iconAlias}</loc>
            <lastmod>2025-04-25</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
        </url>\n`;
	});

	return sitemapXml;
};

export async function GET() {
	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
		>
			
        <url>
            <loc>${mainUrl}</loc>
            <lastmod>2025-04-25</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>

        ${generateSitemap()}

		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
