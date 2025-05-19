import {
  openFullscreen,
  closeFullscreen,
  accordion,
  abrirAccordionHome,
} from "./animacoes.js";

async function carregarPagina(caminho) {
  try {
    const resposta = await fetch(caminho);
    if (!resposta.ok) throw new Error(`Erro ao carregar: ${resposta.status}`);

    const html = await resposta.text();
    const conteudoDiv = document.getElementById("pagina");
    conteudoDiv.innerHTML = html;

    await new Promise((resolve) => setTimeout(resolve, 0));

    accordion();

    const imagem = conteudoDiv.querySelector(".image-info");
    if (imagem) {
      imagem.addEventListener("click", () => {
        openFullscreen(imagem.src);
      });
    }

    // Aguarda uma pequena pausa para garantir que os DOMs estejam processados
    await new Promise((resolve) => setTimeout(resolve, 100)); // <-- adiciona isso

    return true; // sucesso!
  } catch (erro) {
    console.error("Erro ao carregar a página:", erro);
    document.getElementById("pagina").innerHTML =
      "<p>Erro ao carregar página.</p>";
    return false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const lis = document.querySelectorAll("li.card_liHome");

  lis.forEach((li) => {
    li.addEventListener("click", function (e) {
      const link = li.querySelector("a.carregar-pagina");
      if (link) {
        e.preventDefault();

        const href = link.getAttribute("href");
        const targetId = href.split("#")[1];
        const caminho = href.split("#")[0];

        carregarPagina(caminho).then(() => {
          if (targetId) {
            const tryClick = () => {
              const target = document.getElementById(targetId);
              if (target) {
                requestAnimationFrame(() => {
                  target.click();
                });
              } else {
                setTimeout(tryClick, 50);
              }
            };
            tryClick();
          }
        });
      }
    });
  });
});

window.openFullscreen = openFullscreen;
window.closeFullscreen = closeFullscreen;
window.carregarPagina = carregarPagina;
window.accordion = accordion;
window.abrirAccordionHome = abrirAccordionHome;
export { carregarPagina };
