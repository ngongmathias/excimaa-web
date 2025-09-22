'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Michael Thompson',
    role: 'CFO, TechStart Inc.',
    content: 'EXCIMAA transformed our financial operations. Their strategic insights helped us reduce costs by 22% in the first quarter alone.',
    rating: 5,
    image: '/images/testimonials/michael-t.jpg'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'CEO, GreenScape Solutions',
    content: 'The team at EXCIMAA provided exceptional guidance during our expansion. Their international tax expertise saved us thousands.',
    rating: 5,
    image: '/images/testimonials/sarah-j.jpg'
  },
  {
    id: 3,
    name: 'David Kim',
    role: 'Finance Director, UrbanEats',
    content: 'Their business advisory services were instrumental in our recent funding round. Highly recommend their expertise.',
    rating: 4,
    image: '/images/testimonials/david-k.jpg'
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    role: 'Founder, Bloom & Grow',
    content: 'The audit process was seamless and transparent. EXCIMAA helped us identify areas for improvement we never considered.',
    rating: 5,
    image: '/images/testimonials/emily-r.jpg'
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what our clients have to say about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="mb-4 text-blue-500">
                <Quote className="h-8 w-8 opacity-20" />
              </div>
              
              <p className="text-gray-600 mb-6 flex-grow">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                  <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl font-medium text-blue-600">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/testimonials"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Read more testimonials
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
