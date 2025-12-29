export default function sitemap() {
    const baseUrl = "https://www.hexagonpadel.eu";
    return [
      { url: `${baseUrl}/`, lastModified: new Date() },
      { url: `${baseUrl}/products`, lastModified: new Date() },
      { url: `${baseUrl}/contact`, lastModified: new Date() },
      { url: `${baseUrl}/privacy`, lastModified: new Date() },
      { url: `${baseUrl}/cgv`, lastModified: new Date() },
    ];
  }