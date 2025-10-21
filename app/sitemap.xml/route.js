import { supabase } from '../../lib/supabase';

const SITE_URL = 'http://localhost:3000'; // adapte en prod

const staticPages = [
  '/cgv',
  '/about',
  '/carrières',
  '/contact',
  '/engagements',
  '/garanties',
  '/histoire',
  '/livraisons-retours',
  '/partenaires',
  '/privacy',
  '/technologies',
  '/thankyou',
  '/checkout',
  '/cart',
  '/products',
  '/precommande',
  '/accessoires',
];

function generateSitemap(products) {
  const pages = staticPages
    .map(
      (page) => `
    <url>
      <loc>${SITE_URL}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join('');

  const productPages = products
    .map(
      (product) => `
    <url>
      <loc>${SITE_URL}/products/${product.id}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  >
    ${pages}
    ${productPages}
  </urlset>`;
}

export async function GET() {
  const { data: products, error } = await supabase
    .from('input_catalogue_produits')
    .select('id')
    .limit(100);

  if (error) {
    console.error('Erreur récupération produits pour sitemap:', error);
  }

  const sitemap = generateSitemap(products || []);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}