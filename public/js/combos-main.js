

$(document).ready(function (e) {
    $('#price-without-discount, #discount-price, #discount-applied').mask('000.000.000.000.000,00', { reverse: true })
})

$('#discount-price').on('change', function (e) {
    let priceWithoutDiscount = $('#price-without-discount').val()

    if (priceWithoutDiscount.length > 7) {
        priceWithoutDiscount = priceWithoutDiscount.replace('.', '').replace(',', '.')
    } else {
        priceWithoutDiscount = priceWithoutDiscount.replace(',', '.')
    }

    let discountPrice = $('#discount-price').val().replace('.', '').replace(',', '.')

    priceWithoutDiscount = parseFloat(priceWithoutDiscount)
    discountPrice = parseFloat(discountPrice)

    const discountApplied = priceWithoutDiscount - discountPrice

    handleMaskPrice('discount-applied', discountApplied)
})

let total = 0
const selectProducts = document.getElementById('products')
const settings = {
    onChange: function (values) {
        console.log('change')
        total = 0
        values.forEach(function (value) {
            const product = products.find(product => product.id == value)
            console.log('p', product)
            if (product) {
                total += product.price
            }
        })

        handleMaskPrice('price-without-discount', total)
        $('#discount-price').trigger('change')
    }
}
const instance = RichSelect.createInstance(selectProducts, settings)

function handleMaskPrice(elementId, price) {
    $(`#${elementId}`).unmask()
    $(`#${elementId}`).val(price.toFixed(2)).mask('000.000.000.000.000,00', { reverse: true });
}
