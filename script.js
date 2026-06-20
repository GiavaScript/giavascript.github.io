const rays = document.getElementById("rays");
for (let i = 0; i < 36; i += 1) {
  const ray = document.createElement("i");
  ray.style.setProperty("--rot", `${i * 10}deg`);
  ray.style.setProperty("--delay", `${i * 65}ms`);
  rays.appendChild(ray);
}

const cards = document.querySelectorAll(".card");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 90}ms`;
  io.observe(card);
});
