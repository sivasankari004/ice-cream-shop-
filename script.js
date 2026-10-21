document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    }));
  }

  // Current year in all footers
  document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

  // Category filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".catalog-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => item.classList.toggle("active", item === button));
      cards.forEach(card => {
        card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
      });
    });
  });

  // Contact form demo: validates inputs and shows a friendly confirmation.
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const message = contactForm.querySelector(".form-message");
      message.textContent = "Thanks for reaching out! This demo form is working in your browser, but needs a backend to send your message.";
      contactForm.reset();
    });
  }

  // Newsletter demo
  const newsletterForm = document.querySelector("#newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", event => {
      event.preventDefault();
      const message = newsletterForm.querySelector(".form-message");
      message.textContent = "You're on the list! (Demo only — connect an email service for real subscriptions.)";
      newsletterForm.reset();
    });
  }
});