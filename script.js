const title = document.getElementById("title");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.querySelector(".buttons");
const lemons = document.getElementById("lemons");

let accepted = false;

// --- Bouton NON qui fuit ---
function moveNoButton() {
  if (accepted) return;

  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 10;
  const maxX = areaRect.width - btnRect.width - padding;
  const maxY = areaRect.height - btnRect.height - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);

buttonsArea.addEventListener("mousemove", (e) => {
  if (accepted) return;

  const btn = noBtn.getBoundingClientRect();
  const dx = (btn.left + btn.width / 2) - e.clientX;
  const dy = (btn.top + btn.height / 2) - e.clientY;
  const dist = Math.hypot(dx, dy);

  if (dist < 105) moveNoButton();
});

// bloquer click au cas où
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

moveNoButton();

// --- Explosion de citrons pendant 5 secondes ---
function lemonBurst(durationMs = 5000) {
  const start = Date.now();

  const tick = setInterval(() => {
    const t = Date.now() - start;
    if (t > durationMs) {
      clearInterval(tick);
      return;
    }

    // quantité par tick (ajuste ici si tu veux + ou -)
    const count = 10;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "lemon";
      el.textContent = "🍋";

      // position aléatoire dans la fenêtre
      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = `${Math.random() * 100}vh`;

      // petite variation de durée / délai
      el.style.animationDuration = `${1.05 + Math.random() * 0.6}s`;
      el.style.animationDelay = `${Math.random() * 0.12}s`;

      lemons.appendChild(el);

      // nettoyage
      setTimeout(() => el.remove(), 2000);
    }
  }, 160);

  // nettoyage final
  setTimeout(() => (lemons.innerHTML = ""), durationMs + 250);
}

yesBtn.addEventListener("click", () => {
  if (accepted) return;
  accepted = true;

  document.body.classList.add("yes-mode");

  // fondu sortant
  title.classList.add("fade-out");

  // change le texte après le fondu
  setTimeout(() => {
    title.textContent = "Moi aussi, je te citron de tout le monde de tout l’univers.";
    title.classList.remove("fade-out");
  }, 430);

  // option : cacher le Non après oui
  noBtn.style.display = "none";

  // explosions de citrons
  lemonBurst(5000);
});
