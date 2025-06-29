import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  hover?: boolean;
}

export function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  hover = true 
}: AnimatedCardProps) {
  const directionVariants = {
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 },
    left: { x: 20, opacity: 0 },
    right: { x: -20, opacity: 0 }
  };

  return (
    <motion.div
      initial={directionVariants[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={hover ? { 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ 
  children, 
  className = '', 
  onClick,
  disabled = false,
  variant = 'primary'
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}) {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 shadow-lg hover:shadow-xl",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </motion.button>
  );
}

export function AnimatedList({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { 
              y: 0, 
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function AnimatedCounter({ 
  value, 
  duration = 2,
  className = '' 
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <motion.span
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.2
        }}
      >
        {value.toLocaleString()}
      </motion.span>
    </motion.span>
  );
}

export function AnimatedProgress({ 
  progress, 
  className = '',
  color = 'bg-blue-500' 
}: {
  progress: number;
  className?: string;
  color?: string;
}) {
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut",
          delay: 0.3
        }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  );
}