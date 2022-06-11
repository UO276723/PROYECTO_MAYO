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

        for (var i = 0; i < this.numberFiles; i++){
            entrada =this.fileArray[i];
            this.leerEntrada(entrada);
        }

    }

    leerEntrada(entrada){
        var string = "<h3>" + entrada.name + "</h3>";
        var lector;
        var regexTxt = "text/plain";

        if (entrada.type === regexTxt){


            lector = new FileReader();

            lector.onload = function(evento){
                document.querySelector("pre").innerText += lector.result + "\n";
            }

            lector.readAsText(entrada);
        }
        else {
            string = "Imposible de leer el arvhivo, formato no permitido.\n";
            document.querySelector("pre").innerText += string;
        }
    }
}

var lectorEntradas = new LectorEntradas();