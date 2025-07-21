
import React from "react";

const SuvatGroupFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-center items-center">
          <span className="text-xs text-muted-foreground">
            Powered by{" "}
            <a 
              href="#" 
              className="text-primary hover:text-primary/80 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              SuvatGroup
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SuvatGroupFooter;
