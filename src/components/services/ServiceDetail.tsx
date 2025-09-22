import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Service {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  image: string;
}

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Service Image */}
        <div className="mb-10 lg:mb-0">
          <div className="relative h-64 md:h-96 lg:h-full rounded-xl overflow-hidden shadow-lg">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Service Details */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {service.title}
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            {service.longDescription}
          </p>

          {/* Key Features */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Key Features
            </h3>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Benefits for Your Business
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Content */}
      <div className="mt-16">
        <div className="prose max-w-none">
          <h3>Why Choose Our {service.title}?</h3>
          <p>
            Our team of certified professionals brings years of experience and expertise to deliver exceptional 
            {service.title.toLowerCase()} services tailored to your specific needs. We combine technical knowledge with 
            practical business insights to provide solutions that drive results.
          </p>
          
          <h3>Our Approach</h3>
          <p>
            We believe in a collaborative approach, working closely with you to understand your unique requirements 
            and challenges. Our process is transparent, efficient, and focused on delivering measurable value to 
            your business.
          </p>
          
          <h3>Get Started Today</h3>
          <p>
            Ready to experience the difference our {service.title.toLowerCase()} can make for your business? 
            Contact us today to schedule a consultation and discover how we can help you achieve your goals.
          </p>
        </div>
      </div>
    </div>
  );
}
