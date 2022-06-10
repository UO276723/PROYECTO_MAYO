class GeneradorEstadisticas {
    constructor(){
        this.datos;
    }

    cargarDatos(){
        var nombreJugador = $("input:text").val();
        var stringDatos = "";

        $.ajax({
            dataType: "json",
            url: "https://www.balldontlie.io/api/v1/players?search=" + nombreJugador,
            method: 'GET',
            success: function(datos){
                if (datos.data.length == 0){
                    stringDatos = "No existe ningún jugador con este nombre";
                    $("p").html(stringDatos);
                    return;
                }
                this.datos = datos.data[0];
                var playerID = this.datos.id;
                stringDatos = "<h3>Datos del jugador:</h3>";
                stringDatos += "<ul><li>Nombre: " + this.datos.first_name + " " + this.datos.last_name + "</li>";
                stringDatos += "<li>Posicion: " + this.datos.position + "</li>";
                if (this.datos.height_feet != null)
                    stringDatos += "<li>Altura: " + this.datos.height_feet+ "'" + this.datos.height_inches+ " feet</li>";
                if (this.datos.weight_pounds != null)
                    stringDatos += "<li>Peso: " + this.datos.weight_pounds + " libras</li>";
                stringDatos += "<li>Equipo: " + this.datos.team.full_name + "</li></ul>";

                $.ajax({
                    dataType: "json",
                    url: "https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=" + playerID,
                    method: 'GET',
                    timeout: 0,
                    success: function(datos){
                        this.datos = datos.data[0];
        
                        stringDatos += "<h3>Estadísticas:</h3>";
                        stringDatos += "<ul><li>Partidos Jugados: " + this.datos.games_played + "</li>";
                        stringDatos += "<li>Minutos: " + this.datos.min + "</li>";
                        stringDatos += "<li>Puntos: " + this.datos.pts + "</li>";
                        stringDatos += "<li>Rebotes: " + this.datos.reb + "</li>";
                        stringDatos += "<li>Asistencias: " + this.datos.ast + "</li>";
                        stringDatos += "<li>Robos: " + this.datos.stl + "</li>";
                        stringDatos += "<li>Tapones: " + this.datos.blk + "</li>";
                        stringDatos += "<li>Perdidas: " + this.datos.turnover + "</li>";
                        stringDatos += "<li>Faltas: " + this.datos.pf + "</li></ul>";
                        $("p").html(stringDatos);
                    },
        
                    error: function(){
                        stringDatos = "ha habido un error en el ajax 2";
                        $("p").html(stringDatos);
                    }
                });
               
            },            

            error: function(){
                stringDatos = "ha habido un error en el ajax 1";
                $("p").html(stringDatos);
            }
            
        });
    }

    crearElemento(tipoElemento, texto, insertarAntesDe){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).after(elemento);
    }

    verJSON(){
        $("p").remove();
        this.crearElemento("p","","input:button"); // Crea un elemento con DOM para los datos obtenidos con JSON
        this.cargarDatos();
}
}

var generadorEstadisticas = new GeneradorEstadisticas();