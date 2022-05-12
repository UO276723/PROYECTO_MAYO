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
                var stringDatos = "CARGADO CORRECTAMENTE";
                
                //Extraccion de datos contenidos en el XML
                $(datos).find("conferencia").each(function () {
                    var nombreConferencia = $('conferencia',this).attr("nombreConferencia");
                    datos += "<h2>Conferencia " + nombreConferencia + "</h2>";
                    $(this).find("division").each(function () {
                        var nombreDivision = $('division', this).attr("nombreDivision");
                        datos += "<h3>Division " + nombreDivision + "</h3>";
                        $(this).find("equipo").each(function () {
                            var nombreEquipo = $('equipo', this).attr("nombreEquipo");
                        })
                    })
                });

                $("p").html(stringDatos);
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
        $(insertarAntesDe).before(elemento);
    }

    verEquipos(){
        //Muestra el archivo JSON recibido
        this.crearElemento("h2","Archivo XML","footer"); 
        this.crearElemento("h3",this.correcto,"footer"); // Crea un elemento con DOM 
        this.crearElemento("h4","XML","footer"); // Crea un elemento con DOM        
        this.crearElemento("h5","","footer"); // Crea un elemento con DOM para el string con XML
        this.crearElemento("h4","Datos","footer"); // Crea un elemento con DOM 
        this.crearElemento("p","","footer"); // Crea un elemento con DOM para los datos obtenidos con XML
        this.cargarDatos();
        $("button").attr("disabled", "disabled");
    }
}

var equiposNBA = new EquiposNBA("equiposNBA.xml");