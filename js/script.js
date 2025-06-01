const slides = document.querySelectorAll('.slide');
    let current = 0;
    const interval = 6000; // 4 seconds

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
      });
    }

    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }

    // Initial show
    showSlide(current);
    setInterval(nextSlide, interval);