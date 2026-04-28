import Link from 'next/link';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'Blog', href: '/blog' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-blue-900">
            ST. ANNS COLLEGE
          </span>
        </Link>
        
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-900"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/admission"
            className="rounded-full bg-blue-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-800"
          >
            Apply Now
          </Link>
        </div>
        
        {/* Mobile menu button would go here */}
      </div>
    </nav>
  );
}
