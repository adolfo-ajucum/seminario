function peticionApi() {
    $.ajax({
        type: 'GET',
        url: 'https://laboratoria-hack.herokuapp.com/api/auction',
        contentType: 'application/json',
        dataType: 'json'
    }).then(function(respuesta) {
        var detalles = respuesta;
        console.log(detalles)
        mostrardetalles(detalles);
        console.log(respuesta[0].title);
        console.log(respuesta[0].description);


        // return respuesta.json();
    }).fail(function(error) {
        console.log(error);

    })
};
var plantillaproducto =
    '<div class="row ">' +
    '<div class="col s6 ">' +
    '<div class="card">' +
    '<div class="card-image">' +
    '<img src="../assets/img/auto.jpg">' +

    '</div>' +
    '<div class="card-content">' +
    '<p>--titulo-- </p>' +
    '<p>Precio Base:<span>--baseprice--</span></p>' +
    '<p>Precio de inicio de subasta<span></span></p>' +
    '<p>Duración: <span>--duracion--</span></p>' +
    '<a href="detalle-producto.html"> ver más </a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="col s6 ">' +
    '<div class="card">' +
    '<div class="card-image">' +
    '<img src="../assets/img/auto.jpg">' +

    '</div>' +
    '<div class="card-content">' +
    '<p>Producto </p>' +
    '<p>Precio Base:<span>--baseprice1--</span></p>' +
    '<p>Precio de inicio de subasta<span></span></p>' +
    '<p>Duración:<span>--duracion1--</span></p>' +
    '<a href="detalle-producto.html"> ver más </a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

var mostrardetalles = function(detalles) {
    var plantillaFinal = "";
    detalles.forEach(function(detalle) {

        plantillaFinal += plantillaproducto.replace("--duracion--", detalle.duration)
            .replace("--baseprice--", detalle.basePrice)
            .replace("--duracion1--", detalle.duration)
            .replace("--baseprice1--", detalle.basePrice)
            .replace("--titulo--", detalle.title)



        precioinicio = detalle.basePrice;

        $(".tarjetas").html(plantillaFinal);

    });
};
peticionApi();