import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
}

const searchData: SearchResult[] = [
  {
    id: "1",
    title: "Start Workout",
    description: "Begin your fitness journey today",
    path: "/work-out-now",
    category: "Action"
  },
  {
    id: "2", 
    title: "Dashboard",
    description: "View your progress and stats",
    path: "/dashboard",
    category: "Navigation"
  },
  {
    id: "3",
    title: "Fitness Tips",
    description: "Expert advice for better workouts",
    path: "/fitness-tips",
    category: "Content"
  },
  {
    id: "4",
    title: "Diet Tips", 
    description: "Nutrition guidance for optimal health",
    path: "/diet-tips",
    category: "Content"
  },
  {
    id: "5",
    title: "Health News",
    description: "Latest health and fitness updates",
    path: "/news",
    category: "Content"
  },
  {
    id: "6",
    title: "Profile Settings",
    description: "Manage your account preferences",
    path: "/profile",
    category: "Settings"
  }
];

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleNavigate(results[selectedIndex].path);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
    setQuery("");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white dark:bg-dark-secondary rounded-xl shadow-2xl w-full max-w-2xl mx-4"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            {/* Search Input */}
            <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <FaSearch className="text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search workouts, tips, pages..."
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none text-lg"
              />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2"
              >
                <FaTimes />
              </button>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {query.trim() && results.length === 0 && (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No results found for "{query}"
                </div>
              )}
              
              {results.map((result, index) => (
                <motion.button
                  key={result.id}
                  onClick={() => handleNavigate(result.path)}
                  className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-dark-accent transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                    selectedIndex === index ? 'bg-teal-50 dark:bg-teal-900/20' : ''
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {result.description}
                      </p>
                    </div>
                    <span className="text-xs text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30 px-2 py-1 rounded ml-4">
                      {result.category}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Quick Actions */}
            {!query.trim() && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleNavigate("/work-out-now")}
                    className="p-3 text-left bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                    aria-label="Start Workout - Begin exercising now"
                  >
                    <div className="font-medium text-teal-700 dark:text-teal-300">
                      Start Workout
                    </div>
                    <div className="text-sm text-teal-600 dark:text-teal-400">
                      Begin exercising now
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavigate("/dashboard")}
                    className="p-3 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    aria-label="View Progress - Check your stats"
                  >
                    <div className="font-medium text-blue-700 dark:text-blue-300">
                      View Progress
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">
                      Check your stats
                    </div>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
