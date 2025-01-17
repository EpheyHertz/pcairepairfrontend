export default function sitemap() {
    const baseUrl = 'https://pcairepair.vercel.app';
  
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `${baseUrl}/chatai`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/profile`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/updateprofile`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/talktous`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/latestnews`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
    ];
  }
  