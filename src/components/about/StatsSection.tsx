'use client';

import { motion } from 'framer-motion';
import { Users, Briefcase, ChartBar, Globe } from 'lucide-react';

const stats = [
  { id: 1, name: 'Happy Clients', value: '500+', icon: Users },
  { id: 2, name: 'Projects Completed', value: '1000+', icon: Briefcase },
  { id: 3, name: 'Years Experience', value: '10+', icon: ChartBar },
  { id: 4, name: 'Global Reach', value: '15+', icon: Globe },
];

export function StatsSection() {
  return (
    <section className="bg-blue-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-blue-200" />
                </div>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-blue-200">{stat.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
