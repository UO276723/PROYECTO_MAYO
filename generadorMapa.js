class Geolocalizacion {
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this), this.verErrores.bind(this));
    }

    getPosition(position){
        this.mensaje = "Se ha realizado correctamente la petición de localización";
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
        this.altitud = position.coords.altitude;
        this.precision = position.coords.accuracy;
        this.precisionAltitud = position.coords.altitudeAccuracy;
        this.rumbo = position.coords.heading;
        this.velocidad = position.coords.speed;
    }

    verErrores(error){
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "No se han dado permisos de localizacion";
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Posicion no disponible";
                break;
            case error.TIMEOUT:
                this.mensaje = "La peticion ha caducado";
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido";
                break;
        }

    }

    generarMapa() {
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";

        var url = "https://maps.googleapis.com/maps/api/staticmap?";

        //var centro = "center=" + this.latitud + "," + this.longitud;

       // var zoom = "&zoom=1";

        var tamaño = "&size=800x600";

        var losAngelesLakersLatitud = 34.0430175, losAngelesLakersLongitud=-118.2672541;
        var newYorkKnicksLatitud = 40.7505045, newYorkKnicksLongitud = -73.9934387;

        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud + "&markers=color:red%7Clabel:L%7C" + losAngelesLakersLatitud + "," + losAngelesLakersLongitud + "&markers=color:red%7Clabel:K%7C" + newYorkKnicksLatitud + "," + newYorkKnicksLongitud;

        var sensor = "&sensor=false";

        this.url = url + tamaño + marcador + sensor + apiKey;

        $('img').remove();
        $('p:last').after("<img src=\'" + this.url +"\' alt=\mapa\' />");
    }

    cargarDatos(){
        $('p').remove();

        var datos = "<p>" + this.mensaje + "</p>";
        datos += "<h3>Datos de mi ubicacion actual</h3>";
        datos += "<p>Longitud: " + this.longitud + "grados </p>";
        datos += "<p>Latitud: " + this.latitud + " grados</p>";
        datos += "<p>Precision de la longitud y latitud: " + this.precision + " metros</p>";
        datos += "<p>Altitud: " + this.altitud+ " metros</p>";
        datos += "<p>Precision de la altitud: " +this.altitud + " metros</p>";
        datos += "<p>Rumbo: " + this.rumbo + " grados</p>";
        datos += "<p>Velocidad: " + this.velocidad + " m/s</p>";

        $('input').after(datos);

        this.generarMapa();

    }
}

var localizacion = new Geolocalizacion();