<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pagina principal</title>
        <script src="scripts/index.js"></script>
        <script src="scripts/jquery.js"></script>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles/index.css">
        <link rel="shortcut icon" href="">
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@500&family=Kalam:wght@700&family=Lusitana:wght@700&family=Vollkorn:ital@1&display=swap" rel="stylesheet">
    </head>
    
    <!------- CUERPO DE LA PAGINA CON UN TEMA POR DEFECTO----------->
    <body class="default">
        <!--================ ELEMENTOS DEL AREA SUPERIOR ================-->
        <div class="searchArea" onmouseleave="display()">
            <i class="btn">
                <img src="styles/themes/Neon2020/info_icon.png" onclick="temp.viewCredits()" class="topIcon">
            </i>    
            <input id="searchBox" class="inconstant tbox" type="text" placeholder="Ingrese el nombre de la cancion, artista o album." onkeyup="temp.searchElement()">
            <div id="resultsToSearch" class="inconstant">
                <table id="tableOfResults" class="inconstant">
                </table>
            </div>
            <i class="btn">
                <input type="image" onclick="temp.downloadElements()" src="styles/themes/Neon2020/download_icon2.png" class="topIcon">                
                <form method="get" action="http://localhost:8080/songs.zip" id="myform">
                </form>
            </i>
        </div>


        <!--================ ELEMENTOS DE VISUALIZACION ARTISTAS Y ALBUMES ================-->
        <div id="viewAlbumAndArtist">
        
            <!------- Area de artistas ------->
            <a id="titleArtist">Artistas</a>
            <div id="artist">
                <table id="contentArtists" class="tableContent">
                </table>
            </div>
        
            <!------- Area de albumes ------->
            <a id="titleAlbum">Albumes</a>
            <div id="album">
                <table id="contentAlbums" class="tableContent">
                </table>
            </div>
            
        </div>
        
        <!--================ ELEMENTOS DEL AREA DE INFORMACION DE CANCION ================-->
        <div id="viewInfo">
            <img id="albumImage"><br>
            <span id="nameCurrentSong" class="textInfo"></span><br>
            <span id="artistCurrentSong"></span>
            <audio id="objSong" preload="metadata"></audio>
            <div id="controllers">
                <img id="playIcon" src="styles/themes/Neon2020/play_icon.png" class="controllerIcon" onclick="temp.playOrPauseSong()">
                <img id="nextIcon" src="styles/themes/Neon2020/next_icon.png" class="controllerIcon" onclick="temp.playNextSong()">
                <img id="previousIcon" src="styles/themes/Neon2020/previous_icon.png" class="controllerIcon" onclick="temp.playBackSong()">
                <span id="currentTime">0:00</span>
                <progress id="progressBar"class="custom-progress" value="0"></progress>
                <input id="inputProgressBar" type="range" value="0" min="0" max="100" onchange="temp.changeProgressSong(this)">
                <span id="duration">0:00</span>
                <img id="volumenIcon" src="styles/themes/Neon2020/volumen_icon.png" onclick="temp.muteSong()">
                <input id="currentVolumeBar" min="0" max="100" value="100" type="range" onchange="temp.changeValueVolume(this)">
                
            </div>
            <!-- Navegador izquierdo que muestra los artistas y albumes responsivo-->
            <nav>
                <input type="checkbox" id="check">
                <label for="check" class="checkbtn">
                    <!-- <img src="albumList_icon.png" class="checkbtn" id="icono"> -->
                    <img src="styles/themes/Neon2020/albumList_icon.png" class="checkbtn icono">
                </label>
                <ul>
                    <div id="artistsR">
                        <h1>Artistas</h1>
                        <div class="areaInf">
                            <p id="contentArtistsR"></p>
                        </div>
                    </div>
                    <div id="albumsR">
                        <h1>Albumes</h1>
                        <div class="areaInf">
                            <p id="contentAlbumsR"></p>
                        </div>
                    </div>
                </ul>
            </nav>
            
            <nav>
                <input type="checkbox" id="check2">
                <label for="check2" class="checkbtn">
                    <img src="styles/themes/Neon2020/lyric_icon.png" class="checkbtn icono" id="iconLyric">
                </label>
                <ul id="ulLyric">
                    <div class="lyric" id="responsiveLyric"><p id="currentLyricR"></p>
                    </div>
                </ul>
            </nav>
        </div>
        
        <!--================ ELEMENTOS DEL AREA DE LIRICA ================-->
        <div id="viewLyric">
            <button id="btnLyric1" onclick="temp.displayLyricA()">Lirica A</button>
            <button id="btnLyric2" onclick="temp.displayLyricB()">Lirica B</button>
            <button id="btnRedirect" onclick="redirect()">Lyric WebService</button> 
            <div class="lyric"><p id="currentLyric"></p> <p id="currentLyric2"></p></div>
        </div>
        
        <!-- VENTANA EMERGENTE PARA VER LOS CREDITOS  -->
        <div id="overlayBtnCredits" class="overlay">
            <div id="popupBtnCredits" class="popup">
                <p id="textCredits"></p>
                <button id="btnCloseCredits" onclick="temp.closeCredits()">Cerrar</button>
            </div>
        </div>
        
        <script>
            var temp = new ViewFunctions();
            temp.loadArtistsAndAlbums();
            temp.loadCheckedSongs();            
            var arrForDownload = [];
            
            function display(){resultsToSearch.style.display = "none";}
            function redirect(){document.location.href = "searchLyrics.jsp";}
            document.addEventListener("click",function(e){
                if(e.target.className.includes("inconstant") != true){
                    resultsToSearch.style.display = "none";
                }});

            objSong.ontimeupdate = function() {temp.timeOfSong()};
            objSong.onended = function() {temp.changeIconStateSong();};
            objSong.onpause = function() {temp.changeIconStateSong();}
            objSong.onplay = function() {temp.changeIconStateSong();}

        </script>
    </body>
</html>