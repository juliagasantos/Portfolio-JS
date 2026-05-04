// ===== HEADER AO ROLAR =====
function ativarHeaderScroll() {
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("ativo");
        } else {
            header.classList.remove("ativo");
        }
    });
}


// ===== SCROLL SUAVE =====
function scrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const id = link.getAttribute("href");

            if (id.startsWith("#")) {
                e.preventDefault();

                const section = document.querySelector(id);

                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}


// ===== ANIMAÇÃO AO SURGIR =====
function animarScroll() {
    const elementos = document.querySelectorAll("section, .card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    elementos.forEach(el => observer.observe(el));
}


// ===== MENU ATIVO =====
function menuAtivo() {
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const top = window.scrollY;
            const offset = section.offsetTop - 100;
            const height = section.offsetHeight;

            if (top >= offset && top < offset + height) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("ativo");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("ativo");
            }
        });
    });
}


// ===== EFEITO NOS CARDS =====
function efeitoCards() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform = `
                perspective(1000px)
                rotateX(${-(y - rect.height / 2) / 20}deg)
                rotateY(${(x - rect.width / 2) / 20}deg)
                scale(1.03)
            `;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
        });
    });
}

// ===== btn topo =====
function botaoTopo() {
    const btn = document.getElementById("btnTopo");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ===== habilidades =====
function habilidadesLoop() {
    const linha1 = document.querySelector(".linha1");
    const linha2 = document.querySelector(".linha2");

    if (!linha1 || !linha2) return;

    const itens = linha1.innerHTML;

    linha1.innerHTML = itens + itens;
    linha2.innerHTML = itens + itens;
}

document.addEventListener("DOMContentLoaded", () => {
    habilidadesLoop();
});
// ===== INICIAR TUDO =====
document.addEventListener("DOMContentLoaded", () => {
    ativarHeaderScroll();
    scrollSuave();
    animarScroll();
    menuAtivo();
    efeitoCards();
    botaoTopo();
});

