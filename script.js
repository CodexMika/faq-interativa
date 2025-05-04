const faqs = [
  {
    categoria: "Parabéns",
    texto: `Parabéns pela sua conquista!!! 🎉
Você deu um importante passo para ter uma vida com mais saúde e vitalidade.`
  },
  {
    categoria: "Objeção",
    texto: `Está caro (suplementos)

Entendo, temos diversos pacotes, justamente para caber em todo tipo de orçamento, nossa matéria-prima é toda natural...`
  },
  {
    categoria: "Dona Vita",
    texto: `Mensagem padrão:

Olá, tudo bem? Eu sou a [seu nome]. Nosso suporte é exclusivo pelo WhatsApp, lá todas as conversas ficam registradas...

Clique no link para ser atendido agora: https://lp.vita-science.com/AtendimentoVITA2.0`
  }
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
    .forEach((f, index) => {
      const id = `text-${index}`;
      const card = document.createElement("div");
      card.className = "faq-card";
      card.innerHTML = `
        <div class="faq-category">${f.categoria}</div>
        <div class="faq-text" id="${id}">${f.texto}</div>
        <button class="copy-button" onclick="copyText('${id}')">Copy</button>
      `;
      faqContainer.appendChild(card);
    });
}

function copyText(elementId) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("Mensagem copiada!");
  });
}

renderFaqs("Todas", "");