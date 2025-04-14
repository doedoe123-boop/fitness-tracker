import { FaHeartbeat, FaGithub, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
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
  };

  return (
    <footer className="bg-slate-900 text-slate-400">
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
              <span className="text-xl font-semibold text-white">
                Fitness Tracker
              </span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md">
              Transform your fitness journey with our comprehensive tracking app. 
              Set goals, monitor progress, and achieve results with our intelligent fitness companion.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-brand-primary transition-colors"
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
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-slate-400 hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-sm">
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
