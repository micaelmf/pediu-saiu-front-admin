$(document).ready(function (e) {
  $("#discount-price, #price-without-discount, #discount-applied").mask(
    "000.000.000.000.000,00",
    { reverse: true },
  );
});

$("#discount-price").on("change", function (e) {
  let priceWithoutDiscount = $("#price-without-discount").val();

  if (priceWithoutDiscount.length > 7) {
    priceWithoutDiscount = priceWithoutDiscount
      .replace(".", "")
      .replace(",", ".");
  } else {
    priceWithoutDiscount = priceWithoutDiscount.replace(",", ".");
  }

  let discountPrice = $("#discount-price")
    .val()
    .replace(".", "")
    .replace(",", ".");

  priceWithoutDiscount = parseFloat(priceWithoutDiscount);
  discountPrice = parseFloat(discountPrice);

  const discountApplied = priceWithoutDiscount - discountPrice;

  handleMaskPrice("discount-applied", discountApplied);
});

const selectProducts = document.getElementById("products");
const settings = {
  onChange: function (value) {
    const product = products.find((product) => product.id == value);
    let total = 0;

    console.log("change");
    if (product) {
      total = parseFloat(product.price.toFixed(2));
    }

    handleMaskPrice("price-without-discount", total);
    $("#discount-price").trigger("change");
  },
};
const instance = RichSelect.createInstance(selectProducts, settings);

function handleMaskPrice(elementId, price) {
  $(`#${elementId}`).unmask();
  $(`#${elementId}`)
    .val(price.toFixed(2))
    .mask("000.000.000.000.000,00", { reverse: true });
}
