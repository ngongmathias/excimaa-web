'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building2, Globe, Users, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: <Building2 className="w-8 h-8 text-blue-600" />,
    title: 'Professional Team',
    description: 'Our team consists of certified professionals with extensive experience in accounting and business consulting.'
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-600" />,
    title: 'Global Reach',
    description: 'We serve clients across multiple countries, providing international business solutions.'
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: 'Client Focused',
    description: 'We prioritize our clients\' needs and work closely with them to achieve their business goals.'
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-blue-600" />,
    title: 'Data Driven',
    description: 'We use the latest tools and technologies to provide data-driven insights for your business.'
  }
];

export function HomeAbout() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About EXCIMAA</h2>
          <p className="text-lg text-gray-600">
            We are a team of experienced professionals dedicated to providing top-notch accounting and business consulting services.
            Our mission is to help businesses thrive through expert financial guidance and strategic planning.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/about"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
