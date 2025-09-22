'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Search, FileText, Handshake, CheckCircle } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    name: 'Initial Consultation',
    description: 'We discuss your business needs and goals to understand how we can help.',
    icon: ClipboardList,
  },
  {
    id: 2,
    name: 'Needs Assessment',
    description: 'Our experts analyze your current financial situation and identify opportunities.',
    icon: Search,
  },
  {
    id: 3,
    name: 'Proposal',
    description: 'We create a customized service plan tailored to your specific requirements.',
    icon: FileText,
  },
  {
    id: 4,
    name: 'Implementation',
    description: 'Our team gets to work implementing the agreed-upon solutions.',
    icon: Handshake,
  },
  {
    id: 5,
    name: 'Ongoing Support',
    description: 'We provide continuous support and regular reviews to ensure your success.',
    icon: CheckCircle,
  },
];

export function ServiceProcess() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A streamlined approach to delivering exceptional results
          </p>
        </div>

        <div className="relative">
          {/* Progress line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500 transform -translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-0">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.id}
                  className="relative flex flex-col md:flex-row items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Step content - alternates sides on desktop */}
                  <div className={`w-full md:w-5/12 mb-4 md:mb-0 ${isEven ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:order-2'}`}>
                    <h3 className="text-xl font-semibold text-gray-900">{step.name}</h3>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                  </div>
                  
                  {/* Step number and icon */}
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center z-10 mx-auto md:mx-0 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  
                  {/* Empty div to balance the layout */}
                  <div className="hidden md:block md:w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
