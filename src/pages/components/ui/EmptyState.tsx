import { motion } from "framer-motion";
import { ReactNode } from "react";
import { FaExclamationCircle, FaInbox, FaPlus } from "react-icons/fa";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  type?: "default" | "error" | "no-data";
}

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action, 
  type = "default" 
}: EmptyStateProps) => {
  const getDefaultIcon = () => {
    switch (type) {
      case "error":
        return <FaExclamationCircle className="w-12 h-12 text-red-400" />;
      case "no-data":
        return <FaInbox className="w-12 h-12 text-gray-400" />;
      default:
        return <FaPlus className="w-12 h-12 text-gray-400" />;
    }
  };

  return (
    <motion.div 
      className="text-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {icon || getDefaultIcon()}
      </motion.div>
      
      <motion.h3 
        className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </motion.p>
      
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
