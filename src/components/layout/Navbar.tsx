'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  User, 
  LogOut, 
  Settings, 
  Home, 
  Info, 
  Layers, 
  Tag, 
  Mail,
  User as UserIcon,
  Search,
  ShoppingCart,
  Bell,
  LogIn,
  UserPlus,
  ChevronRight
} from 'lucide-react';

const navigation = [
  { 
    name: 'Home', 
    href: '/', 
    icon: ({ className }: { className?: string }) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '-2px' }}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ) 
  },
  { 
    name: 'About', 
    href: '/about', 
    icon: ({ className }: { className?: string }) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '-1px' }}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    )
  },
  { 
    name: 'Services', 
    href: '/services', 
    icon: ({ className }: { className?: string }) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '-1px' }}>
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    ),
    submenu: [
      { 
        name: 'Commercial Cleaning', 
        href: '/services/commercial-cleaning', 
        description: 'Professional cleaning for businesses',
        icon: ChevronRight
      },
      { 
        name: 'Residential Cleaning', 
        href: '/services/residential-cleaning', 
        description: 'Home cleaning services',
        icon: ChevronRight
      },
      { 
        name: 'Deep Cleaning', 
        href: '/services/deep-cleaning', 
        description: 'Thorough cleaning for all spaces',
        icon: ChevronRight
      },
      { 
        name: 'Carpet Cleaning', 
        href: '/services/carpet-cleaning', 
        description: 'Professional carpet care',
        icon: ChevronRight
      }
    ]
  },
  { 
    name: 'Pricing', 
    href: '/pricing', 
    icon: ({ className }: { className?: string }) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '-1px' }}>
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    )
  },
  { 
    name: 'Contact', 
    href: '/contact', 
    icon: ({ className }: { className?: string }) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '-1px' }}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    )
  },
] as const;

const userNavigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: Settings,
    description: 'View your dashboard'
  },
  { 
    name: 'Profile', 
    href: '/profile', 
    icon: User,
    description: 'Manage your account'
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings,
    description: 'Configure your preferences'
  },
  { 
    name: 'Sign out', 
    href: '#', 
    icon: LogOut,
    description: 'Sign out of your account'
  },
];

// Animation variants
const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.2
    } 
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const menuItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.2
    }
  }
};

const navItemVariants = {
  hover: { 
    y: -2,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98 
  }
};

// Submenu Component
function Submenu({ items, isOpen, onClose }: { items: Array<{name: string, href: string, icon: any}>, isOpen: boolean, onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          className="absolute left-0 mt-2 w-64 origin-top-left rounded-xl bg-white/95 backdrop-blur-sm shadow-xl ring-1 ring-black/5 overflow-hidden z-50"
        >
          <div className="py-1.5">
            {items.map((item) => (
              <motion.div key={item.name} variants={menuItemVariants}>
                <Link
                  href={item.href}
                  className="group flex items-center px-5 py-3 text-[15px] font-medium text-gray-800 hover:bg-gray-50/90 hover:text-primary-600 transition-colors duration-200"
                >
                  {item.icon && (
                    <span className="mr-3 text-gray-400 group-hover:text-primary-500 transition-colors">
                      <item.icon className="h-4.5 w-4.5" />
                    </span>
                  )}
                  {item.name}
                  <ChevronRight className="ml-auto h-4 w-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navbarRef = useRef<HTMLElement>(null);

  // Toggle submenu
  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  // Close all menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
        setUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check auth status
  useEffect(() => {
    // Simulate checking auth status
    // In a real app, you would check the auth state from your auth provider
    const checkAuth = async () => {
      try {
        // Mock implementation - replace with actual auth check
        setTimeout(() => {
          setUser(null); // Set to null to see the sign-in/sign-up buttons
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener with passive for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
      setActiveSubmenu(null);
    };

    // Add event listener for route changes
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const handleSignOut = async () => {
    try {
      // In a real app, you would call your auth provider's signOut method
      console.log('Signing out...');
      setUser(null);
      setUserMenuOpen(false);
      // Redirect to home after sign out
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Render loading skeleton
  if (isLoading) {
    return (
      <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="hidden md:flex items-center space-x-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-6 w-16 bg-gray-200 rounded-md animate-pulse"></div>
              ))}
              <div className="ml-4 flex items-center space-x-4">
                <div className="h-9 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-9 w-24 bg-blue-600 rounded-md animate-pulse"></div>
              </div>
            </div>
            <div className="md:hidden h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header 
      ref={navbarRef}
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        scrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-2' 
          : 'bg-white/80 backdrop-blur-md py-4'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center group"
              onClick={() => setActiveSubmenu(null)}
            >
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="relative h-12 w-12 flex items-center justify-center bg-white rounded-lg p-1 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img 
                    src="/logo.png" 
                    alt="EX Logo" 
                    className="h-full w-auto object-contain"
                  />
                </motion.div>
                <motion.div 
                  className="flex flex-col leading-none"
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-sans tracking-tight">
                    EXCIMAA
                  </span>
                  <span className="text-xs font-bold text-gray-500 -mt-0.5 tracking-wider whitespace-nowrap">
                    Professionalism in Motion
                  </span>
                </motion.div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 relative">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                <motion.div
                  className="relative"
                  onHoverStart={() => item.submenu && setActiveSubmenu(item.name)}
                  onHoverEnd={() => item.submenu && !document.querySelector('.submenu:hover') && setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                      scrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-white/10',
                      activeSubmenu === item.name && 'text-blue-600'
                    )}
                    onClick={() => !item.submenu && setActiveSubmenu(null)}
                  >
                    <span className="relative">
                      {item.name}
                      {item.submenu && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                      )}
                    </span>
                    {item.icon && (
                      <item.icon 
                        className={cn(
                          'ml-1.5 h-4 w-4 transition-transform duration-200',
                          activeSubmenu === item.name ? 'rotate-180' : ''
                        )} 
                        aria-hidden="true" 
                      />
                    )}
                  </Link>
                  
                  {/* Submenu */}
                  {item.submenu && (
                    <div className="absolute left-0 mt-1">
                      <Submenu 
                        items={item.submenu} 
                        isOpen={activeSubmenu === item.name} 
                        onClose={() => setActiveSubmenu(null)} 
                      />
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
            
            {/* Auth Buttons / User Menu */}
            {user ? (
              <div className="relative ml-2">
                <motion.div className="flex items-center">
                  <motion.button
                    type="button"
                    className={cn(
                      'flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                      scrolled ? 'ring-offset-white' : 'ring-offset-blue-500/20'
                    )}
                    id="user-menu-button"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className={cn(
                      'h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200',
                      scrolled 
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 ring-1 ring-blue-100' 
                        : 'bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20'
                    )}>
                      <User size={20} className="shrink-0" />
                    </div>
                  </motion.button>
                  
                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div 
                        className="origin-top-right absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-2xl ring-1 ring-black/5 backdrop-blur-lg z-50 overflow-hidden"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        tabIndex={-1}
                      >
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center">
                            <div className={cn(
                              'h-10 w-10 rounded-full flex items-center justify-center text-lg font-semibold mr-3',
                              'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 ring-2 ring-white'
                            )}>
                              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                              <p className="text-xs text-gray-500 truncate">{user.email || ''}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2" role="none">
                          {userNavigation.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <motion.div 
                                key={item.name} 
                                variants={menuItemVariants}
                                className={cn(
                                  'rounded-lg',
                                  index === userNavigation.length - 1 ? 'mt-1 border-t border-gray-100 pt-1' : ''
                                )}
                              >
                                <Link
                                  href={item.href}
                                  onClick={(e) => {
                                    if (item.name === 'Sign out') {
                                      e.preventDefault();
                                      handleSignOut();
                                    }
                                    setUserMenuOpen(false);
                                  }}
                                  className={cn(
                                    'group flex items-center px-4 py-3 text-sm transition-colors duration-200',
                                    item.name === 'Sign out' 
                                      ? 'text-red-600 hover:bg-red-50' 
                                      : 'text-gray-700 hover:bg-gray-50'
                                  )}
                                  role="menuitem"
                                >
                                  <div className={cn(
                                    'p-1.5 rounded-lg mr-3',
                                    item.name === 'Sign out' 
                                      ? 'bg-red-50 text-red-500 group-hover:bg-red-100' 
                                      : 'bg-gray-50 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                                  )}>
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{item.name}</div>
                                    {item.description && (
                                      <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                                    )}
                                  </div>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-2">
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/auth/signin"
                    className={cn(
                      'group flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      scrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-white/20'
                    )}
                  >
                    <LogIn className="mr-2 h-4 w-4 flex-shrink-0" />
                    Sign in
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -1, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg opacity-90 group-hover:opacity-100 transition-opacity',
                    'shadow-lg shadow-blue-500/20',
                    'transform group-hover:-translate-y-0.5 transition-transform duration-200',
                    'group-active:translate-y-0 group-active:scale-95'
                  )}></div>
                  <Link
                    href="/auth/signup"
                    className="relative flex items-center px-5 py-2.5 text-sm font-medium text-white rounded-lg"
                  >
                    <UserPlus className="mr-2 h-4 w-4 flex-shrink-0" />
                    Sign up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'inline-flex items-center justify-center p-2 rounded-lg',
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-gray-700 hover:bg-white/20',
                'focus:outline-none focus:ring-2 focus:ring-offset-2',
                scrolled ? 'focus:ring-blue-500' : 'focus:ring-white'
              )}
              aria-expanded={isOpen}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              className="absolute top-0 right-0 w-4/5 h-full bg-white shadow-xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                <Link 
                  href="/" 
                  className="text-xl font-bold text-gray-900 flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-2 py-1 rounded-lg mr-2">
                    EX
                  </span>
                  <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    CIMAA
                  </span>
                </Link>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
              
              <div className="hidden md:flex md:items-center md:space-x-6 font-sans">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group" onMouseEnter={() => handleMouseEnter(item.name)} onMouseLeave={handleMouseLeave}>
                    <Link
                      href={item.href}
                      className={cn(
                        'relative text-[17px] font-black transition-all duration-300 font-sans',
                        isScrolled ? 'text-gray-900 hover:text-primary-600' : 'text-white hover:text-white',
                        'flex items-center gap-3 px-6 py-4 rounded-xl',
                        activeSubmenu === item.name 
                          ? 'bg-white/10 text-white' 
                          : 'hover:bg-white/5 hover:backdrop-blur-sm',
                        'group-hover:scale-[1.02] transition-all',
                        'after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-0.5 after:bg-primary-500 after:opacity-0',
                        'hover:after:opacity-100 after:transition-opacity after:duration-300',
                        'tracking-wide'
                      )}
                      onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                    >
                      {item.icon && (
                        <span className="text-primary-500 flex items-center">
                          <item.icon className="w-4.5 h-4.5 -mb-0.5" />
                        </span>
                      )}
                      <span className="font-medium tracking-wide">{item.name}</span>
                      {item.submenu && (
                        activeSubmenu === item.name 
                          ? <ChevronUp className="w-4 h-4 ml-0.5 text-gray-400" /> 
                          : <ChevronDown className="w-4 h-4 ml-0.5 text-gray-400" />
                      )}
                    </Link>
                  </div>
                ))}
              </div>
              <nav className="px-4 py-6 space-y-1 font-sans">
                {navigation.map((item) => (
                  <div key={item.name} className="mb-2">
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center justify-between px-4 py-3 rounded-lg text-[15px] font-semibold font-sans',
                        'text-gray-700 hover:bg-gray-50 hover:text-blue-600',
                        'transition-colors duration-200 tracking-wide'
                      )}
                      onClick={() => {
                        if (!item.submenu) {
                          setIsOpen(false);
                        } else {
                          setActiveSubmenu(activeSubmenu === item.name ? null : item.name);
                        }
                      }}
                    >
                      <span>{item.name}</span>
                      {item.submenu && (
                        <ChevronDown 
                          className={cn(
                            'h-4 w-4 text-gray-400 transition-transform duration-200',
                            activeSubmenu === item.name ? 'rotate-180' : ''
                          )} 
                        />
                      )}
                    </Link>
                    
                    {item.submenu && (
                      <AnimatePresence>
                        {activeSubmenu === item.name && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="absolute left-0 mt-2 w-64 origin-top-left rounded-xl bg-white/95 backdrop-blur-sm shadow-xl ring-1 ring-black/5 overflow-hidden z-50"
                          >
                            <div className="py-1.5">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="group flex items-center px-5 py-3 text-[15px] font-medium text-gray-800 hover:bg-gray-50/90 hover:text-primary-600 transition-colors duration-200"
                                >
                                  {subItem.icon && (
                                    <span className="mr-3 text-gray-400 group-hover:text-primary-500 transition-colors">
                                      <subItem.icon className="h-4.5 w-4.5" />
                                    </span>
                                  )}
                                  {subItem.name}
                                  <ChevronRight className="ml-auto h-4 w-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
          
                {/* Mobile Auth Buttons */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center px-4 py-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold mr-3">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name || 'User'}</div>
                          <div className="text-xs text-gray-500">{user.email || ''}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {userNavigation.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={(e) => {
                                if (item.name === 'Sign out') {
                                  e.preventDefault();
                                  handleSignOut();
                                }
                                setIsOpen(false);
                              }}
                              className={cn(
                                'flex items-center px-4 py-3 text-sm font-medium rounded-lg',
                                item.name === 'Sign out' 
                                  ? 'text-red-600 hover:bg-red-50' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              )}
                            >
                              <Icon className="mr-3 h-5 w-5 text-gray-400" />
                              {item.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 px-4">
                      <Link
                        href="/auth/signin"
                        className="flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="flex items-center justify-center px-4 py-2.5 border border-transparent rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        onClick={() => setIsOpen(false)}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
