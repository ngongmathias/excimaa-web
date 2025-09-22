'use client';

import { motion } from 'framer-motion';
import { Award, Shield, Users, BarChart, Lightbulb, Handshake } from 'lucide-react';

const values = [
  {
    name: 'Excellence',
    description: 'We are committed to delivering the highest quality service and exceeding client expectations in everything we do.',
    icon: Award,
  },
  {
    name: 'Integrity',
    description: 'We uphold the highest standards of professionalism, ethics, and transparency in all our interactions.',
    icon: Shield,
  },
  {
    name: 'Collaboration',
    description: 'We believe in working closely with our clients as partners to achieve their financial goals.',
    icon: Users,
  },
  {
    name: 'Innovation',
    description: 'We embrace new technologies and approaches to provide cutting-edge solutions to our clients.',
    icon: Lightbulb,
  },
  {
    name: 'Expertise',
    description: 'Our team consists of highly skilled professionals with deep knowledge and experience in their fields.',
    icon: BarChart,
  },
  {
    name: 'Trust',
    description: 'We build lasting relationships based on trust, respect, and mutual success.',
    icon: Handshake,
  },
];

export function ValuesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These principles guide everything we do and define who we are as a company.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.name}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.name}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
