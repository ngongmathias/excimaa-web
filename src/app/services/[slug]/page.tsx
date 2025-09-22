import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetail } from '@/components/services/ServiceDetail';
import { CTA } from '@/components/ui/CTA';
import { PageHeader } from '@/components/ui/PageHeader';

// This would typically come from a CMS or database
const services = [
  {
    slug: 'accounting',
    title: 'Accounting Services',
    description: 'Comprehensive accounting solutions for businesses of all sizes',
    longDescription: 'Our expert accounting services provide accurate financial reporting, bookkeeping, and financial analysis to help you make informed business decisions. We handle all aspects of your accounting needs so you can focus on growing your business.',
    features: [
      'Bookkeeping and record keeping',
      'Financial statement preparation',
      'Accounts payable/receivable management',
      'Payroll processing',
      'Bank and credit card reconciliations',
      'Financial analysis and reporting'
    ],
    image: '/images/services/accounting.jpg',
    benefits: [
      'Improved financial visibility',
      'Time and cost savings',
      'Accurate and timely reporting',
      'Better cash flow management',
      'Compliance with accounting standards'
    ]
  },
  {
    slug: 'tax',
    title: 'Tax Services',
    description: 'Expert tax planning and preparation services',
    longDescription: 'Our tax professionals stay up-to-date with the latest tax laws to ensure compliance and maximize your tax savings. We provide comprehensive tax services for individuals and businesses.',
    features: [
      'Tax planning and preparation',
      'Tax return filing',
      'Tax audit support',
      'Tax compliance',
      'Tax strategy consulting',
      'International tax services'
    ],
    image: '/images/services/tax.jpg',
    benefits: [
      'Maximized tax savings',
      'Reduced audit risk',
      'Strategic tax planning',
      'Peace of mind with compliance',
      'Expert guidance on complex tax matters'
    ]
  },
  {
    slug: 'audit',
    title: 'Audit & Assurance',
    description: 'Reliable audit services for financial accuracy',
    longDescription: 'Our audit services provide independent verification of your financial statements, giving stakeholders confidence in your financial reporting and helping you identify areas for improvement.',
    features: [
      'Financial statement audits',
      'Internal audit services',
      'Compliance audits',
      'Operational audits',
      'Agreed-upon procedures',
      'Special purpose audits'
    ],
    image: '/images/services/audit.jpg',
    benefits: [
      'Enhanced financial credibility',
      'Improved internal controls',
      'Regulatory compliance',
      'Risk identification',
      'Stakeholder confidence'
    ]
  },
  {
    slug: 'consulting',
    title: 'Business Consulting',
    description: 'Strategic guidance for business growth',
    longDescription: 'Our business consulting services help you navigate challenges, identify opportunities, and implement strategies for sustainable growth and success in today\'s competitive landscape.',
    features: [
      'Business strategy development',
      'Financial planning & analysis',
      'Process improvement',
      'Risk management',
      'Mergers & acquisitions support',
      'Performance optimization'
    ],
    image: '/images/services/consulting.jpg',
    benefits: [
      'Informed decision making',
      'Improved operational efficiency',
      'Sustainable growth strategies',
      'Competitive advantage',
      'Risk mitigation'
    ]
  },
  {
    slug: 'payroll',
    title: 'Payroll Services',
    description: 'Streamlined payroll processing solutions',
    longDescription: 'Our payroll services ensure accurate and timely payment to your employees while handling all compliance requirements, tax filings, and reporting, so you can focus on your core business.',
    features: [
      'Payroll processing',
      'Tax calculations and filings',
      'Direct deposit setup',
      'Payroll tax compliance',
      'Year-end reporting',
      'Employee self-service portal'
    ],
    image: '/images/services/payroll.jpg',
    benefits: [
      'Time and cost savings',
      'Reduced compliance risk',
      'Accurate and on-time payments',
      'Detailed reporting',
      'Secure data handling'
    ]
  }
];

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  
  if (!service) {
    return {
      title: 'Service Not Found - EXCIMAA',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: `${service.title} - EXCIMAA`,
    description: service.description,
    openGraph: {
      title: `${service.title} - EXCIMAA`,
      description: service.description,
      type: 'website',
    },
  };
}

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white">
      <PageHeader
        title={service.title}
        description={service.description}
        breadcrumb={[
          { name: 'Services', href: '/services' },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />
      
      <ServiceDetail service={service} />
      
      <CTA 
        title={`Ready to get started with our ${service.title}?`}
        description="Contact us today to schedule a consultation and learn how we can help your business thrive."
        buttonText="Get in Touch"
        buttonLink="/contact"
      />
    </div>
  );
}
