const allImages = [
  { url: "https://creapills.com/wp-content/uploads/2022/10/dall-e-gratuit-intelligence-artificielle-2.jpg", category: "Natural",title: "Nature 1" },
  { url: "https://th.bing.com/th/id/OIP.G7UwbMqspP1-JVYThRRA6wHaEP?w=626&h=358&rs=1&pid=ImgDetMain", category: "Natural" ,title: "Nature 1"},
  { url: "https://www.creativefabrica.com/wp-content/uploads/2023/04/05/futuristic-sports-car-Modern-car-Graphics-66298981-1.jpeg", category: "Cars" ,title: "car 1"},
  { url: "https://www.creativefabrica.com/wp-content/uploads/2023/04/06/futuristic-sports-car-Modern-car-Graphics-66382336-1.jpeg", category: "Cars" ,title: "car 2"},
  { url: "https://th.bing.com/th/id/OIP.sg1kSXr1eAnOx0Arm01b7QHaEJ?w=626&h=351&rs=1&pid=ImgDetMain", category: "Natural" ,title: "Nature 3"},
  { url: "https://www.creativefabrica.com/wp-content/uploads/2023/04/05/futuristic-sports-car-Modern-car-digita-Graphics-66300143-1.jpeg", category: "Cars",title: "Car 3" },
  { url: "https://kaizenaire.com/wp-content/uploads/2023/09/The-Future-of-Luxury-Cars-singapore.png", category: "Cars",title: "Car 4" }
];

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

let currentIndex = 0;
let currentCategory = "All";
let filteredImages = [];

const track = document.getElementById("carouselTrack");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

function setCategory(category) {
  currentCategory = category;
  currentIndex = 0;
  filterImages();
  renderImages();
  updatePosition();
  updateActiveButton();
  renderDots();
}

function filterImages() {
  filteredImages = currentCategory === "All"
    ? allImages
    : allImages.filter(img => img.category === currentCategory);
}

function renderImages() {
  track.innerHTML = "";
  filteredImages.forEach(img => {
    const div = document.createElement("div");
    div.className = "image-box";

    const image = document.createElement("img");
    image.src = img.url;

    const title = document.createElement("div");
    title.className = "image-title";
    title.textContent = img.title;

    div.appendChild(image);
    div.appendChild(title);
    track.appendChild(div);
  });
}

function updateActiveButton() {
  const buttons = document.querySelectorAll(".filter-buttons button");
  buttons.forEach(btn => {
    btn.classList.toggle("active", btn.textContent === currentCategory);
  });
}

function updatePosition() {
  const imageWidth = 245; // image + gap
  track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

  leftBtn.disabled = currentIndex === 0;
  rightBtn.disabled = currentIndex >= filteredImages.length - 4;

  renderDots(); // 🔴 ensure this is here
}


leftBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updatePosition();
  }
});

rightBtn.addEventListener("click", () => {
  if (currentIndex < filteredImages.length - 4) {
    currentIndex++;
    updatePosition();
  }
});

function renderDots() {
  const dotsContainer = document.getElementById("paginationDots");
  dotsContainer.innerHTML = "";

  const totalPages = Math.ceil(filteredImages.length / 4);
  const currentPage = Math.floor(currentIndex / 4);

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("button");
    if (i === currentPage) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentIndex = i * 4;  // Jump to that page's first image
      updatePosition();
    });
    dotsContainer.appendChild(dot);
  }
}


// Init
setCategory("All");