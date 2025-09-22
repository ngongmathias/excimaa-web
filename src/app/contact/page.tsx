import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { MapSection } from '@/components/contact/MapSection';
import { PageHeader } from '@/components/ui/PageHeader';
import { FAQSection } from '@/components/contact/FAQSection';

export const metadata: Metadata = {
  title: 'Contact Us - EXCIMAA',
  description: 'Get in touch with our team of experts. We\'re here to help with all your accounting and business consulting needs.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <PageHeader
        title="Get in Touch"
        description="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        breadcrumb={[{ name: 'Contact', href: '/contact' }]}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              <ContactForm />
            </div>
            
            <FAQSection />
          </div>
          
          <div className="space-y-8">
            <ContactInfo />
            <div className="rounded-xl overflow-hidden shadow-lg h-96">
              <MapSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
