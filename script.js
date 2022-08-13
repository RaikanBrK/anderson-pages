// Largura e altura da tela do usuário
var largura = altura = null;

const conteudos = $('.conteudo');

var alturaConteudos = 0;

const mainTabela = ('#mainTabela');

function setandoTamanhoDaTela() {
  largura = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  altura = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function somandoTamanhoDosConteudos() {
  conteudos.each((index, element) => {
    alturaConteudos += $(element).height();
  });
}

function AjustandoTamanhoTabela() {
  let tamanhoTabela = altura - alturaConteudos - 40;
  // $(mainTabela).css('min-height', tamanhoTabela);
  $('.table-responsive').css('min-height', tamanhoTabela);


  let alturaTable = $('.table-custom').height();
  let larguraTable = $('.table-custom').width();

  let trs = $('.table-custom tbody tr');

  let topContinuacaoTabela = alturaTable;

  console.log(tamanhoTabela, alturaTable)
  let heightTabelaCont = tamanhoTabela - alturaTable;

  if (trs.length % 2 == 1) {
    topContinuacaoTabela -= 48;
    heightTabelaCont += 48
  }

  // 660 - 210 + 48

  $('.continuacao-tabela').css('top', topContinuacaoTabela);
  $('.continuacao-tabela').css('height', heightTabelaCont);
  $('.continuacao-tabela').css('width', larguraTable);



}

function init() {
  setandoTamanhoDaTela();

  alturaConteudos = 0;
  somandoTamanhoDosConteudos();

  AjustandoTamanhoTabela();
}

init();

$(window).resize(init);