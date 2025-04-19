const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function () {
      let scrollY = window.scrollY;
      let zoomOut = 150 - scrollY / 5;
      if (zoomOut < 100) zoomOut = 100;
      document.querySelector('.background').style.backgroundSize = zoomOut + "%";

      if (scrollY > 300) {
        navbar.classList.add('visible');
        scrollToTopBtn.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
        scrollToTopBtn.classList.remove('visible');
      }
    });

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
