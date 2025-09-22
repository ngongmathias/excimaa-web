'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'default' | 'inverted';
  className?: string;
}

export function CTA({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  variant = 'default',
  className = ''
}: CTAProps) {
  const isInverted = variant === 'inverted';
  
  return (
    <section className={`py-16 ${isInverted ? 'bg-blue-900 text-white' : 'bg-gray-50'} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isInverted ? 'text-blue-100' : 'text-gray-600'}`}>
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={buttonLink}
                className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md ${
                  isInverted 
                    ? 'bg-white text-blue-900 hover:bg-blue-50' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
              >
                {buttonText}
                <svg 
                  className="ml-2 -mr-1 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </Link>
              {!isInverted && (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Contact Us
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
