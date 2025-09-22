import { Metadata } from 'next';
import { ServiceCategories } from '@/components/services/ServiceCategories';
import { ServiceProcess } from '@/components/services/ServiceProcess';
import { Testimonials } from '@/components/services/Testimonials';
import { CTA } from '@/components/ui/CTA';
import { PageHeader } from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Our Services - EXCIMAA',
  description: 'Comprehensive accounting, tax, and business consulting services to help your business thrive.',
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title="Our Services"
        description="Expert solutions tailored to your business needs"
        breadcrumb={[{ name: 'Services', href: '/services' }]}
      />
      
      <ServiceCategories />
      
      <div className="bg-gradient-to-b from-white to-gray-50">
        <ServiceProcess />
        <Testimonials />
      </div>
      
      <CTA 
        title="Ready to transform your business?"
        description="Get in touch with our experts to discuss how we can help you achieve your goals."
        buttonText="Schedule a Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}
