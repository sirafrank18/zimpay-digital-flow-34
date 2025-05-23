
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface SimpleThanosEffectProps {
  children: React.ReactNode;
  onComplete?: () => void;
  duration?: number;
  active?: boolean;
  className?: string;
}

const SimpleThanosEffect: React.FC<SimpleThanosEffectProps> = ({
  children,
  onComplete,
  duration = 1500,
  active = false,
  className,
}) => {
  const [isDisintegrating, setIsDisintegrating] = useState(false);

  useEffect(() => {
    if (active && !isDisintegrating) {
      setIsDisintegrating(true);
      
      // Call onComplete callback after animation finishes
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active, duration, onComplete, isDisintegrating]);

  return (
    <div className={cn(
      "relative overflow-hidden",
      isDisintegrating && "thanos-disintegration",
      className
    )}
    style={isDisintegrating ? { animationDuration: `${duration}ms` } : {}}
    >
      {children}
    </div>
  );
};

export default SimpleThanosEffect;
