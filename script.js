const cards = Array.from(document.querySelectorAll(".profile-card"));
let activeCard = cards.find((card) => card.classList.contains("active"));

const updateAriaState = () => {
  cards.forEach((card) => {
    const expanded = card.classList.contains("active");
    card.setAttribute("aria-expanded", expanded.toString());
  });
};

const activateCard = (nextCard) => {
  if (!nextCard || nextCard === activeCard) return;
  if (activeCard) {
    activeCard.classList.remove("active");
    activeCard.style.removeProperty("transform");
  }
  nextCard.classList.add("active");
  activeCard = nextCard;
  updateAriaState();
};

cards.forEach((card) => {
  card.addEventListener("click", () => activateCard(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateCard(card);
    }
  });
});

// Subtle hover tilt to mimic floating effect
cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left - bounds.width / 2;
    const offsetY = event.clientY - bounds.top - bounds.height / 2;
    card.style.setProperty("--tiltX", `${(-offsetY / bounds.height) * 6}deg`);
    card.style.setProperty("--tiltY", `${(offsetX / bounds.width) * 6}deg`);
    if (!card.classList.contains("active")) return;
    card.style.transform = `translate(-50%, -50%) translateY(-60px) scale(1.02) rotateX(${(-offsetY / bounds.height) * 4}deg) rotateY(${(offsetX / bounds.width) * 4}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--tiltX");
    card.style.removeProperty("--tiltY");
    if (card.classList.contains("active")) {
      card.style.transform = "";
    }
  });
});

updateAriaState();
