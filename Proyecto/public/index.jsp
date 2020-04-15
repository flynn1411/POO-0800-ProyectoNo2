<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pagina principal</title>
        <script src="script/index.js"></script>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles/index.css">
        <link rel="shortcut icon" href="">
        <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet">
    </head>
    
    <!------- CUERPO DE LA PAGINA CON UN TEMA POR DEFECTO----------->
    <body class="default">

        <!--================ ELEMENTOS DEL AREA SUPERIOR ================-->
        <div id="head">
            <img src="images/home_icon3.png" id="homeIcon" class="icon">
            <input id="searchBox" class="inconstant" type="text" placeholder="Ingrese el nombre de la cancion, artista o album para buscar" onkeyup="searchElement()">
            <div id="resultsToSearch" class="inconstant">
                <table id="tableOfResults" class="inconstant">
                </table>
            </div>
            <img src="images/download_icon2.png" id="downloadIcon" class="icon" onclick="elementsToDownload()">
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
        
        <!--================ ELEMENTOS DEL AREA DE LIRICA ================-->
        <div id="viewInfo">
            <img src="images/sleepwalking.jpg" id="albumImage">
            <h1 id="textCurrentSong">You are so cool ? - Jonathan Bree</h1>
            <audio src="images/song.mp3" controls></audio>
            <div id="controllers"></div>
        </div>
        
        <!--================ ELEMENTOS DEL AREA DE INFORMACION DE CANCION ================-->
        <div id="viewLyric">
            <div id="lyric"><p>Body so fit
                So full of spark
                With affirmations
                As your wall art
                You were driven
                Eyes on the prize
                A yoga routine
                Home exercise
                <br><br>
                Now like the faded star
                In sunset blvd
                I play the devoted butler
                Morning coffees by the bed
                While all hard fought endeavours
                Bring in diminished returns
                You’re so cool, it’s true
                You’re my kind of girl
                Keep you ’til the end
                <br><br>
                Find solace in the privilege to pursue
                Most people are crushed into servitude</p></div>
        </div>


        <script>
            loadArtistsAndAlbums();
            var arrForDownload = [];
            //Al clickear fuera de los elementos detallados, para poder ocultar la caja de resultados de busqueda.
            function elementsToDownload(){
                downloadElements(arrForDownload);
            }
            document.addEventListener("click",function(e){
                //console.log(typeof(e.target.className));
                if(e.target.className.includes("inconstant") != true){
                    resultsToSearch.style.display = "none";
                    
                    var checkedElement = document.getElementsByClassName("checked");
                    for(i in checkedElement){
                        if(checkedElement[i].checked == true){
                            //console.log(checkedElement[i].value);
                            let nameToElement = tableOfResults.rows[i].getElementsByTagName('td')[0].innerHTML.slice(60);
                            if(arrForDownload.includes(nameToElement) != true){
                                arrForDownload.push(nameToElement);
                            }
                        }
                    }
                }
            });

        </script>
    </body>
</html>