$(document).ready(function (e) {
    $('form#additional #price, form#product #price').mask('000.000.000.000.000,00', {reverse: true});
})

$('li#category').on('click', function (e) {
    e.preventDefault()

    $('form#category').toggleClass('hidden')
    $('form#additional').addClass('hidden')
})

$('li#additional').on('click', function (e) {
    e.preventDefault()

    $('form#additional').toggleClass('hidden')
    $('form#category').addClass('hidden')
})

$('form#product #free').on('click', function (e) {
    let priceElement = $('form#product #price');
    let fieldsetElement = priceElement.closest('fieldset');
    let labelElement = priceElement.closest('label');

    if ($(this).is(':checked')) {
        priceElement.addClass('form-control--disabled');
        labelElement.addClass('span-disabled');
        fieldsetElement.attr('disabled', true);
    } else {
        priceElement.removeClass('form-control--disabled');
        labelElement.removeClass('span-disabled');
        fieldsetElement.attr('disabled', false);
    }
})
