import {
  abrirTelaCheia,
  fecharTela,
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


    accordion();
   
    //Se imagem-info(imagem contida no accordion) for clicada, chama a função abrirTelaCheia.
    const imagem = conteudoDiv.querySelector(".image-info");
    if (imagem) {
      imagem.addEventListener("click", () => {
        abrirTelaCheia(imagem.src);
      });
    }

    // Aguarda uma pequena pausa para garantir que os DOMs estejam processados
    await new Promise((resolve) => setTimeout(resolve, 100)); 

    return true; 
  } catch (erro) {
    console.error("Erro ao carregar a página:", erro);
    document.getElementById("pagina").innerHTML =
      "<p>Erro ao carregar página.</p>";
    return false;
  }
}

//Adiciona evento de click no meu li contido no li.card_liHome
document.addEventListener("DOMContentLoaded", () => {
  const lis = document.querySelectorAll("li.card_liHome");
  
  lis.forEach((li) => {
    li.addEventListener("click", function (e) {
      const link = li.querySelector("a.carregar-pagina");
  
      if (link) {
        e.preventDefault();

        const href = link.getAttribute("href"); // Pega o valor completo do atributo href
        const targetId = href.split("#")[1]; // Pega o ID do destino após o "#"
        const caminho = href.split("#")[0]; // Pega o caminho da URL antes do "#"

        carregarPagina(caminho).then(() => {
          if (targetId) {
            const tryClick = () => {
              const target = document.getElementById(targetId);
              if (target) {
                requestAnimationFrame(() => { 
                  target.click(); //Simula click no accordion com o ID referente.
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


document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("toggleTheme");

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (toggleBtn) {
      toggleBtn.classList.remove("bi-sun");
      toggleBtn.classList.remove("bi-moon");
    
    
      if (theme === "light") {
        toggleBtn.classList.add("bi-sun");
      } else {
        toggleBtn.classList.add("bi-moon");
      }
    }
  };

  const toggleTheme = () => {
    const newTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  setTheme(localStorage.getItem("theme") || "light");

  toggleBtn?.addEventListener("click", toggleTheme);
});

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener('scroll', () => {
    // const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    // const clientHeight = document.documentElement.clientHeight;

    let alturaMax = document.documentElement.scrollHeight - window.innerHeight; //Máximo que pode ser scrollado

    let faltando = alturaMax - (alturaMax * 0.5);

    const elemento = document.querySelector("#voltar_inicio_tela");

    if (scrollTop > faltando) {
      elemento.classList.add("ativar_voltar_inicio_tela");
      elemento.classList.remove("voltar_inicio_tela");
      elemento.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else{
      elemento.classList.remove("ativar_voltar_inicio_tela");
      elemento.classList.add("voltar_inicio_tela");
    }
  });
});


window.openFullscreen = abrirTelaCheia;
window.fecharTela = fecharTela;
window.carregarPagina = carregarPagina;
window.accordion = accordion;
window.abrirAccordionHome = abrirAccordionHome;
export { carregarPagina };
