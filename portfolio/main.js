document.getElementById("y").textContent = new Date().getFullYear();
const root = document.documentElement;
document.getElementById("theme").addEventListener("click", () => {
  const dark = getComputedStyle(root).getPropertyValue("--bg").trim() === "#0b1020";
  const next = dark ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 }) : null;
document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));
