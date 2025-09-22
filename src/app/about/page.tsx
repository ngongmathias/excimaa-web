import { Metadata } from 'next';
import { TeamSection } from '@/components/about/TeamSection';
import { StatsSection } from '@/components/about/StatsSection';
import { ValuesSection } from '@/components/about/ValuesSection';
import { ClientStories } from '@/components/about/ClientStories';
import { GlobalOffices } from '@/components/about/GlobalOffices';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - EXCIMAA',
  description: 'Learn about EXCIMAA and our team of expert accountants and business consultants.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title="About EXCIMAA"
        description="Dedicated to excellence in accounting and business consulting"
        breadcrumb={[{ name: 'About', href: '/about' }]}
      />
      
      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  Founded in 2020, EXCIMAA has grown from a small accounting firm to a comprehensive business solutions provider. 
                  Our journey has been driven by a commitment to excellence, integrity, and client success.
                </p>
                <p className="mb-6">
                  What started as a team of three passionate accountants has evolved into a diverse group of professionals 
                  dedicated to helping businesses navigate the complexities of modern finance and operations.
                </p>
                <p className="mb-8">
                  Today, we serve clients across multiple industries, providing tailored solutions that drive growth and 
                  ensure compliance in an ever-changing business landscape.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="/services" variant="primary">
                    Explore Our Services
                  </Button>
                  <Button href="/contact" variant="outline">
                    Get in Touch
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-100 rounded-2xl aspect-[4/5] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-20 rounded-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl font-bold text-blue-600 mb-2">2020</div>
                    <div className="text-lg text-gray-700">Year Founded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ValuesSection />
      
      {/* International Expertise */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">International Expertise</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  With offices across multiple continents, EXCIMAA brings together a wealth of international 
                  experience in accounting, auditing, and business consulting. Our global presence enables us to 
                  serve clients with local expertise while maintaining international standards.
                </p>
                <p className="mb-8">
                  Our team of certified professionals is well-versed in international financial reporting standards 
                  (IFRS), local regulations, and cross-border business practices, ensuring seamless operations 
                  for your global business needs.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Global Reach</h4>
                    <p className="text-sm text-gray-600">Offices in 7+ countries across 3 continents</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Multilingual Team</h4>
                    <p className="text-sm text-gray-600">Fluent in English, French, and local languages</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative z-10 text-center">
                  <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Global Network</h3>
                  <p className="text-gray-700 mb-6">
                    Connecting businesses across borders with local expertise and global standards
                  </p>
                  <Button href="/contact" variant="outline">
                    Contact Our Global Team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <TeamSection />
      <ClientStories />
      <GlobalOffices />
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your business?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of businesses that trust EXCIMAA for their financial success. 
              Schedule a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Get Started
              </a>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
