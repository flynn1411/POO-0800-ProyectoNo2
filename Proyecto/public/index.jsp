<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pagina principal</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/index.css">
    <link rel="shortcut icon" href="">
    <link href="https://fonts.googleapis.com/css?family=Oswald&display=swap" rel="stylesheet">
</head>
<body class="default">

    <!-- ELEMENTOS DEL AREA SUPERIOR -->
    <div id="head">
        <img src="images/home_icon3.png" id="homeIcon" class="icon">
        <input id="searchBox" type="text" placeholder="Ingrese el nombre de la cancion, artista o album para buscar">
        <img src="images/download_icon2.png" id="downloadIcon" class="icon">
    </div>

    <!-- ELEMENTOS DE VISUALIZACION ARTISTAS Y ALBUMES-->
    <div id="viewAlbumAndArtist">
    
        <!-- Area de artistas-->
        <a id="titleArtist">Artistas</a>
        <div id="artist">
            <table id="contentArtists" class="tableContent">
            </table>
        </div>
    
        <!-- Area de albumes-->
        <a id="titleAlbum">Albumes</a>
        <div id="album">
            <table id="contentAlbums" class="tableContent">
            </table>
        </div>
    
    </div>
    
    <!-- ELEMENTOS DEL AREA DE LIRICA -->
    <div id="viewInfo">
        <img src="images/thewall_album.jpg" id="albumImage">
        <h1 id="textCurrentSong">In the Flesh ? - Pink Floyd</h1>
        <audio src="images/song.mp3" controls></audio>
    </div>
    
    <!-- ELEMENTOS DEL AREA DE INFORMACION DE CANCION -->
    <div id="viewLyric">
        <div id="lyric"><p>So ya thought ya might like to
            Go to the show
            To feel the warm thrill of confusion
            That space cadet glow
            <br><br>
            I've got some bad news for you, sunshine
            Pink isn't well, he stayed back at the hotel
            And they sent us along as a surrogate band
            And we're going to find out where you fans really stand
            <br><br>
            Are there any queers in the theatre tonight?
            Get 'em up against the wall!
            Now that one in the spotlight, he don't look right to me
            Get him up against the wall!
            <br><br>
            That one looks Jewish!
            And that one's a coon!
            Who let all this riff-raff into the room?
            <br><br>
            There's one smoking a joint!
            And another with spots!
            If I had my way I'd have all of you shot!</p></div>
    </div>


    <script>
        var html = '<body>';
        
            for(i=0;i<5;i++){
            html += `<tr><td>Gorillaz</td></tr>`;
        }
        
        html += '</body>';
        contentArtists.innerHTML = html;
    
        var html2 = '<body>';

        for(i=0;i<5;i++){
            html2 += `<tr><td>Dark Side of the Moon</td></tr>`;
        }
        
        html2 += '</body>';
        contentAlbums.innerHTML = html2;
    </script>
</body>
</html>