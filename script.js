const faqs = [
  { categoria: "Objeção", texto: "Está caro – Temos opções para todos os bolsos." },
  { categoria: "Fluxo do dia", texto: "Bom dia! Hoje temos reunião às 10h." },
  { categoria: "Parabéns", texto: "Parabéns pela conquista!" },
  { categoria: "Encerramento", texto: "Estamos encerrando o grupo agora." },
];

const faqContainer = document.getElementById('faqContainer');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.getElementById('filterButtons');

const categorias = ["Todas", ...new Set(faqs.map(f => f.categoria))];

categorias.forEach(categoria => {
  const btn = document.createElement("button");
  btn.textContent = categoria;
  btn.onclick = () => {
    document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderFaqs(categoria, searchInput.value.toLowerCase());
  };
  if (categoria === "Todas") btn.classList.add("active");
  filterButtons.appendChild(btn);
});

searchInput.addEventListener("input", () => {
  const cat = document.querySelector(".filters button.active").textContent;
  renderFaqs(cat, searchInput.value.toLowerCase());
});

function renderFaqs(categoria, query) {
  faqContainer.innerHTML = '';
  faqs
    .filter(f => (categoria === "Todas" || f.categoria === categoria))
    .filter(f => f.texto.toLowerCase().includes(query))
    .forEach(f => {
      const card = document.createElement("div");
      card.className = "faq-card";
      card.innerHTML = `<div class="faq-category">${f.categoria}</div><div>${f.texto}</div>`;
      faqContainer.appendChild(card);
    });
}

renderFaqs("Todas", "");