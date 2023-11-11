let idToDelete = 0;
let rowToDelete = undefined;

$(document).ready(function () {
    // Open the dialog when a button is clicked
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
        let status = $(this).hasClass('status-visible') ? 'visible' : 'invisible';
        updateStatus(id, status, this);
    });

    $(document).on('click', '.delete', function (e) {
        e.preventDefault();
        idToDelete = $(this).closest('.table-row').data('id');
        rowToDelete = $(this).closest('.table-row');
        $('#modal-open').click()
    });

    $(document).on('click', '.confirm', function (e) {
        e.preventDefault();
        deleteCategory(idToDelete, this);
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

function stopSpinner(element) {
    $(element).find('.small-spinner').hide();
}

function updateStatus(id, status, self) {
    let preload = Toast('Salvando...', { duration: -1, close: true, }).showToast();
    $(self).addClass('link-disabled');
    startSpinner(self);

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `/categorias/${id}/atualizar-status`,
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

        console.log($(self).closest('.table-row'))

        $(self).closest('.table-row').find('.table-cell.status').html(status);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 401) {
            alert("Credenciais incorretas. Tente novamente.");
            Cookies.remove('jwtToken');
        }
    });
}

function deleteCategory(id, self) {
    let preload = Toast('Salvando...', { duration: -1, close: true, }).showToast();
    $(rowToDelete).find('a, button').addClass('link-disabled')
    
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `/categorias/${id}/excluir`,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "processData": false,
        "data": JSON.stringify({
            status: 'deleted'
        })
    };

    $.ajax(settings).done(function (response) {
        $(rowToDelete).fadeOut(400, function () {
            $(this).remove();
        });
        preload.hideToast()
        Toast.success('Sucesso!').showToast();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 401) {
            alert("Credenciais incorretas. Tente novamente.");
            Cookies.remove('jwtToken');
        }
    });
}