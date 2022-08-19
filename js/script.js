/**
 * Objetivo: Criar uma tabela com uma altura flexível que se adapte a tela do usuário caso não tenha registros o suficiente
 * 
 * Recuperando a altura da tela do usuário
 * Recuperando a altura dos outros conteúdos além da tabela
 * 
 * alturaTela - alturaConteudos == altura da tabela
 */

/**
 * Largura da tela do usuário
 */
var largura = 0;

/**
 * Altura da tela do usuário
 */
var altura = 0;

/**
 * Conteúdos além da tabela que devem ser considerados
 * 
 * ex: Cabeçalho, Sub Header ou qualquer outro adicional 
 */
const conteudos = $('.conteudo');

/**
 * Altura de todos os conteúdos juntos
 */
var alturaConteudos = 0;

/**
 * Setando a largura e altura da tela do usuário nas respectivas variáveis
 */
function setandoTamanhoDaTela() {
  largura = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  altura = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

/**
 * Somando a altura de todos os conteúdos na variável {alturaConteudos}
 */
function somandoAlturaDosConteudos() {
  conteudos.each((index, element) => {
    alturaConteudos += $(element).height();
  });
}

/**
 * Criando altura minima da tabela para ocupar até o fim da tela do usuário
 */
function adicionandoTamanhoMinimoTabela() {
  /**
   * Altura minima da tabela para preencher a tela do usuário
   */
  let alturaMinimaTabela = altura - alturaConteudos;

  // Adicionando altura minima da tabela
  $('.table-responsive').css('min-height', alturaMinimaTabela);

  return alturaMinimaTabela;
}

/**
 * Ajustar tamanho da tabela fake com o background simulando linhas
 * 
 * @param {number} alturaMinimaTabela
 */
function tabelaFake(alturaMinimaTabela) {
  /**
   * Elemento da tabela
   */
  let tabelaCustomizada = $('.tabela-customizada');

  /**
   * Elemento da tabela fake
   */
  let tabelaFake = $('.tabela-fake');

  /**
   * Altura da tabela com seus registros
   */
  let alturaTabela = tabelaCustomizada.height();
 
  /**
   * Largura da tabela com seus registros
   */
  let larguraTabela = tabelaCustomizada.width();
 
  /**
   * Registros da tabela
   */
  let trs = $('.tabela-customizada tbody tr');

  /**
   * O top que a tabela fake tem que pular para não ficar embaixo da tabela
   */
  let topTabelaFake = alturaTabela;

  /**
   * Altura que a tabela fake deve preencher para chegar até o fim da tela
   */
  let alturaTabelaFake = alturaMinimaTabela - alturaTabela;

  /** 
   * Verificando se a quantidade de registros é impar
   * 
   * Para impar o próximo registro da tabela deve começar com a cor #ffffff
   * Para par o próximo registro deve começar com a cor #b8cbba
   */
  if (trs.length % 2 == 1) {
    /**
     * Quantidade de px de cada linha do background da tabela fake
     */
    let linhaRegistroFakeBg = 48;

    /**
     * Para uma quantidade impar de registros
     * 
     * A próxima linha deve começar com a cor #ffffff
     * Para isso diminuindo o top da tabela fake para ficar abaixo da tabela de registros
     */
    topTabelaFake -= linhaRegistroFakeBg;

    /**
     * Aumentando altura da tabela fake para preencher a perda do top
     */
    alturaTabelaFake += linhaRegistroFakeBg;
  }

  /**
   * Se a altura da tabela fake for maior que 0 adicionar classe de ativo
   */
  if (alturaTabelaFake > 0) {
    tabelaCustomizada.addClass('active-tabela-fake');
  }

  /** 
   * Adicionando as propriedades css
   */
  tabelaFake.css({
    'top': topTabelaFake,
    'height': alturaTabelaFake,
    'width': larguraTabela,
  });
}

function larguraTheadFixed() {
  $('.thead-fixed').width($('.table-responsive').width());

  $('.thead-fixed tr th').each((index, element) => {
    $(element).width($($('.thead-customizada tr th')[index]).width());
  }); 

  scroll();
}

/**
 * Criando tabela Fake e seus requisitos
 */
function init() {
  setandoTamanhoDaTela();

  alturaConteudos = 0;
  somandoAlturaDosConteudos();

  let alturaMinimaTabela = adicionandoTamanhoMinimoTabela();

  tabelaFake(alturaMinimaTabela);

  larguraTheadFixed();
}

/**
 * Criar tabela após o carregamento da página
 */
$(document).ready(() => {
  // Remover loading
  $('.loading').fadeOut('slow');

  // Exibir tabela com animação
  $('.container-tabela').fadeTo(1000, 1);

  // Criando tabela fake
  init();
});

/** 
 * Ajustando tabela fake ao alterar a tela do usuário
 */
$(window).resize(init);

$(window).scroll(() => {

  let scrollBody = $(document).scrollTop();
  let thead = $('.thead-customizada');
  let tabelaTop = $('.tabela-customizada').offset().top;

  if (scrollBody >= tabelaTop && $('.thead-fixed').length == 0) {
    thead.clone().addClass('thead-fixed').removeClass('thead-customizada').insertAfter(thead);
    larguraTheadFixed();
  } else if (scrollBody < tabelaTop) {
    $('.thead-fixed').remove();
  }
});

function scroll() {
  $('.thead-fixed').scrollLeft($('.table-responsive').scrollLeft());
}

$('.table-responsive').scroll(() => {
  scroll();
})