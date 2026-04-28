import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              ST. ANNS COLLEGE
            </Link>
            <p className="mt-4 max-w-xs text-gray-600 leading-relaxed">
              Empowering students with knowledge and skills for a better tomorrow. 
              Dedicated to excellence in education and holistic development.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/courses" className="text-gray-600 hover:text-blue-900">Courses</Link></li>
              <li><Link href="/faculty" className="text-gray-600 hover:text-blue-900">Faculty</Link></li>
              <li><Link href="/admission" className="text-gray-600 hover:text-blue-900">Admissions</Link></li>
              <li><Link href="/admin" className="text-gray-600 hover:text-blue-900">Admin Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>123 Education Lane</li>
              <li>Academic City, AC 12345</li>
              <li>Email: info@stanns.edu</li>
              <li>Phone: +1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 border-t pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} St. Anns College. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
