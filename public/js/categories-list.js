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

    $(document).on('click', '.status-visible, .status-invisible', function (e) {
        e.preventDefault();
        let id = $(this).closest('.table-row').data('id');
        let self = this;
        let status = $(this).hasClass('status-visible') ? 'visible' : 'invisible';
        atualizarVisibilidade(id, status, self);
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

function startSpinner(element) {
    $(element).find('.small-spinner').show(300);
}

function stopSpinner(element){
    $(element).find('.small-spinner').hide();
}

function atualizarVisibilidade(id, status, self) {
    let preload = Toast('Salvando...', { duration: -1, close: true, }).showToast();
    $(self).addClass('link-disabled');
    startSpinner(self);

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `/categorias/${id}/atualizar-visibilidade`,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "processData": false,
        "data": JSON.stringify({
            status: status
        })
    };

    $.ajax(settings).done(function (response) {
        preload.hideToast()
        Toast.success('Sucesso!').showToast();
        stopSpinner(self);
        const oppositeStatus = status === 'visible' ? 'invisible' : 'visible';
        $(self).closest('ul').find(`.status-${oppositeStatus} .check`).addClass('hidden');
        $(self).find('.check').removeClass('hidden');
        $(self).removeClass('link-disabled');
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 401) {
            alert("Credenciais incorretas. Tente novamente.");
            Cookies.remove('jwtToken');
        }
    });
}