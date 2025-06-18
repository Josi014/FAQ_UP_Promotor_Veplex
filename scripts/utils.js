
//Função de abrir imagem em tela cheia.
function openFullScreen(src) {
  const img = document.getElementById("lightbox-img");
  img.src = src;
  document.getElementById("lightbox").style.display = "flex";
}

// Função para fechar a tela cheia
function closeScreen() {
  document.getElementById("lightbox").style.display = "none";
}

//Acordion
function accordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains('active');

      // console.log(content);

      accordionHeaders.forEach(otherHeader => {
        if(otherHeader !== this) {
          otherHeader.classList.remove('active');
          otherHeader.nextElementSibling.style.maxHeight = '0';
        }
      });

      this.classList.toggle('active');

      // Define a altura do conteúdo: colapsa se ativo, expande se inativo
      content.style.maxHeight = isActive ? '0' : content.scrollHeight + 'px';

      if(!isActive) {
        setTimeout(() => {
          // Evento de scroll suave até o primeiro elemento <h3>
          const targetHeading = content.querySelector('h3');
          if(targetHeading) {
            targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });

          }
        }, 300);
      }
    });

  });
}

function openAccordionHome(targetId) {
  localStorage.setItem('abrirAccordion', targetId);
}

function controlaMenu() {
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const abrirMenuHome = document.getElementById('abra-menu');
  const fechaMenuLInk = document.getElementById('elementoMenu');

  if(toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-fechado");
    });
  }

  if(sidebar) {
    sidebar.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-fechado");
    });
  }

  if(abrirMenuHome) {
    abrirMenuHome.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-fechado");
    });
  }

  if(fechaMenuLInk) {
    fechaMenuLInk.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-fechado");
    });
  }

}

function toggleTheme() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("toggleTheme");

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if(toggleBtn) {
      toggleBtn.classList.remove("bi-sun");
      toggleBtn.classList.remove("bi-moon");


      if(theme === "light") {
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
}

function scrollBackHome() {
  window.addEventListener('scroll', () => {
    // const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    // const clientHeight = document.documentElement.clientHeight;

    let alturaMax = document.documentElement.scrollHeight - window.innerHeight; //Máximo que pode ser scrollado

    let faltando = alturaMax - (alturaMax * 0.5);

    const elemento = document.querySelector("#return_start_screen");

    if(scrollTop > faltando) {
      elemento.classList.add("activate_back_home_screen");
      elemento.classList.remove("return_start_screen");
      elemento.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      elemento.classList.remove("activate_back_home_screen");
      elemento.classList.add("return_start_screen");
    }
  });
}


function init() {
  controlaMenu();
  accordion();
  toggleTheme()
  scrollBackHome();
}

document.addEventListener("DOMContentLoaded", () => {
  init();

  const id = localStorage.getItem('abrirAccordion');
  if(id) {
    const target = document.getElementById(id);
    if(target) {
      setTimeout(() => {
        target.click(); 
      }, 200); 
    } else {
      console.warn(`Elemento com ID "${id}" não encontrado.`);
    }
    localStorage.removeItem('abrirAccordion');
  }
});

