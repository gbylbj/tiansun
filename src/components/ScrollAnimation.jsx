import React, { useEffect, useRef, useState } from 'react';

const ScrollAnimation = ({ children, animation = 'fade-up', delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const animationClasses = {
    'fade-up': isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10',
    'fade-left': isVisible ? 'animate-fade-left' : 'opacity-0 -translate-x-10',
    'fade-right': isVisible ? 'animate-fade-right' : 'opacity-0 translate-x-10',
    'scale-up': isVisible ? 'animate-scale-up' : 'opacity-0 scale-95',
    'none': ''
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${animationClasses[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;