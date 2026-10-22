
document.addEventListener("DOMContentLoaded", () => {
  // Current year in all footers
  document.querySelectorAll(".year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Mobile navigation menu
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });
  }

  // Product category filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(
    ".product-grid .product-card[data-category]"
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      productCards.forEach((card) => {
        const matches =
          filter === "all" || card.dataset.category === filter;

        card.classList.toggle("hidden", !matches);
      });
    });
  });

  // Demo shopping cart
  const cart = new Map();
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearCart = document.getElementById("clear-cart");

  function renderCart() {
    if (!cartItems || !cartTotal) return;

    cartItems.replaceChildren();
    let total = 0;

    if (cart.size === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.textContent = "Your cart is empty.";
      cartItems.appendChild(emptyMessage);
    }

    cart.forEach((item, name) => {
      total += item.price * item.quantity;

      const li = document.createElement("li");
      li.textContent =
        `${name} — ₹${item.price} × ${item.quantity} `;

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.className = "add-btn";
      removeButton.setAttribute(
        "aria-label",
        `Remove ${name} from cart`
      );

      removeButton.addEventListener("click", () => {
        cart.delete(name);
        renderCart();
      });

      li.appendChild(removeButton);
      cartItems.appendChild(li);
    });

    cartTotal.textContent = `₹${total}`;
  }

  document.querySelectorAll(".add-btn[data-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.product;
      const price = Number(button.dataset.price);

      if (!name || !Number.isFinite(price) || price < 0) return;

      const existing = cart.get(name);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.set(name, { price, quantity: 1 });
      }

      renderCart();

      const originalText = button.textContent;
      button.textContent = "Added ✓";

      window.setTimeout(() => {
        button.textContent = originalText;
      }, 900);
    });
  });

  if (clearCart) {
    clearCart.addEventListener("click", () => {
      cart.clear();
      renderCart();
    });
  }

  // Contact form validation (demo only)
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      formMessage.textContent =
        "Thank you! Your demo message has been validated. No email was sent.";
      contactForm.reset();
    });
  }
});
