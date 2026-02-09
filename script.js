// Année auto
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

burger?.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(isOpen));
});

// Formulaire -> ouvre l'app mail (mailto)
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  const subject = encodeURIComponent(`Contact - ${name}`);
  const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.location.href = `mailto:contact@monsite.com?subject=${subject}&body=${body}`;
});