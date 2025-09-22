'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, Scale, Users, FileText, BarChart2, Globe } from 'lucide-react';

const services = [
  {
    icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    title: 'Accounting Services',
    description: 'Comprehensive accounting services including bookkeeping, financial statements, and tax preparation.'
  },
  {
    icon: <Scale className="w-8 h-8 text-blue-600" />,
    title: 'Audit & Assurance',
    description: 'Professional audit services to ensure compliance and improve business processes.'
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: 'Business Consulting',
    description: 'Strategic business advice to help you make informed decisions and grow your business.'
  },
  {
    icon: <FileText className="w-8 h-8 text-blue-600" />,
    title: 'Tax Planning',
    description: 'Expert tax planning and preparation services to minimize your tax liability.'
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-blue-600" />,
    title: 'Financial Advisory',
    description: 'Comprehensive financial advice to help you achieve your business goals.'
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-600" />,
    title: 'International Services',
    description: 'Global business solutions for companies operating across borders.'
  }
];

export function HomeServices() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600">
            We offer a wide range of professional services to meet all your business needs.
            Our team of experts is here to help you succeed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                href="/services" 
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
