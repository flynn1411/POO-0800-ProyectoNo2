<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Prueba de Canciones</title>
		
		<script src="../public/scripts/jquery.js"></script>
		<script src="index.js"></script>
	</head>
	<body onload="loadData();">
	
		<div id="songContainer">
			<h2 id="title">Song Title</h2><br>
			<h3 id="author">Author</h3><br>
			<h3 id="album">Album</h3><br>
			<audio id="objSong" src="../public/Library/Fazerdaze__Morningside__Lucky Girl.mp3" preload="metadata"></audio>
		</div>
		<div id="listContainer">
			<table id="songTable" border="1">
				<thead>
					<th>Titulo</th>
					<th>Autor</th>
					<th>Album</th>
				</thead>
				<tbody id="songInfo">
					
				</tbody>
			</table>
		</div>
	</body>
</html>