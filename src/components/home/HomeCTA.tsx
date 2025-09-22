'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, MessageSquare, Calendar, Handshake, FileText } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Initial Consultation',
    description: 'Schedule a free 30-minute call with our experts to discuss your business needs and goals.',
    icon: <MessageSquare className="h-6 w-6" />,
    link: '/contact',
    linkText: 'Schedule Now'
  },
  {
    id: 2,
    title: 'Custom Solution Design',
    description: 'We analyze your requirements and create a tailored solution to address your specific challenges.',
    icon: <FileText className="h-6 w-6" />,
    link: '/services',
    linkText: 'Our Services'
  },
  {
    id: 3,
    title: 'Implementation & Support',
    description: 'Our team implements the solution and provides ongoing support to ensure your success.',
    icon: <Handshake className="h-6 w-6" />,
    link: '/about',
    linkText: 'Meet Our Team'
  }
];

export function HomeCTA() {
  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Start Your Journey with EXCIMAA</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Transform your business with our expert services. Here's how simple it is to get started:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 text-white">
                    {step.icon}
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-blue-300 text-sm font-medium">Step {step.id}</span>
                    <div className="w-8 h-px bg-blue-500 mx-3"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-blue-100 mb-6">{step.description}</p>
                  <Link 
                    href={step.link}
                    className="inline-flex items-center text-blue-300 hover:text-white font-medium transition-colors group-hover:translate-x-1 duration-300"
                  >
                    {step.linkText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6">Ready to take the first step?</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-transparent text-base font-medium rounded-xl text-blue-900 bg-white hover:bg-blue-50 transition-colors md:text-lg md:px-10"
              >
                Get a Free Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-base font-medium rounded-xl text-white hover:bg-white/10 transition-colors md:text-lg md:px-10"
              >
                Explore Our Services
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              Have questions? <Link href="/contact" className="text-white font-medium hover:underline">Contact our team</Link> for more information.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
