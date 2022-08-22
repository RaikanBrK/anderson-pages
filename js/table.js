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