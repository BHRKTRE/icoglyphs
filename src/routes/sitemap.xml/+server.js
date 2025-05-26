import icoGlyphs from '$lib/index.js';

const mainUrl = 'https://icoglyphs.com/';
const lastModDate = '2025-04-25';

const homePageIcons = () =>
	icoGlyphs.db
		.filter((ig) => ig.is_public)
		.map((ig) => ig.aliases[0])
		.reverse()
		.map(
			(alias) => `
    <url>
      <loc>${mainUrl}icon/${alias}</loc>
      <lastmod>${lastModDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>`
		)
		.join('\n');

export async function GET() {
	return new Response(
		`
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">

      <url>
        <loc>${mainUrl}</loc>
        <lastmod>${lastModDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>

      ${homePageIcons()}

    </urlset>
    `.trim(),
		{
			headers: { 'Content-Type': 'application/xml' }
		}
	);
}
