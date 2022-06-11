<?php


class NBADataManager{

    protected $lastDone;
    protected $currentMenu;
    protected $dbName;
    protected $connection;

    public function __construct(){

        $this->lastDone="";
        $this->currentResult = "";
        $this->dbName="db_sew_extraordinaria";
    }

    public function crearConexion(){
        $db = new mysqli("localhost", "DBUSER2021", "DBPSWD2021", "db_sew_extraordinaria");

        if ($db->connect_errno){
            $this->lastDone = "<p>Error de conexion: " . $db->connect_error . "</p>";
            return null;
        }
        else {
            $this->lastDone = "<p>Conexion establecida con exito</p>";
            $this->connection = $db;
            return $db; 
        }
    }

    private function printEdadMedia($result){
        
    }

    public function ejecutarEdadMediaEquipo($equipo, $temporada){
        $this->connection = $this->crearConexion();
        $this->connection->select_db($this->dbName);

        if ($this->connection == null){
            $this->currentResult = 'Error en la conexion';
            return;
        }

        $query = $this->connection->prepare("SELECT AVG(edad_jugador) AS edad_media FROM jugador j WHERE j.JugadorId IN (SELECT ju.Jugador FROM juega ju WHERE ju.Equipo_jugador=? AND ju.Temporada_jugador=?);");

        if ($query == false){
            $this->currentResult = 'Error en la busqueda';
            $this->connection->close();
            return;
        }

        $query->bind_param('ss', $equipo, $temporada);

        $result = $query->execute();

        if ($result == false){
            $this->curentResult = 'Sin resultados';
            $this->connection->close();
            return;
        }

        $result = $query->get_result();
        $count = 0;
        $this->currentResult = '';
        while ($row = $result->fetch_array()){
            $this->currentResult .= "<section><h3>Edad media del equipo " . $equipo . " durante la temporada " . $temporada . ":</h3>";
            $this->currentResult .= "<p>" . $row['edad_media'] . " años </p></section>";
        }

        $this->connection->close();
    }

    public function ejecutarSalarioMedioEquipo($equipo, $temporada){
        $this->connection = $this->crearConexion();
        $this->connection->select_db($this->dbName);

        if ($this->connection == null){
            $this->currentResult = 'Error en la conexion';
            return;
        }

        $query = $this->connection->prepare("SELECT AVG(salario_jugador) AS salario_medio FROM juega WHERE equipo_jugador=? AND temporada_jugador=?;");

        if ($query == false){
            $this->currentResult = 'Error en la busqueda';
            $this->connection->close();
            return;
        }

        $query->bind_param('ss', $equipo, $temporada);

        $result = $query->execute();

        if ($result == false){
            $this->curentResult = 'Sin resultados';
            $this->connection->close();
            return;
        }

        $result = $query->get_result();
        $count = 0;
        $this->currentResult = '';
        while ($row = $result->fetch_array()){
            $this->currentResult .= "<section><h3>Slario medio del equipo " . $equipo . " durante la temporada " . $temporada . ":</h3>";
            $this->currentResult .= "<p>" . $row['salario_medio'] . " millones de dólares </p></section>";
        }

        $this->connection->close();
    }

    public function ejecutarEntrenadorEquipo($equipo, $temporada){
        $this->connection = $this->crearConexion();
        $this->connection->select_db($this->dbName);

        if ($this->connection == null){
            $this->currentResult = 'Error en la conexion';
            return;
        }

        $query = $this->connection->prepare("SELECT ent.Nombre_entrenador, ent.Apellidos_entrenador, ent.Edad_entrenador, ent.Numero_campeonatos_entrenador, e.Salario_entrenador FROM entrenador ent, entrena e WHERE ent.EntrenadorId=e.Entrenador AND e.Equipo_entrenador=? AND e.Temporada_entrenador=?;");

        if ($query == false){
            $this->currentResult = 'Error en la busqueda';
            $this->connection->close();
            return;
        }

        $query->bind_param('ss', $equipo, $temporada);

        $result = $query->execute();

        if ($result == false){
            $this->curentResult = 'Sin resultados';
            $this->connection->close();
            return;
        }

        $result = $query->get_result();
        $count = 0;
        $this->currentResult = '';
        while ($row = $result->fetch_array()){
            $this->currentResult .= "<section><h3>Entrenador del equipo " . $equipo . " durante la temporada " . $temporada . ":</h3>";
            $this->currentResult .= "<p>Nombre: " . $row['Nombre_entrenador'] . " , apellidos:  " . $row['Apellidos_entrenador'] . " , edad: " . $row['Edad_entrenador'] . " , numero de campeonatos: " . $row['Numero_campeonatos_entrenador']  . ", salario: ".  $row['Salario_entrenador'] . "</p></section>";
        }

        $this->connection->close();
    }

    public function ejecutarVictoriasYDerrotasEquipo($equipo, $temporada){
        $this->connection = $this->crearConexion();
        $this->connection->select_db($this->dbName);

        if ($this->connection == null){
            $this->currentResult = 'Error en la conexion';
            return;
        }

        $query1 = $this->connection->prepare("SELECT COUNT(*) AS wins FROM partido WHERE Temporada_partido =? AND ((Marcador_local>Marcador_visitante AND Equipo_local=?) OR (Marcador_visitante>Marcador_local AND Equipo_visitante=?));");

        if ($query1 == false){
            $this->currentResult = 'Error en la busqueda';
            $this->connection->close();
            return;
        }

        $query1->bind_param('sss', $temporada, $equipo, $equipo);

        $resultVictorias = $query1->execute();

        if ($resultVictorias == false){
            $this->curentResult = 'Sin resultados';
            $this->connection->close();
            return;
        }

        $resultVictorias = $query1->get_result();
        

        $query2 = $this->connection->prepare("SELECT COUNT(*) AS looses FROM partido WHERE Temporada_partido=? AND ((Marcador_local<Marcador_visitante AND Equipo_local=?) OR (Marcador_visitante<Marcador_local AND Equipo_visitante=?));");

        if ($query2 == false){
            $this->currentResult = 'Error en la busqueda';
            $this->connection->close();
            return;
        }

        $query2->bind_param('sss', $temporada, $equipo, $equipo);

        $resultDerrotas = $query2->execute();

        if ($resultDerrotas == false){
            $this->curentResult = 'Sin resultados';
            $this->connection->close();
            return;
        }
       
        $resultDerrotas = $query2->get_result();

        $this->currentResult = '';

        $victorias = $resultVictorias->fetch_array();
        $derrotas = $resultDerrotas->fetch_array();

        $this->currentResult .= "<section><h3>Victorias y derrotas del equipo " . $equipo . " durante la temporada " . $temporada . ":</h3>";
        $this->currentResult .= "<p>Victorias: " . $victorias['wins'] . ", derrotas: " . $derrotas['looses'] . "</p></section>";     

        $this->connection->close();
    }

    public function printCurrentResult(){
        return $this->currentResult;
    }
}

if (!isset($_SESSION['datosNBA'])){
    $dataManager = new NBADataManager();
    $dataManager->crearConexion();
    $_SESSION['datosNBA'] = $dataManager;
}

if (count($_POST) > 0){

    $dataManager = $_SESSION['datosNBA'];

    if (isset($_POST['barraBusquedaEquipo']) && isset($_POST['barraBusquedaTemporada'])){
        if (isset($_POST['edadMedia']))  $dataManager->ejecutarEdadMediaEquipo($_POST['barraBusquedaEquipo'], $_POST['barraBusquedaTemporada']);
        if (isset($_POST['salario']))  $dataManager->ejecutarSalarioMedioEquipo($_POST['barraBusquedaEquipo'], $_POST['barraBusquedaTemporada']);
        if (isset($_POST['record']))  $dataManager->ejecutarVictoriasYDerrotasEquipo($_POST['barraBusquedaEquipo'], $_POST['barraBusquedaTemporada']);
        if (isset($_POST['entrenador']))  $dataManager->ejecutarEntrenadorEquipo($_POST['barraBusquedaEquipo'], $_POST['barraBusquedaTemporada']);
    }

    $_session['datosNBA'] = $dataManager;
}

echo "<!DOCTYPE HTML>

<html lang='es'>
<head>
    <!-- Datos que describen el documento -->
    <meta charset='UTF-8' />
    <title>NBA</title>

    <meta name='keywords' content='NBA, resultados NBA'>
    <meta name='author' content='Javier García González'>
    <meta name='description' content='Centro de datos de la NBA(equipos, jugadores, partidos..)'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>

    <link rel='stylesheet' type='text/css' href='estilo.css' />
</head>

<body>

    <header>    
        <nav>
            <a href='index.html' accesskey='i' tabindex='1'>Inicio</a>
            <a href='top10jugadores.html' accesskey='t' tabindex='2'>Top 10 Jugadores</a>
            <a href='equiposCampeones.html' accesskey='e' tabindex='3'>Equipos Campeones</a>
            <a href='equiposNBA.html' accesskey='q' tabindex='4'>Equipos de la NBA</a>
            <a href='localizacion.html' accesskey='l' tabindex='5'>Mi localizacion</a>
            <a href='estadisticas.html' accesskey='s' tabindex='6'>Estadisticas</a>
            <a href='lectorEntradas.html' accesskey='n' tabindex='7'>Lector de entradas</a>
            <a href='CentroDatosNBA.php' accesskey='c' tabindex='8'>Centro de datos</a>
        </nav>    
    </header>

    <!-- Datos con el contenidos que aparece en el navegador -->
    <main>
        <article>
        <h1>Centro de datos de la NBA</h1>
        <section>
            <h2>Introduce los datos para realizar la búsqueda:</h2>
            <form action='#' method='post' name='menuForm' enctype='multipart/form-data'>

                <label for='busquedaEquipo'>Equipo: </label>
                <input type='text' name='barraBusquedaEquipo' id='busquedaEquipo'>
                <label for='busquedaTemporada'>Temporada: </label>
                <input type='text' name='barraBusquedaTemporada' id='busquedaTemporada'>
                <input type='submit' value='Edad media del equipo' name='edadMedia'>
                <input type='submit' value='Salario total del equipo' name='salario'>
                <input type='submit' value='Record (victorias y derrotas) del equipo' name='record'>
                <input type='submit' value='entrenador a cargo del equipo' name='entrenador'>
            </form>

            
            </section>
            <section>
            <h2>Resultado de la busqueda</h2>

            ";

            echo $_SESSION['datosNBA']->printCurrentResult();

            echo "
            </section>
        </article>
    </main>
    <footer>Autor: Javier Garcia Gonzalez</footer>
</body>
</html>";

?>