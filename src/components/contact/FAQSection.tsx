'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What services does EXCIMAA offer?',
    answer: 'EXCIMAA provides a comprehensive range of accounting and business consulting services including financial accounting, tax preparation, audit services, business advisory, and more. Our team of experts is here to support all your financial needs.'
  },
  {
    question: 'How can I schedule a consultation?',
    answer: 'You can schedule a consultation by filling out our contact form, calling our office directly, or emailing us. We typically respond to consultation requests within 1 business day to set up a meeting at your convenience.'
  },
  {
    question: 'What are your business hours?',
    answer: 'Our office is open Monday through Friday from 9:00 AM to 6:00 PM. We are also available by appointment outside of these hours to accommodate your schedule.'
  },
  {
    question: 'Do you offer virtual consultations?',
    answer: 'Yes, we offer both in-person and virtual consultations via video conferencing platforms. This allows us to serve clients regardless of their location while maintaining the same level of personalized service.'
  },
  {
    question: 'What information should I prepare for my first meeting?',
    answer: 'For your first meeting, please bring any relevant financial documents, previous tax returns, and a list of questions or concerns. This will help us better understand your situation and provide the most effective advice.'
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
              aria-expanded={openIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <div className="flex items-start">
                <HelpCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="font-medium text-gray-900">{faq.question}</span>
              </div>
              <ChevronDown 
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  id={`faq-content-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                  role="region"
                  aria-labelledby={`faq-heading-${index}`}
                >
                  <div className="px-6 pb-4 pt-0 text-gray-600">
                    <p className="pl-8">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Can't find what you're looking for?{' '}
          <a 
            href="#" 
            className="text-blue-600 hover:text-blue-800 font-medium"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('message')?.focus();
            }}
          >
            Send us a message
          </a>
        </p>
      </div>
    </div>
  );
}
