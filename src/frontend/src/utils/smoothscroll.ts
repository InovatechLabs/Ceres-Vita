export const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const navbarHeight = document.querySelector('nav')?.clientHeight || 0; 
      const targetPosition = targetElement.offsetTop - navbarHeight + 150; 
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1300;
  
      let start: number | null = null;
  
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
      };
  
      window.requestAnimationFrame(step);
  
      function easeInOutCubic(t: number, b: number, c: number, d: number): number {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      }
    }
  };