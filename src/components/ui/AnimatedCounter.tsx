import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  format?: (value: number) => string;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  duration = 2, 
  format = (val) => val.toLocaleString(),
  className 
}: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Spring physics for the counter
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
    duration: duration * 1000
  });

  // Format the spring value to a string
  const displayValue = useTransform(spring, (current) => format(Math.round(current)));

  useEffect(() => {
    spring.set(value);
    setHasAnimated(true);
  }, [value, spring]);

  return (
    <motion.span className={className}>
      {hasAnimated ? displayValue : format(0)}
    </motion.span>
  );
}
