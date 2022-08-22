/** 
 * Exibir tabela após o carregamento da página
 */
$(document).ready(() => {
  // Remover loading
  $('.loading').fadeOut('slow');

  // Exibir tabela com animação
  $('.container-tabela').fadeTo(1000, 1);
});