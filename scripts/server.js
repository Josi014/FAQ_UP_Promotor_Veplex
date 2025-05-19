// Importa os módulos necessários
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Define o diretório que contém os menus e cria um caminho absoluto até ele
const menuDir = path.join(__dirname, '..', 'Menus');

// Serve arquivos estáticos da pasta 'Menus' pela rota '/Menus'
app.use('/Menus', express.static(menuDir));

// Serve imagens da pasta 'public/images/imgMenu' pela rota '/images/imgMenu'
app.use('/images/imgMenu', express.static(path.join(__dirname, '..', 'public', 'images', 'imgMenu')));

// Serve arquivos estáticos a partir da raiz do projeto (diretório pai do atual)
app.use(express.static(path.join(__dirname, '..')));

// Lida com requisições para favicon.ico, retornando um status 204 (sem conteúdo) para evitar erro no navegador
app.get('/favicon.ico', (req, res) => res.status(204).end());

function listarConteudo(diretorio) {

  return fs.readdirSync(diretorio).map((item) => {
    const caminho = path.join(diretorio, item);
    // const stats = fs.statSync(caminho); --> Lógica para se utilizar em uma estrura de menu composta por pastas

    // if(stats.isDirectory()) {
    //   const separaCaminho = item.split(".");
    //   const nomeImagemPasta = separaCaminho[1];
    //   const imagem = `/images/imgMenu/${nomeImagemPasta}.png`;

    //   return {
    //     tipo: 'pasta',
    //     nome: item,
    //     imagem: imagem,
    //     conteudo: listarConteudo(caminho),
    //   };
    // } 
    if(item.endsWith('.html')) {  //Se o elemento terminar com ".html" executa
      const baseName = path.basename(item, '.html');// Remove a extensão '.html' do nome do arquivo
      const separaCaminho = baseName.split("."); // Divide o nome do arquivo no ponto (ex: "1.nome" vira ["1", "nome"])

      const nomeArquivo = separaCaminho[1];// Obtém a segunda parte do caminho para usar como nome do arquivo HTML
      const nomeImagemPasta = separaCaminho[1];// Usa a mesma parte do caminho para definir o nome da imagem correspondente
      const imagem = `/images/imgMenu/${nomeImagemPasta}.png`; // Monta o caminho completo da imagem baseado no nome obtido


      //Define retorno
      const resultado = {
        tipo: 'arquivo',
        nome: item,
        imagem: imagem
      };
      return resultado;
    }


  }).filter(item => item !== undefined);
}


app.get(['/menu', '/menu/'], (req, res) => {
  const conteudoMenu = listarConteudo(menuDir);
  res.json(conteudoMenu);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
