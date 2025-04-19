import { FaHeartbeat, FaGithub, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', path: '/#features' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Download', path: '/download' },
      { label: 'About', path: '/about' },
    ],
    resources: [
      { label: 'Health Tips', path: '/health-importance' },
      { label: 'Fitness Guide', path: '/fitness-tips' },
      { label: 'Diet Tips', path: '/diet-tips' },
      { label: 'Blog', path: '/blog' },
    ],
    legal: [
      { label: 'Privacy', path: '/privacy' },
      { label: 'Terms', path: '/terms' },
      { label: 'License', path: '/license' },
    ],
    social: [
      { label: 'GitHub', icon: <FaGithub />, url: 'https://github.com' },
      { label: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com' },
      { label: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com' },
      { label: 'YouTube', icon: <FaYoutube />, url: 'https://youtube.com' },
    ],
    contact: [
      { icon: <FaPhone />, label: "Contact Us", value: "+1 (888) 123-4567", url: "tel:+18881234567" },
      { icon: <FaEnvelope />, label: "Email Us", value: "support@fitnesses.lifestyle", url: "mailto:support@fitnesses.lifestyle" },
      { icon: <FaMapMarkerAlt />, label: "Visit Us", value: "123 Fitness Street, Health City, HC 12345", url: "https://maps.google.com" },
    ]
  };

  return (
    <footer className="bg-slate-900 dark:bg-dark-primary text-slate-400">
      {/* Contact Banner */}
      <div className="bg-brand-primary dark:bg-dark-accent">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3 text-white dark:text-slate-200">
              <FaPhone className="text-xl" />
              <span className="font-medium">Need Help? Call Us: +1 (888) 123-4567</span>
            </div>
            <a 
              href="mailto:support@fitnesses.lifestyle"
              className="inline-flex items-center space-x-2 text-white dark:text-slate-200 hover:text-white/90 transition-colors"
            >
              <FaEnvelope />
              <span>support@fitnesses.lifestyle</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaHeartbeat className="text-2xl text-brand-primary" />
              </motion.div>
              <span className="text-xl font-semibold text-white dark:text-slate-200">
                Fitness Tracker
              </span>
            </Link>
            <p className="text-slate-400 dark:text-slate-500 mb-6 max-w-md">
              Transform your fitness journey with our comprehensive tracking app. 
              Set goals, monitor progress, and achieve results with our intelligent fitness companion.
            </p>

            {/* Contact Information */}
            <div className="space-y-4 mb-6">
              {footerLinks.contact.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="flex items-start space-x-3 text-slate-400 dark:text-slate-500 hover:text-brand-primary dark:hover:text-brand-primary transition-colors group"
                >
                  <span className="mt-1">{item.icon}</span>
                  <div>
                    <span className="block text-sm font-medium text-slate-300 dark:text-slate-400">{item.label}</span>
                    <span className="group-hover:text-brand-primary transition-colors">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex space-x-4">
              {footerLinks.social.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 dark:text-slate-500 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-white dark:text-slate-200 font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-slate-400 dark:text-slate-500 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white dark:text-slate-200 font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-slate-400 dark:text-slate-500 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white dark:text-slate-200 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-slate-400 dark:text-slate-500 hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 dark:border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                &copy; {currentYear} Fitness Tracker. All rights reserved.
              </p>
            </div>
            <div className="text-sm md:text-right">
              <p>
                Built with care by{' '}
                <a 
                  href="https://github.com" 
                  className="text-brand-primary hover:text-brand-primary-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fitness Tracker Team
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
