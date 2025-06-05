import { carregarPagina } from "./router.js";
async function carregarMenu() {
  document.body.classList.add("sidebar-fechado");

  try {
    const response = await fetch("http://192.168.18.223:3000/menu");
    if(!response.ok) {
      throw new Error(`Erro HTTP! Código: ${response.status}`);
    }

    const arquivos = await response.json();
    // console.log("Menu JSON:", JSON.stringify(arquivos, null, 2));

    const menu = document.getElementById("menu");
    menu.innerHTML = "";

    function criarMenuItens(items, parent, caminhoPai = "") {
      //Criação de componentes
      const header = document.createElement("div");
      const div_titulo = document.createElement("div");
      const titulo_header = document.createElement("h1")

      titulo_header.textContent = "FAQ UP Promotor";
      titulo_header.className = "titulo_header"

      const imagem_header = document.createElement("div");
      imagem_header.className = "logo_menu";

      header.appendChild(imagem_header);

      div_titulo.appendChild(titulo_header); //Anexa conteudo de titulo (titulo_header) em uma div chamada div_titulo
      div_titulo.className = "div_tituloHeader";

      header.appendChild(div_titulo); // Cria div header e anexa div de imagem e div de cabeçalho e titulo.

      parent.appendChild(header);

      //Percorre lista de intens contida no server
      items.forEach((item) => {

        //Cria elemento li
        const li = document.createElement("li");

        if(item.tipo === "arquivo") { // Se for tipo arquivo cria elemento "a" e adiciona uma classe e href
          const link = document.createElement("a");
          link.className = "arquivo_a";
          link.href = "#";
          link.textContent = formatarNome(item.nome.replace(".html", ""));

          const imagemArquivo = document.createElement("img"); //cria elemento tipo imagem
          imagemArquivo.className = "img_itemMenu";
          imagemArquivo.src = item.imagem || "/images/imgMenu/veplex-logo.png"; //
          // console.log(item.imagem);
          imagemArquivo.alt = `Ícone o arquivo ${item.nome}`;

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
          // console.log(caminho);
          li.addEventListener("click", (e) => { // Se clicar no li chama a função carregarPagina e rola a tela para o ínicio
            e.preventDefault();
            carregarPagina(caminho);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });

        }

        parent.appendChild(li);
      });

      //Criação de footer do menu
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
      // Função para formatar o nome dos arquivos no front-end:
      // - Remove a parte inicial antes do primeiro ponto
      // - Substitui underlines "_" por espaços
      // - Converte todo o texto para letras maiúsculas
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
  // Adiciona listeners aos botões e à sidebar para alternar a visibilidade do menu lateral
  carregarMenu();
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const abrirMenuHome = document.getElementById('abra-menu');

  if(toggleBtn && sidebar || abrirMenuHome) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-fechado");
    });
    sidebar.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-fechado");
    });
    abrirMenuHome.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-fechado");
    });
  } else {
    console.warn("Botão ou sidebar não encontrado.");
  }
});


window.onload = carregarMenu;
