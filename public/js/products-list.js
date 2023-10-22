$(document).ready(function () {
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

    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "http://localhost:4000/enterprises",
    //     "method": "GET",
    //     "headers": {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${Cookies.get('jwtToken')}`
    //     },
    //     "processData": false
    // };

    // $.ajax(settings).done(function (response) {
    //     console.log(response)
    // }).fail(function (jqXHR, textStatus, errorThrown) {
    //     if (jqXHR.status === 401) {
    //         alert("Credenciais incorretas. Tente novamente.");
    //         Cookies.remove('jwtToken');
    //         $("[name='email']").val('');
    //         $("[name='password']").val('');
    //     } else {
    //         alert('Ocorreu um erro inesperado.')
    //         console.log(`Código do Erro: ${jqXHR.status}`)
    //     }
    // });
});