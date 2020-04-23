function loadData(){
	//console.log("Antes de llegar al ajax");
	$.post("test.jsp", {"command":"retrieveSongs"}, function(content){
		//console.log(content.trim());
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
		/*let string = JSON.stringify(data.trim())
		
		let json = JSON.parse(string);*/
		
		const blob = b64toBlob(data.trim());
		console.log(blob);
		
		title.innerHTML = song.title;
		author.innerHTML = song.author;
		album.innerHTML = song.album;
		url = URL.createObjectURL(blob);
		console.log(url);
		objSong.src= url;
	});
	
}


const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
	  const byteCharacters = atob(b64Data);
	  const byteArrays = [];

	  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	    const slice = byteCharacters.slice(offset, offset + sliceSize);

	    const byteNumbers = new Array(slice.length);
	    for (let i = 0; i < slice.length; i++) {
	      byteNumbers[i] = slice.charCodeAt(i);
	    }

	    const byteArray = new Uint8Array(byteNumbers);
	    byteArrays.push(byteArray);
	  }

	  const blob = new Blob(byteArrays, {type: contentType});
	  return blob;
	}