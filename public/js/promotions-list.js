$(document).ready(function (e) {
    $(document).on('click', '.table-row', function (e) {
        // Verifica se o clique foi dentro de .acoes
        if ($(e.target).closest('.acoes').length === 0) {
            let id = $(this).closest('.table-row').data('id');
            window.location.href = '/produtos/editar/' + id;
        }
    });

    $(document).on('click', '.edit', function (e) {
        e.preventDefault();
        let id = $(this).closest('.table-row').data('id');
        window.location.href = '/produtos/editar/' + id;
    });
});

const periodDate = document.getElementById('period')
const settings = {
    mode: "range",
    dateFormat: "d/m/Y H:i",
    enableTime: true,
    time_24hr: true
}
const instance = DatePicker.createInstance(periodDate, settings)
