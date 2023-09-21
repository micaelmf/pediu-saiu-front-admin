$(document).ready(function (e) {
    $('form#additional #price, form#product #price').mask('000.000.000.000.000,00', {reverse: true});
})

$('li#category').on('click', function (e) {
    e.preventDefault()

    $('form#category').toggleClass('hidden')
    $('form#addtional').addClass('hidden')
})

$('li#additional').on('click', function (e) {
    e.preventDefault()

    $('form#additional').toggleClass('hidden')
    $('form#category').addClass('hidden')
})

$('form#additional #free').on('click', function (e) {
    let priceElement = $('form#additional #price');
    let fieldsetElement = priceElement.closest('fieldset');

    if ($(this).is(':checked')) {
        priceElement.addClass('form-control--disabled');
        fieldsetElement.attr('disabled', true);
    } else {
        priceElement.removeClass('form-control--disabled');
        fieldsetElement.attr('disabled', false);
    }
})
