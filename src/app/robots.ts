import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/',
        '/portal',
        '/portal/',
        '/update',
        '/update/',
        '/facultyupdate',
        '/facultyupdate/',
        '/faculty/profile/update',
        '/faculty/profile/update/',
        '/studio',
        '/studio/',
        '/api/',
        '/academics/departments/update',
        '/academics/departments/update/',
      ],
    },
    sitemap: 'https://stannscollegeforwomen.org/sitemap.xml',
  };
}
