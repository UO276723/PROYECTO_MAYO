class LectorEntradas {

    constructor() {
        this.numberFiles = 0;
        this.fileArray;
    }

    checkApiFile(){
        if (!(window.FileReader && window.File && window.FileList && window.Blob)){
            alert("Este navegador no soporta la subida de archivos");
            return;
        }
    }

    seleccionarEntrada(){
        this.fileArray = document.querySelector("input").files;
        this.numberFiles = this.fileArray.length;

        var entrada;

        $('input').before("<h2>Visualizacion de las entradas</h2>");
        for (var i = 0; i < this.numberFiles; i++){
            entrada =this.fileArray[i];

            this.leerEntrada(entrada);
        }

    }

    leerEntrada(entrada){
        var string = "<h3>" + entrada.name + "</h3>";
        var lector;
        var regexTxt = "text/plain";

        $('input').before("<section>" + string);
        if (entrada.type === regexTxt){
            $('h3:last').after("<p name=\"" + entrada.name + "\"></p></section>");

            lector = new FileReader();

            lector.onload = function(evento){
                document.querySelector("p[name=\"" + entrada.name + "\"").innerText = lector.result;
            }

            lector.readAsText(entrada);
        }
        else {
            string = "<p>Imposible de leer el arvhivo, formato no permitido.</p></section>";
            $('h3:last').before(string);
        }
    }
}

var lectorEntradas = new LectorEntradas();