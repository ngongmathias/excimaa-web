'use client';

import { motion } from 'framer-motion';
import { User, Mail, Linkedin } from 'lucide-react';

const team = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    image: '/images/team/john-smith.jpg',
    bio: 'With over 15 years of experience in accounting and finance, John leads our team with a vision for excellence and innovation.',
    email: 'john@excimaa.com',
    linkedin: 'https://linkedin.com/in/johnsmith',
  },
  {
    name: 'Sarah Johnson',
    role: 'Senior Accountant',
    image: '/images/team/sarah-johnson.jpg',
    bio: 'Sarah specializes in tax planning and financial reporting, helping clients optimize their financial strategies.',
    email: 'sarah@excimaa.com',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
  },
  {
    name: 'Michael Chen',
    role: 'Business Consultant',
    image: '/images/team/michael-chen.jpg',
    bio: 'Michael brings expertise in business strategy and operations, helping clients scale their businesses effectively.',
    email: 'michael@excimaa.com',
    linkedin: 'https://linkedin.com/in/michaelchen',
  },
  {
    name: 'Emily Wilson',
    role: 'Audit Manager',
    image: '/images/team/emily-wilson.jpg',
    bio: 'Emily leads our audit team, ensuring compliance and operational excellence for our clients.',
    email: 'emily@excimaa.com',
    linkedin: 'https://linkedin.com/in/emilywilson',
  },
];

export function TeamSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of certified professionals is dedicated to providing exceptional service and expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-blue-200">{member.role}</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-blue-900/20">
                  <User className="h-16 w-16 text-white/30" />
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
