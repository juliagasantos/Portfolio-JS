// ===== ANIMAÇÃO AO ENTRAR NA TELA =====
function animarProjetos() {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, i * 120);
            }
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));
}


// ===== PESQUISA =====
function buscaProjetos() {
    const input = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".card");

    if (!input || cards.length === 0) return;
    const normalizar = (texto) => {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    let mensagem = document.querySelector(".sem-resultados");

    if (!mensagem) {
        mensagem = document.createElement("p");
        mensagem.classList.add("sem-resultados");
        mensagem.textContent = "Nenhum projeto encontrado";
        mensagem.style.display = "none";

        document.querySelector(".projetos").after(mensagem);
    }

    input.addEventListener("input", () => {
        const valor = normalizar(input.value.trim());
        let visiveis = 0;

        cards.forEach(card => {
            const texto = normalizar(card.innerText);

            if (texto.includes(valor)) {
                card.style.display = ""; 
                visiveis++;
            } else {
                card.style.display = "none";
            }
        });

        mensagem.style.display = visiveis === 0 ? "block" : "none";
    });
}


// ===== EFEITO 3D SUAVE =====
function efeito3D() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = -(y - rect.height / 2) / 40;
            const rotateY = (x - rect.width / 2) / 40;

            card.style.transform = `
                perspective(800px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
            `;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
        });
    });
}


// ===== CLICK NO CARD INTEIRO =====
function cardClicavel() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const link = card.querySelector("a");

        card.addEventListener("click", (e) => {
            if (e.target.tagName !== "A") {
                link.click();
            }
        });
    });
}


// ===== MICRO FEEDBACK NO BOTÃO =====
function efeitoClickLink() {
    const links = document.querySelectorAll(".card a");

    links.forEach(link => {
        link.addEventListener("click", () => {
            link.classList.add("clicked");

            setTimeout(() => {
                link.classList.remove("clicked");
            }, 300);
        });
    });
}


// ===== INICIAR =====
document.addEventListener("DOMContentLoaded", () => {
    animarProjetos();
    buscaProjetos();
    efeito3D();
    cardClicavel();
    efeitoClickLink();
});