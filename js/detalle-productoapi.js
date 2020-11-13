var precioinicio = 0;


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
    '<div class="producto">' +
    '<div class="container row fondo-blanco">' +
    '<h1 class="left-align texto-azul"><b>DETALLES</b></h1>' +
    '<h3 class="texto-negro"><b>"--titulo--"</b></h3>' +
    '<h4 class="texto-azul">Precio Actual <span>--baseprice--</span></h4>' +
    '<h4 class="texto-gris--oscuro">Precio Inicio <span>$100</span></h4>' +


    '<div class="carousel">' +
    '<a class="carousel-item" href="#one!"><img src="https://firebasestorage.googleapis.com/v0/b/zunilito-7fbfd.appspot.com/o/autos%2Fsegunda.jpg?alt=media&token=7bff032e-933c-4873-a466-17c1dc7aa42d"></a>' +
    '<a class="carousel-item" href="#two!"><img src="https://firebasestorage.googleapis.com/v0/b/zunilito-7fbfd.appspot.com/o/autos%2Fsegunda.jpg?alt=media&token=7bff032e-933c-4873-a466-17c1dc7aa42d"></a>' +
    '<a class="carousel-item" href="#three!"><img src="https://firebasestorage.googleapis.com/v0/b/zunilito-7fbfd.appspot.com/o/autos%2Fsegunda.jpg?alt=media&token=7bff032e-933c-4873-a466-17c1dc7aa42d"</a>' +
    '<a class="carousel-item" href="#four!"><img src=""https://firebasestorage.googleapis.com/v0/b/zunilito-7fbfd.appspot.com/o/autos%2Fsegunda.jpg?alt=media&token=7bff032e-933c-4873-a466-17c1dc7aa42d"></a>' +
    '<a class="carousel-item" href="#five!"><img src="https://firebasestorage.googleapis.com/v0/b/zunilito-7fbfd.appspot.com/o/autos%2Fsegunda.jpg?alt=media&token=7bff032e-933c-4873-a466-17c1dc7aa42d"></a>' +
    '</div>' +
    '<div class="row container">' +
    '<div class="col s12">' +
    '<ul class="collapsible" data-collapsible="accordion">' +
    '<li class="">' +
    '<div class="collapsible-header fondo-azul texto-blanco"><b>D E T A L L E S :</b></div>' +
    '<div class="collapsible-body fondo-blanco"><span>--detalle--</span></div>' +
    '</li>' +
    ' </ul>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="row center-align fondo-blanco">' +
    '<h3>Precio Actual <span>__basepriced__</span></h3>' +
    '</div>' +
    '<div class="row center-align">' +
    '<div class="col s12">' +
    '<form>' +
    '<div class="file-field ">' +
    '<div class="btn fondo-gris--oscuro" id="boton">' +
    '<span>Ofertar</span>' +
    '</div>' +
    '<div class="file-path-wrapper">' +
    '<input class="validate"  id="inputsubasta" type="text" >' +
    '</div>' +
    '</div>' +
    '</form>' +
    '</div>' +
    '</div>' +
    '<div class="row center-align">' +
    '</div>' +
    '</div>';



var mostrardetalles = function(detalles) {
    var plantillaFinal = "";
    detalles.forEach(function(detalle) {
        //console.log(detalle.title);
        plantillaFinal += plantillaproducto.replace("--titulo--", detalle.title)
            .replace("--baseprice--", detalle.basePrice)
            .replace("--detalle--", detalle.description)
            .replace("__basepriced__", detalle.basePrice)
        precioinicio = detalle.basePrice;
        //console.log(precioinicio);
        //return precioinicio;

    });
    var preciobase = precioinicio;
    console.log(preciobase);
    $("#producto").html(plantillaFinal);
    var valorinput = document.getElementById("inputsubasta");
    var botonsubasta = document.getElementById("boton");
    console.log(botonsubasta);
    valorinput.value = preciobase + 5;

    function agregarsubasta() {
        preciobase = valorinput.value;
        valorinput.value = Number(valorinput.value) + 5;
    }
    botonsubasta.addEventListener("click", agregarsubasta);
    console.log(valorinput);
    valorinput.value = preciobase + 5;
    $(.carousel).carousel();



};
peticionApi();