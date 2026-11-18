import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stannscollegeforwomen.ac.in';

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
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
