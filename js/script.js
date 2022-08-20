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
 * Área da Tabela
 */
const tabelaResponsiva = $('.table-responsive');

/**
 * Cabeçalho da tabela
 */
const theadCustomizada = $('.thead-customizada');

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

/**
 * Atualizar o scroll horizontal do cabeçalho fixo da tabela com base no scroll horizontal da tabela
 * 
 * Ao mover o scroll da tabela atualizar o scroll do cabeçalho da tabela também
 */
function atualizarScrollTheadFixo() {
  /**
   * Scroll horizontal da área da tabela
   */
  let tabelaResponsivaScrollX = tabelaResponsiva.scrollLeft();

  // Setando scroll da tabela para o scroll do cabeçalho fixo da tabela
  $('.thead-fixed').scrollLeft(tabelaResponsivaScrollX);
}

/**
 * Atualizando largura do cabeçalho fixo com base na tabela
 * 
 * E atualizando seus elementos com base no cabeçalho da tabela (cabeçalho não fixado)
 */
function atualizarLarguraTheadFixed() {
  /**
   * Largura da área da tabela
   */
  let larguraDaTabela = tabelaResponsiva.width();

  /**
   * Cabeçalho fixo da tabela
   */
  let theadFixo = $('.thead-fixed');

  // Atualizando largura do cabeçalho fixo para o a mesma largura da área da tabela
  theadFixo.width(larguraDaTabela);

  // Atualizando a largura dos elementos do cabeçalho fixo para a mesma largura do cabeçalho da tabela
  theadFixo.find('tr th').each((index, element) => {
    let larguraDoTh = $(theadCustomizada.find('tr th')[index]).width();
    $(element).width(larguraDoTh);
  }); 

  // Atualizar Scroll
  atualizarScrollTheadFixo();
}

function fixarThead(scrollBody) {
  /**
   * Altura da tabela até o inicio da página
   */
  let tabelaTop = $('.tabela-customizada').offset().top;

  /** 
   * Verificando se o scroll da página passou da tabela 
   * E se a tabela fixa não existe
   */
  if (scrollBody >= tabelaTop && $('.thead-fixed').length == 0) {
    // Copiando elemento do cabeçalho da tabela
    let theadClone = theadCustomizada.clone();

    // Adicionando classe de fixar o cabeçalho e removendo classe do cabeçalho padrão da tabela
    theadClone = theadClone.addClass('thead-fixed').removeClass('thead-customizada')

    // Inserindo o cabeçalho fixo após o cabeçalho padrão da tabela
    theadClone.insertAfter(theadCustomizada);

    // Atualizando largura da tabela fixa
    atualizarLarguraTheadFixed();

  } else if (scrollBody < tabelaTop) {
    // Se o scroll da página não passou a tabela

    // Removendo tabela fixa caso exista
    $('.thead-fixed').remove();
  }
}

function manterTheadFinalScroll(scrollBody) {
  /**
   * Cabeçalho fixo da tabela
   */
  let theadFixo = $('.thead-fixed');

  /**
   * Todos os registros da tabela
   */
  let registrosTabela = $('.tabela-customizada tr');

  // Se não hover registros retornar
  if (registrosTabela.length <= 0) {
    return false;
  }
  
  /**
   * Top do último registro da tabela até o inicio da página
   */
  let ultimoRegistroTop = $(registrosTabela[registrosTabela.length - 1]).offset().top;

  /**
   * Altura do top para deixar apenas o cabeçalho e o último registro visível
   * 
   * Top do último registro - a altura do cabeçalho fixo da tabela
   */
  let alturaTheadUltimoRegistro = ultimoRegistroTop - theadFixo.height();

  /** 
   * Verificando se o scroll da página passou a altura do topo do cabeçalho com o último registro
   * 
   * E verificando se o cabeçalho fixo não tem a classe, para não entrar novamente
   */
  if (scrollBody >= alturaTheadUltimoRegistro && theadFixo.hasClass('position-absolute') == false) {
    // Adicionando classe para mudar o position
    theadFixo.addClass('position-absolute')

    // Mantendo o topo do cabeçalho fixo da tabela
    theadFixo.css('top', scrollBody - $('.tabela-customizada').offset().top);

  } else if(scrollBody < alturaTheadUltimoRegistro) {
    // Voltando o cabeçalho para fixo
    theadFixo.removeClass('position-absolute')
    theadFixo.css('top', 0);
  }
}

/**
 * Criando tabela Fake e seus requisitos
 */
function initTabela() {
  setandoTamanhoDaTela();

  alturaConteudos = 0;
  somandoAlturaDosConteudos();

  let alturaMinimaTabela = adicionandoTamanhoMinimoTabela();

  tabelaFake(alturaMinimaTabela);

  atualizarLarguraTheadFixed();
}

/**
 * Atualizar ao rolar o scroll do navegador
 */
function initScroll() {
  /**
   * Scroll da página
   */
  let scrollBody = $(document).scrollTop();
  
  fixarThead(scrollBody);
  manterTheadFinalScroll(scrollBody);
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
  initTabela();
});

// Ajustando tabela fake ao alterar a tela do usuário
$(window).resize(initTabela);

// Detectar mudanças no scroll da tabela para atualizar o scroll do thead fixo
$('.table-responsive').scroll(atualizarScrollTheadFixo);

// Detectar mudanças no scroll da página
$(window).scroll(initScroll);