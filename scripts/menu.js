import { carregarPagina } from "./router.js";
async function carregarMenu() {
  try {
    const response = await fetch("http://192.168.18.252:3000/menu");
    if(!response.ok) {
      throw new Error(`Erro HTTP! Código: ${response.status}`);
    }

    const arquivos = await response.json();
    // console.log("Menu JSON:", JSON.stringify(arquivos, null, 2));

    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    function criarMenuItens(items, parent, caminhoPai = "") {
      const header = document.createElement("div");
      const div_titulo = document.createElement("div");
      const titulo_header = document.createElement("h1")
      titulo_header.textContent = "FAQ UP Promotor";
      titulo_header.className = "titulo_header"
      const imagem_header = document.createElement("div");
      imagem_header.className = "logo_menu";
      header.appendChild(imagem_header);
      div_titulo.appendChild(titulo_header);
      div_titulo.className = "div_tituloHeader";
      header.appendChild(div_titulo);

      parent.appendChild(header);


      items.forEach((item) => {

        const li = document.createElement("li");

        if(item.tipo === "arquivo") {
          const link = document.createElement("a");
          link.className = "arquivo_a";
          link.href = "#";
          link.textContent = formatarNome(item.nome.replace(".html", ""));

          const imagemArquivo = document.createElement("img");
          imagemArquivo.className = "img_itemMenu";
          imagemArquivo.src = item.imagem || "/images/imgMenu/veplex-logo.png";
          imagemArquivo.alt = `Ícone da pasta ${item.nome}`;

          imagemArquivo.onerror = () => {
            imagemArquivo.src = "/images/imgMenu/veplex-logo.png";
          };
          imagemArquivo.alt = `Ícone do arquivo ${item.nome}`;

          const arquivoDiv = document.createElement("div");
          arquivoDiv.appendChild(imagemArquivo);
          arquivoDiv.appendChild(link);

          li.appendChild(arquivoDiv);
          li.appendChild(document.createElement("br"));


          const caminho = `/Menus${caminhoPai}/${item.nome}`;
          console.log(caminho);
          li.addEventListener("click", (e) => {
            e.preventDefault();
            carregarPagina(caminho);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });

        }

        parent.appendChild(li);
      });


      const div_footer = document.createElement("div");
      div_footer.className = "div_footer";
      const footerMenu = document.createElement("footer");
      footerMenu.className = "footerMenu"
      const logo_footerMenu = document.createElement("div");
      logo_footerMenu.className = "logo_footerMenu";
      footerMenu.appendChild(logo_footerMenu);
      div_footer.appendChild(footerMenu);


      parent.appendChild(div_footer);
    }

    function formatarNome(nome) {
      const texto = nome.substring(nome.indexOf(".") + 1);
      let nomeFormatado = texto.replace(/_/g, " ");
      // nomeFormatado = nomeFormatado.replace(/coes/g, "ções").replace(/cao/g, "ção");
      nomeFormatado = nomeFormatado.toUpperCase();

      return nomeFormatado;
    }



    criarMenuItens(arquivos, menu);
  } catch(error) {
    console.error("Erro ao carregar menu:", error);
    alert("Ocorreu um erro ao carregar o menu. Veja o console para detalhes.");
  }



}
window.addEventListener("DOMContentLoaded", () => {
  carregarMenu();

  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');

  if(toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-fechado");
    });
    sidebar.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-fechado");
    });
  } else {
    console.warn("Botão ou sidebar não encontrado.");
  }
});


window.onload = carregarMenu;
