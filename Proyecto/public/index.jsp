<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Pagina principal</title>
        <script src="script/index.js"></script>
        <script src="script/jquery.js"></script>

        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles/index.css">
        <link rel="shortcut icon" href="">
        <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Indie+Flower&display=swap" rel="stylesheet">

    </head>
    
    <!------- CUERPO DE LA PAGINA CON UN TEMA POR DEFECTO----------->
    <body class="default">

        <!--================ ELEMENTOS DEL AREA SUPERIOR ================-->
        <div id="head">
            <img src="images/home_icon3.png" id="homeIcon" class="icon">
            <input id="searchBox" class="inconstant" type="text" placeholder="Ingrese el nombre de la cancion, artista o album para buscar" onkeyup="searchElement()" onclick="saveChangesToResults()">
            <div id="resultsToSearch" class="inconstant">
                <table id="tableOfResults" class="inconstant">
                </table>
            </div>
            <img src="images/download_icon2.png" id="downloadIcon" class="icon" onclick="downloadElements()">
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
            <h1 id="textCurrentSong">You are so cool - Jonathan Bree</h1>
            <audio id="objSong" src="../song.mp3" controls></audio>
            <div id="controllers">
                <img id="playIcon" src="images/play_icon.png" onclick="playOrPauseSong()">
                <img id="nextIcon" src="images/next_icon.png" onclick="playNextSong()">
                <img id="previousIcon" src="images/previous_icon.png" onclick="playBackSong()">
            </div>
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
            var temp = new ViewFunctions();
            temp.loadArtistsAndAlbums();
            function playSong(element){temp.playSong(element);}
            function playOrPauseSong(){temp.playOrPauseSong();}
            function playNextSong(){temp.playNextSong();}
            function playBackSong(){temp.playBackSong();}
            function searchElement(){temp.searchElement();}
            function saveChangesToResults(){temp.saveChangesToResults();}
            function downloadElements(){temp.downloadElements();}

            var arrForDownload = [];
            document.addEventListener("click",function(e){
                //console.log(typeof(e.target.className));
                if(e.target.className.includes("inconstant") != true){
                    resultsToSearch.style.display = "none";
                    temp.saveChangesToResults();
                }
            });

        </script>
    </body>
</html>