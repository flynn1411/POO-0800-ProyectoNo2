function loadData(){
	//console.log("Antes de llegar al ajax");
	$.post("test.jsp", {"command":"retrieveSongs"}, function(content){
		//console.log(content);
		var json = JSON.parse(content.replace(/\\/g,"\\\\"));
					
		var songs = json.result.songs;
					
		tableInner = ``;
					
		for(song in songs){
			let currentSong = songs[song]; 
			tableInner += `<tr><td>${currentSong.title}</td><td>${currentSong.author}</td><td>${currentSong.album}</td></tr>`;
		}
		//console.log(tableInner);
		songInfo.innerHTML = tableInner;
		setSong(songs);
		
	});
					
}

function setSong(songs = []){
	let song = songs[1];
	let param = {"command":"getSong","title":song.title,"author":song.author,"album":song.album};
	//console.log(param);
	$.post("test.jsp",param, function(data){
		console.log(data);
		
		title.innerHTML = song.title;
		author.innerHTML = song.author;
		album.innerHTML = song.album;
		objSong.src=`file:///${song.path}`;
	});
	
}