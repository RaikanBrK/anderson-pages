/**
 * Área da Tabela
 */
const tableResponsive = $('.table-responsive');

/**
 * Adicionar classe caso o scroll da tabela seja maior que 0
 */
function scrollTableResponsive() {
  let scrollTopTable = tableResponsive.scrollTop();

  if (scrollTopTable > 0) {
    tableResponsive.removeClass('active-border');
  } else {
    tableResponsive.addClass('active-border');
  }
}

/** 
 * Exibir tabela após o carregamento da página
 */
$(document).ready(() => {
  // Remover loading
  $('.loading').fadeOut('slow');

  // Exibir tabela com animação
  $('.container-tabela').fadeTo(1000, 1);
});

// Adicionando função ao evento de scroll da tabela
tableResponsive.scroll(scrollTableResponsive);