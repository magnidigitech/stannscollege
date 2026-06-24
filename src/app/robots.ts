import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/', '/facultyupdate/', '/faculty/profile/update/'],
    },
    sitemap: 'https://stannscollegeforwomen.org/sitemap.xml',
  };
}
