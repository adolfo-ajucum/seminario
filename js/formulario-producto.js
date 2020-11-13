(function () {
  var letras = 30;

//carga variables y asigna eventos
  var cargarPagina = function () {
    $("#nombreProducto").keyup(cuentaNombre);
    $("#descripcionProducto").keyup(cuentaDescripcion);
    $(".subastar").click(peticionApi);
  };

//funcion para validar el input de titulo del producto con menos de 30 caracteres
  var cuentaNombre = function (){
    var letras = $("#nombreProducto").val().length;
    var nombreDeProducto = $("#nombreProducto").val().length;

    if(letras >=30){
      $("#nombreProducto").attr("disabled", true);
    }

    if(letras >= 20){
      $("#contador").css("color", "red");
    }

    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("tituloProducto", nombreDeProducto);
      // Retrieve
      localStorage.getItem("tituloProducto");
    }

    $("#contador").text(letras);
  };

//funcion para validar la descripcion menor a 1000 caracteres
  var cuentaDescripcion = function (){
    var letras = $("#descripcionProducto").val().length;
    var valorDescripcion = $("#descripcionProducto").val();

    if(letras >=1000){
      $("#descripcionProducto").attr("disabled", true);
    }

    if (typeof(Storage) !== "undefined") {
      // Store
      localStorage.setItem("descripcion", valorDescripcion);
      // Retrieve
      localStorage.getItem("descripcion");
    }
  };

//Llamado de API
var peticionApi = function (e) {
e.preventDefault();

var token = localStorage.getItem("tokenUsuario");

var decoded = jwt_decode(token);
console.log(decoded);
var userId = decoded.userId

  $.ajax({
    type: 'POST',
    url: 'https://laboratoria-hack.herokuapp.com/api/user/' + userId +'/auction',
    headers: {"Authorization": "Bearer ".concat(token)},
    contentType: 'application/json',
    data:JSON.stringify({
      "basePrice": precioInicial.value,
      "duration": duracionSubasta.value,
      "title": nombreProducto.value,
      "description": descripcionProducto.value
    }),
    dataType: 'json'
  })
  .then(function (respuesta) {
    console.log(respuesta);
    swal("Listo", "Tu producto ha sido agregado al catálogo de subastas", "success");
    setTimeout (function(){location.href = "../views/home.html"}, 2000);

  }).fail(function (error) {
    swal("Lo sentimos", "Ocurrió un error, vuelve a intentarlo más tarde", "success")
  })

}

  // Carga la página
  $(document).ready(cargarPagina);
})();


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    }
}
