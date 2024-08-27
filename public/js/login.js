$(function () {
  // Excluir o cookie do token JWT
  Cookies.remove("jwtToken");
});

$(document).on("click", "#login", function (e) {
  e.preventDefault();
  const settings = {
    async: true,
    crossDomain: true,
    url: "http://localhost:4000/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    processData: false,
    data: JSON.stringify({
      email: $("[name='email']").val(),
      password: $("[name='password']").val(),
      enterpriseId: 1,
    }),
  };

  $.ajax(settings)
    .done(function (response) {
      Cookies.set("jwtToken", response.token);
      window.location.href = "/pedidos";
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        alert("Credenciais incorretas. Tente novamente.");
        Cookies.remove("jwtToken");
        $("[name='email']").val("");
        $("[name='password']").val("");
      }
    });
});
