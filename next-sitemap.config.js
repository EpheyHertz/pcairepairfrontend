/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://pcairepair.vercel.app', // Replace with your domain
    generateRobotsTxt: true, // (optional) Generates a robots.txt file
    exclude: ['/admin'], // Exclude any pages you don't want in the sitemap
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: '/admin' }, // Example
      ],
    },
    changefreq: 'daily', // Default change frequency
    priority: 0.7, // Default priority
  };
  