<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="styles/searchLyrics.css">
<title>Buscador de Liricas</title>

</head>
<body>
	<script src="scripts/jquery.js"></script>
	
	<div id="searchArea">
        <a href="index.jsp">
            <img src="styles/themes/Neon2020/home_icon3.png" class="topIcon">
        </a>
        <input type="text" id="artist" class="searchBox" placeholder="Ingrese el Artista">
        <input type="text" id="title" class="searchBox" placeholder="Ingrese la Canción">
        <input type="button" id="btn" onclick="lyrics()"value="Buscar">
    </div>

    <div id="viewArea">
        <div id="methodA" class="lyricArea">
        <h2>Método A</h2>
            <div class="content">
                <p class="lyric" id="lyricA">
                </p>
            </div>
        </div>

        <div id="methodB" class="lyricArea">
        	<h2>Método B</h2>    
            <div class="content">
                <p class="lyric" id="lyricB">
                </p>
            </div>
        </div>
    </div>
    
	<script type="text/javascript">
		function lyrics(){
			
			var artist = document.getElementById("artist").value;
			var title = document.getElementById("title").value;
			
			$.post("controllers/soapController.jsp",{"artist":artist,"title":title,"command":"api"},function(data){
				var json = JSON.parse(data);
				document.getElementById("lyricA").innerHTML = json.lyrics;
			});
			$.post("controllers/soapController.jsp",{"artist":artist,"title":title,"command":"az"},function(data){
				var json = JSON.parse(data);
				document.getElementById("lyricB").innerHTML = json.Lyrics;
			});
			
		}
	</script>    
	
</body>
</html>