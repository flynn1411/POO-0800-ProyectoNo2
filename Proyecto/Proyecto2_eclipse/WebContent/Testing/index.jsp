<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Prueba de Canciones</title>
		
		<script src="../public/scripts/jquery.js"></script>
	</head>
	<body onload="loadData();">
		<script type="text/javascript">
			function loadData(){
				$.post("test.jsp", {"command":"retrieveSongs"}, function(content){
					//console.log(content);
					var json = JSON.parse(content.replace(/\\/g,"\\\\"));
					
					var songs = json.result;
					
					tableInner = ``;
					
					for(song in songs){
						let currentSong = songs[song]; 
						tableInner += `<tr><td>\${currentSong.title}</td><td>\${currentSong.author}</td><td>\${currentSong.album}</td></tr>`;
					}
					console.log(tableInner);
					songInfo.innerHTML = tableInner;
					
					song = songs[1];
					title.innerHTML = song.title;
					author.innerHTML = song.author;
					album.innerHTML = song.album;
					objSong.src=`file:///\${song.path}`;
				});
				
				
			}
		</script>
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