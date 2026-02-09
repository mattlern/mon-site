const title = document.getElementById("title");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.querySelector(".buttons");

yesBtn.addEventListener("click", () => {
  title.textContent = "Moi aussi, je te citerai de tout l'univers, de tout le monde.";
  // Optionnel: cacher les boutons après le oui
  // buttonsArea.style.display = "none";
});

// Empêche le "Non" d'être cliquable (au cas où)
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

// Déplacement aléatoire du bouton "Non" quand la souris s'approche / survole
function moveNoButton() {
  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 10; // marge pour éviter de sortir
  const maxX = areaRect.width - btnRect.width - padding;
  const maxY = areaRect.height - btnRect.height - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Survol direct
noBtn.addEventListener("mouseenter", moveNoButton);

// "S'approcher" : dès que la souris bouge dans la zone, si elle est proche du bouton -> il fuit
buttonsArea.addEventListener("mousemove", (e) => {
  const btn = noBtn.getBoundingClientRect();
  const dx = (btn.left + btn.width / 2) - e.clientX;
  const dy = (btn.top + btn.height / 2) - e.clientY;
  const dist = Math.hypot(dx, dy);

  // distance de déclenchement (augmente si tu veux qu'il fuie plus tôt)
  if (dist < 90) moveNoButton();
});

// Placement initial un peu aléatoire
moveNoButton();
