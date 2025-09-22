'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, 
  Calculator, 
  Briefcase, 
  Shield, 
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Headset,
  Award
} from 'lucide-react';

const services = [
  {
    id: 'accounting',
    slug: 'accounting',
    title: 'Accounting Services',
    icon: FileText,
    description: 'Comprehensive financial record-keeping and reporting',
    features: [
      'Bookkeeping & Financial Statements',
      'Accounts Payable/Receivable',
      'Payroll Processing',
      'Bank Reconciliations'
    ],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    stat: '95%',
    statLabel: 'Client Satisfaction',
    statIcon: <Award className="h-5 w-5" />
  },
  {
    id: 'tax',
    slug: 'tax',
    title: 'Tax Services',
    icon: Calculator,
    description: 'Strategic tax planning and compliance',
    features: [
      'Tax Preparation & Filing',
      'Tax Planning & Strategy',
      'Tax Audit Support',
      'Sales & Payroll Tax'
    ],
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    stat: '10+',
    statLabel: 'Years Experience',
    statIcon: <Clock className="h-5 w-5" />
  },
  {
    id: 'consulting',
    slug: 'consulting',
    title: 'Business Consulting',
    icon: Briefcase,
    description: 'Expert guidance for business growth',
    features: [
      'Business Planning',
      'Financial Forecasting',
      'Cash Flow Management',
      'Business Valuation'
    ],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    stat: '500+',
    statLabel: 'Businesses Helped',
    statIcon: <Users className="h-5 w-5" />
  },
  {
    id: 'audit',
    slug: 'audit',
    title: 'Audit & Assurance',
    icon: Shield,
    description: 'Comprehensive audit services',
    features: [
      'Financial Statement Audits',
      'Internal Control Reviews',
      'Compliance Audits',
      'Operational Audits'
    ],
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    stat: '24/7',
    statLabel: 'Support Available',
    statIcon: <Headset className="h-5 w-5" />
  },
  {
    id: 'payroll',
    slug: 'payroll',
    title: 'Payroll Services',
    icon: TrendingUp,
    description: 'Streamlined payroll processing',
    features: [
      'Payroll Processing',
      'Tax Calculations',
      'Direct Deposit',
      'Year-end Reporting'
    ],
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    stat: '99.9%',
    statLabel: 'Accuracy Rate',
    statIcon: <CheckCircle2 className="h-5 w-5" />
  }
];

export function ServiceCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Financial Solutions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored services designed to meet your business needs and drive sustainable growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group block"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg ${service.bgColor} ${service.textColor} mr-4`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className={`h-5 w-5 ${service.textColor} mt-0.5 mr-2 flex-shrink-0`} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-sm text-gray-500">+{service.features.length - 3} more</li>
                      )}
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-1.5 rounded-md ${service.bgColor} ${service.textColor} mr-2`}>
                          {service.statIcon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{service.stat}</div>
                          <div className="text-xs text-gray-500">{service.statLabel}</div>
                        </div>
                      </div>
                      <span className={`inline-flex items-center text-sm font-medium ${service.textColor} group-hover:translate-x-1 transition-transform`}>
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 px-6 py-3 bg-blue-50 rounded-full">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-10 w-10 rounded-full bg-blue-100 border-2 border-white"></div>
                ))}
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                Trusted by <span className="font-bold text-blue-600">500+</span> businesses
              </span>
            </div>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                <Award className="h-5 w-5" />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                <span className="font-bold text-blue-600">Award-winning</span> service
              </span>
            </div>
          </div>
        </div>
    </div>
  </section>
  );
}
