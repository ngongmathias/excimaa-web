import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  className?: string;
}

export function PageHeader({ 
  title, 
  description, 
  breadcrumb = [],
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`bg-blue-900 py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {breadcrumb.length > 0 && (
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div className="flex items-center">
                  <Link href="/" className="text-blue-200 hover:text-white text-sm font-medium">
                    Home
                  </Link>
                </div>
              </li>
              {breadcrumb.map((item, index) => (
                <li key={item.href}>
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-4 w-4 text-blue-300" aria-hidden="true" />
                    <Link
                      href={item.href}
                      className={`ml-2 text-sm font-medium ${
                        index === breadcrumb.length - 1
                          ? 'text-white'
                          : 'text-blue-200 hover:text-white'
                      }`}
                      aria-current={index === breadcrumb.length - 1 ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-xl text-blue-100 max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
