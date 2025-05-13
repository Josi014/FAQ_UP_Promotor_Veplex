const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const menuDir = path.join(__dirname, '..', 'Menus');

app.use('/Menus', express.static(menuDir));
app.use('/images/imgMenu', express.static(path.join(__dirname, '..', 'public', 'images', 'imgMenu')));

app.use(express.static(path.join(__dirname, '..')));


app.get('/favicon.ico', (req, res) => res.status(204).end());

function listarConteudo(diretorio) {

  return fs.readdirSync(diretorio).map((item) => {
    const caminho = path.join(diretorio, item);
    const stats = fs.statSync(caminho);

    if(stats.isDirectory()) {
      const separaCaminho = item.split(".");
      const nomeImagemPasta = separaCaminho[1];
      const imagem = `/images/imgMenu/${nomeImagemPasta}.png`;

      return {
        tipo: 'pasta',
        nome: item,
        imagem: imagem,
        conteudo: listarConteudo(caminho),
      };
    } else if(item.endsWith('.html')) {
      const baseName = path.basename(item, '.html');
      const separaCaminho = baseName.split(".");

      const nomeArquivo = separaCaminho[1];
      const nomeImagemPasta = separaCaminho[1];
      const imagem = `/images/imgMenu/${nomeImagemPasta}.png`;

      const pdfFileName = `${nomeArquivo}.pdf`;
      const xlsxFileName = `${nomeArquivo}.xlsx`;

      const pdfPath = path.join(__dirname, '..', 'PDF', pdfFileName);
      const xlsxPath = path.join(__dirname, '..', 'XLSX', xlsxFileName);

      const resultado = {
        tipo: 'arquivo',
        nome: item,
        imagem: imagem
      };

      const htmlNomeLimpo = path.basename(item, '.html').split(".")[1];
      if(fs.existsSync(pdfPath) && htmlNomeLimpo === nomeArquivo) {
        resultado.href = `/PDF/${pdfFileName}`;
      }
      else if(fs.existsSync(xlsxPath) && htmlNomeLimpo === nomeArquivo) {
        resultado.hrefXlsx = `/XLSX/${xlsxFileName}`;
      }
      

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
