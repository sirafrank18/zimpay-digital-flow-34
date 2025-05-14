
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

document.addEventListener('DOMContentLoaded', () => {
  const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('[data-animate="true"]');
    
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementHeight = element.getBoundingClientRect().height;
      
      if (elementTop < window.innerHeight - elementHeight / 2) {
        element.classList.remove('opacity-0', 'translate-y-10');
        element.classList.add('opacity-100', 'translate-y-0');
      }
    });
  };
  
  // Initial check in case elements are already in viewport
  setTimeout(animateOnScroll, 100);
  
  // Add scroll event listener
  window.addEventListener('scroll', animateOnScroll);
});

createRoot(document.getElementById("root")!).render(<App />);
