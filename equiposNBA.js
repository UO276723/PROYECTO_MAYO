//Informacion de la asignatura
//nombre de la asignatura, nombre de la titulacion, nombre del centro, nombre de la universidad, curso actual, nombre del estudiante, email
"use strict";
class EquiposNBA {
    constructor(nombre){
        this.nombre = nombre;
        this.correcto = "Todo correcto! archivo XML cargado";
    }

    cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: "equiposNBA.xml",
            method: 'GET',
            success: function(datos){            
                var stringDatos = "";
                
                //Extraccion de datos contenidos en el XML
                $(datos).find("conferencia").each(function () {
                    var nombreConferencia = $(this).attr("nombreConferencia");
                    stringDatos += "<h2>Conferencia " + nombreConferencia + "</h2>";
                    $(this).find("division").each(function () {
                        var nombreDivision = $( this).attr("nombreDivision");
                        stringDatos += "<h3>Division " + nombreDivision + "</h3>";
                        $(this).find("equipo").each(function () {
                            var nombreEquipo = $(this).attr("nombreEquipo");
                            var pabellon = $(this).find('pabellon').text();
                            var fechaCreacion = $(this).find('fechaCreacion').text();
                            var ciudad = $(this).find('ciudad').text();
                            var latitud = $(this).find('coordenadas').find('latitud').text();
                            var longitud = $(this).find('coordenadas').find('longitud').text();
                            var altitud = $(this).find('coordenadas').find('altitud').text();
                            var numeroCampeonatos = $(this).find('numeroCampeonatos').text();
                            var logo = $(this).find('logo').text();

                            stringDatos += "<h4>" + nombreEquipo +"</h4>";
                            stringDatos += "<p>Pabellon: " + pabellon + "</p>";
                            stringDatos += "<p>Fecha de creacion: " + fechaCreacion + "</p>";
                            stringDatos += "<p>Ciudad: " + ciudad + "</p>";
                            stringDatos += "<p>Coordenadas (latitud, longitud, altitud): " + latitud +", " + longitud + ", " + altitud + "</p>";
                            stringDatos += "<p>Numero de campeonatos: " + numeroCampeonatos + "</p>";
                            stringDatos += "<img src ='" + logo + "' alt=' logo de " + nombreEquipo + "' />";
                        })
                    })
                });

                $("section:last").html(stringDatos);
            },

            error:function(){
                $("h3").html("¡Tenemos problemas! No se pudo cargar el archivo XML"); 
                $("h4").remove();
                $("h5").remove();
                $("p").remove();
            }
        });
    }

    crearElemento(tipoElemento, texto, insertarAntesDe){
        var elemento = document.createElement(tipoElemento);
        elemento.innerHTML = texto;
        $(insertarAntesDe).after(elemento);
    }

    verEquipos(){
        this.crearElemento("section","","button"); // Crea un elemento con DOM para los datos obtenidos con XML
        this.cargarDatos();
        this.crearElemento("h3",this.correcto,"button"); // Crea un elemento con DOM 
        //Muestra el archivo xml recibido
        $("button").attr("disabled", "disabled");
    }
}

var equiposNBA = new EquiposNBA("equiposNBA.xml");