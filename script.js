
/* ========================================
   SWEET SCOOP - WEBSITE JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", function () {

  // 1. Automatic Copyright Year
  document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  // 2. Mobile Navigation Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close the menu after selecting a link
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });

    // Close the menu when clicking outside it
    document.addEventListener("click", function (event) {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      }
    });

    // Close the menu when switching to desktop width
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      }
    });
  }


  // 3. Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    const emailInput = document.getElementById("newsletter-email");
    const formMessage = newsletterForm.querySelector(".form-message");
    const submitButton = newsletterForm.querySelector(
      'button[type="submit"]'
    );

    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!emailInput || !emailInput.checkValidity()) {
        if (emailInput) {
          emailInput.reportValidity();
        }
        return;
      }

      if (formMessage) {
        formMessage.textContent =
          "Thank you for your interest in Sweet Scoop! 🍦 " +
          "This demo form does not send subscriptions yet.";
        formMessage.setAttribute("role", "status");
      }

      if (submitButton) {
        submitButton.textContent = "Thank you! ♥";
      }

      newsletterForm.reset();
    });

    if (emailInput && formMessage) {
      emailInput.addEventListener("input", function () {
        formMessage.textContent = "";

        if (submitButton) {
          submitButton.textContent = "Count me in →";
        }
      });
    }
  }


  // 4. Smooth Scrolling for Same-Page Links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // 5. Simple Scroll Reveal Animation
  const revealElements = document.querySelectorAll(
    ".benefit, .product-card, .story-copy, " +
    ".quote-section, .newsletter"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(function (element) {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }


  // 6. Footer Social Link Safety
  document.querySelectorAll(".social-links a").forEach(function (link) {
    link.setAttribute("rel", "noopener noreferrer");
  });

});
