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

  if (dist < 100) moveNoButton();
});

// bloquer click au cas où
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

moveNoButton();

// --- Effet “OUI” : fondu + citrons ---
function spawnLemons(durationMs = 5000) {
  const start = Date.now();
  const interval = setInterval(() => {
    const elapsed = Date.now() - start;
    if (elapsed > durationMs) {
      clearInterval(interval);
      return;
    }

    // crée quelques citrons par “tick”
    for (let i = 0; i < 6; i++) {
      const el = document.createElement("div");
      el.className = "lemon";
      el.textContent = "🍋";

      el.style.left = `${Math.random() * 100}vw`;
      el.style.top = `-40px`;
      el.style.animationDelay = `${Math.random() * 0.4}s`;
      el.style.animationDuration = `${4.2 + Math.random() * 1.2}s`;

      lemons.appendChild(el);

      // nettoyage après animation
      setTimeout(() => el.remove(), 6500);
    }
  }, 180);

  // nettoyage complet au bout du temps
  setTimeout(() => {
    lemons.innerHTML = "";
  }, durationMs + 700);
}

yesBtn.addEventListener("click", () => {
  if (accepted) return;
  accepted = true;

  document.body.classList.add("yes-mode");

  // fondu sortant
  title.classList.add("fade-out");

  // après le fondu, change le texte et refait un fondu entrant
  setTimeout(() => {
    title.textContent = "moi aussi, je te citron de tout le monde de tout l’univers";
    title.classList.remove("fade-out");
  }, 430);

  // option: désactiver le “Non” après oui
  noBtn.style.display = "none";

  // citrons pendant 5 secondes
  spawnLemons(5000);
});
