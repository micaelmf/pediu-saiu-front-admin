$(document).ready(function () {
  $(document).on('click', '.table-row', function (e) {
    // Verifica se o clique foi dentro de .acoes
    if ($(e.target).closest('.acoes').length === 0) {
      let id = $(this).closest('.table-row').data('id');
      window.location.href = '/categorias/editar/' + id;
    }
  });

  $(document).on('click', '.edit', function (e) {
    e.preventDefault();
    let id = $(this).closest('.table-row').data('id');
    window.location.href = '/categorias/editar/' + id;
  });

  $(document).on('change', '#filter-categories select', function (e) {
    if ($(this).val() == 'status') {
      $('#filter-text').hide();
      $('#filter-options').show();
    } else {
      $('#filter-options').hide();
      $('#filter-text').show();
    }
  });
});
