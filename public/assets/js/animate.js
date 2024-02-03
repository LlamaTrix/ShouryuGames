document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.animate');
    const windowHeight = window.innerHeight;
  
    elements.forEach(function(element) {
      const distanceFromTop = element.getBoundingClientRect().top;
  
      if (distanceFromTop - windowHeight <= 0) {
        element.classList.add('animate-on-scroll');
      }
    });
  });
  

window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.animate');
    const windowHeight = window.innerHeight;
  
    elements.forEach(function(element) {
      const distanceFromTop = element.getBoundingClientRect().top;
  
      if (distanceFromTop - windowHeight <= 0) {
        element.classList.add('animate-on-scroll');
      }
    });
  });

