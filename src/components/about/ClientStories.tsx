'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const stories = [
  {
    id: 1,
    quote: "EXCIMAA transformed our financial operations. Their strategic advice helped us increase our revenue by 40% in just one year.",
    author: "Alex Johnson",
    role: "CEO, TechStart Inc.",
    image: "/images/clients/techstart.jpg"
  },
  {
    id: 2,
    quote: "The team's expertise in tax planning saved us thousands of dollars. Their attention to detail is unmatched in the industry.",
    author: "Maria Garcia",
    role: "Founder, GreenLeaf Organics",
    image: "/images/clients/greenleaf.jpg"
  },
  {
    id: 3,
    quote: "As a growing startup, we needed financial guidance we could trust. EXCIMAA has been an invaluable partner in our journey.",
    author: "David Kim",
    role: "CTO, NexGen Solutions",
    image: "/images/clients/nexgen.jpg"
  }
];

export function ClientStories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from businesses that have transformed their operations with our help
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              className="bg-gray-50 p-8 rounded-xl relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Quote className="h-8 w-8 text-blue-100 absolute top-6 right-6" />
              <p className="text-gray-700 italic mb-6">"{story.quote}"</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                    <span className="text-lg font-medium text-blue-600">
                      {story.author.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{story.author}</p>
                  <p className="text-sm text-gray-500">{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/case-studies"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Read more case studies
            <svg
              className="ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
