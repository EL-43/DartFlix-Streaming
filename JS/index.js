// Loading screen
window.addEventListener("load", () => {
  document.getElementById("loading").style.display = "none";
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Search functionality
function toggleSearch() {
  const searchOverlay = document.getElementById("searchOverlay");
  const searchInput = document.getElementById("searchInput");

  if (searchOverlay.style.display === "flex") {
    searchOverlay.style.display = "none";
  } else {
    searchOverlay.style.display = "flex";
    searchInput.focus();
  }
}

// Close search when clicking outside
document
  .getElementById("searchOverlay")
  .addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      toggleSearch();
    }
  });

// Search input functionality
document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const results = document.getElementById("searchResults");

  if (query.length > 0) {
    // Mock search results
    const mockResults = [
      "Action Blockbuster",
      "Drama Series",
      "Fantasy Epic",
      "Anime Collection",
      "Superhero Chronicles",
      "Space Odyssey",
    ].filter((item) => item.toLowerCase().includes(query));

    results.innerHTML = mockResults
      .map(
        (result) =>
          `<div style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); cursor: pointer;">${result}</div>`
      )
      .join("");
  } else {
    results.innerHTML = "";
  }
});

// Video player functionality
function playVideo() {
  const videoOverlay = document.getElementById("videoOverlay");
  videoOverlay.style.display = "flex";
}

function closeVideo() {
  const videoOverlay = document.getElementById("videoOverlay");
  const video = document.getElementById("mainVideo");
  videoOverlay.style.display = "none";
  video.pause();
}

// Close video when clicking outside
document.getElementById("videoOverlay").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeVideo();
  }
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all content cards and sections
document
  .querySelectorAll(".content-card, .feature-item, .fade-in")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.6s ease-out";
    observer.observe(element);
  });

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any open overlays
    document.getElementById("searchOverlay").style.display = "none";
    closeVideo();
  }
  if (e.key === "/" && !e.target.matches("input")) {
    e.preventDefault();
    toggleSearch();
  }
});

// Mobile menu toggle (if needed)
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}
