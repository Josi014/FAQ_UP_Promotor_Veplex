import {openFullscreen, closeFullscreen, accordion } from './animacoes.js';


async function carregarPagina(caminho) {
  try {
    const resposta = await fetch(caminho);
    if(!resposta.ok) throw new Error(`Erro ao carregar: ${resposta.status}`);

    const html = await resposta.text();
    const conteudoDiv = document.getElementById("pagina");
    conteudoDiv.innerHTML = html;

    await new Promise((resolve) => setTimeout(resolve, 0));

    accordion();
    // button_contact();

  
    const imagem = conteudoDiv.querySelector(".image-info");
    if(imagem) {
      imagem.addEventListener("click", () => {
        openFullscreen(imagem.src);
      });
    }

  } catch(erro) {
    console.error("Erro ao carregar a página:", erro);
    document.getElementById("pagina").innerHTML = "<p>Erro ao carregar página.</p>";
  }


}

window.openFullscreen = openFullscreen;
window.closeFullscreen = closeFullscreen;
window.carregarPagina = carregarPagina;
window.accordion = accordion;
export { carregarPagina };
