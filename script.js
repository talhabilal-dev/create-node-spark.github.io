// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + (target === 100 ? "%" : "");
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + (target === 100 ? "%" : "");
      }
    }, 16);
  });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".stats");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statsObserver.observe(statsSection);

// Copy code functionality
function copyCode(button) {
  const code = button.nextElementSibling.textContent;
  navigator.clipboard
    .writeText(code)
    .then(() => {
      const originalText = button.textContent;
      button.textContent = "Copied!";
      button.style.background = "#48bb78";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "#667eea";
      }, 2000);
    })
    .catch(() => {
      button.textContent = "Failed to copy";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 2000);
    });
}

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

// Particle animation
function createParticle() {
  const particles = document.getElementById("particles");
  if (!particles) return;

  const particle = document.createElement("div");
  particle.classList.add("particle");

  const size = Math.random() * 4 + 2;
  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = Math.random() * 3 + 3 + "s";
  particle.style.animationDelay = Math.random() * 2 + "s";

  particles.appendChild(particle);

  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 6000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Feature card hover effects
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any open modals or overlays
  }
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}

window.addEventListener("scroll", requestTick);

// Add click animation to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(rippleStyle);
