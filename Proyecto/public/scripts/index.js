function ViewFunctions(){
var state = 1;
var songsList = [];
var currentSong = objSong.src;
var pathOfLibrary = "http://localhost:8080/Proyecto2_v0.4/public/Library/";

//------------------ Muestra los artistas y albumes en la pagina. -----------------
this.loadArtistsAndAlbums = function(){
    var htmlArtists = '<body>',
        htmlAlbums= '<body>';
        arrOfArtists = [],
        arrOfAlbums = [];

    var action = "service.jsp";
    var callback = function(content){
    var jsonFIles = JSON.parse(content);    
    
    //Se llenan los arreglos de album y artistas sin dejar repetidos.
    var arrLibrary2 = jsonFIles.content;
    for(let inf in arrLibrary2){
        let current = arrLibrary2[inf];
        let fileName = `${current.artist}__${current.album}__${current.name}.mp3`;
        songsList.push(fileName);

        if(arrOfArtists.includes(current.artist) == false){
            arrOfArtists.push(current.artist);
        }
        if(arrOfAlbums.includes(current.album) == false){
            arrOfAlbums.push(current.album);
        }
    } 

    //Se agregan los albumes y artistas al html correspondiente.
    for(let artist in arrOfArtists){
        htmlArtists += `<tr><td>${arrOfArtists[artist]}</td></tr>`;
    }
    for(let album in arrOfAlbums){
        htmlAlbums += `<tr><td>${arrOfAlbums[album]}</td></tr>`;
    }
    
    //Se cierra el cuerpo del html de la tabla.
    htmlArtists += '</body>';
    htmlAlbums += '</body>';

    //Se agregar el html al contenido del objeto tabla.
    contentArtists.innerHTML = htmlArtists;
    contentAlbums.innerHTML = htmlAlbums;
    }
    $.get(action,callback);
    console.log(songsList);   
}

//----------------- Cargas las coincidencias de la libreria con el texto ingresado por el usuario. ---------
this.searchElement = function(){
    let enteredText = searchBox.value.toLowerCase();
    let html_ = '<body>';
    
    //Oculta y muestra la caja de resultados en caso que no haya nada ingresado.
    if(enteredText !=""){
        resultsToSearch.style.display = "inline-block";    
    }else{
        resultsToSearch.style.display = "none";
    }
    
    var action = "service.jsp";
    var callback = function(content){
    var jsonFIles = JSON.parse(content);
    //Recorre los elementos de un arreglo con las canciones de la libreria para agregarlas a la tabla de resultados.
    var arrLibrary2 = jsonFIles.content;
    for(i in arrLibrary2){
        let path = arrLibrary2[i].path;                                                             //Ruta en disco del archivo.
        let fileName = `${arrLibrary2[i].artist}__${arrLibrary2[i].album}__${arrLibrary2[i].name}.mp3`; //Nombre del archivo.
        let inf = `${arrLibrary2[i].name} ${arrLibrary2[i].artist} ${arrLibrary2[i].album}`;  
            inf = inf.toLowerCase();

        if(inf.indexOf(enteredText) != -1 && enteredText !=""){
            html_ += `<tr><td class="inconstant" onclick="playSong(this)" name="${fileName}"><input type="checkbox" value=${i} class="inconstant checked">${arrLibrary2[i].artist} - ${arrLibrary2[i].name}</td></tr>`;    
        }
    }
    html_ += '</body>';
    tableOfResults.innerHTML = html_;

    //Recorre toda la tabla para marcar los elementos que ya han sido seleccionados por el usuario.
    for(i=0; i<tableOfResults.rows.length; i++){
        let valueToRow = tableOfResults.rows[i].getElementsByTagName('td')[0].innerHTML.slice(60);
        let checkedElement = document.getElementsByClassName("checked");
        if(arrForDownload.includes(valueToRow)){
            checkedElement[i].checked = 1;
        }
    }
    }
    $.get(action,callback);
}

//Reproduce la cancion clickeada en la tabla de busqueda.
this.playSong = function(element){
    //console.log(objSong.src);
    let nameClickedSong = element.getAttribute('name'); 
    let songPath = `${pathOfLibrary}${nameClickedSong}`;
    //console.log(element.getAttribute('name'));
    objSong.src = songPath;
    state = 1;
    this.changeCurrentStateSong();
    objSong.play();
    currentSong = nameClickedSong;
    console.log(`Reproduciendo ahora:${currentSong}`);
}
//------------ Descarga los elementos seleccionados en el checkbox ----------------
this.downloadElements = function(){               
    /* console.log(array); */
    console.log(arrForDownload);
}

//Llamada para salvar todos los cambios o resultados mostrados en el area de busqueda.
this.saveChangesToResults = function(){
    var checkedElement = document.getElementsByClassName("checked");
    for(i in checkedElement){
        if(checkedElement[i].checked == true){
            let nameToElement = tableOfResults.rows[i].getElementsByTagName('td')[0].innerHTML.slice(60);
            if(arrForDownload.includes(nameToElement) != true){
                arrForDownload.push(nameToElement);
            }
        }
    }
}

this.getJsonToFiles = function(){
    var action = "service.jsp";
    var callback = function(content){
        //console.log(content.toString().trim());
        var jsonFIles = JSON.parse(content);
    }
    $.get(action,callback);
}
//Capitaliza un texto.
this.capitalize = function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}


//========================= FUNCIONES PARA LAS ACCIONES DE LAS CANCIONES ============================
//Funcion al clickear una cancion buscada.
this.playOrPauseSong = function(){
    this.changeCurrentStateSong();
}

//Reproduce la cancion siguiente.
this.playNextSong = function(){
    let indexCurrentSong = songsList.indexOf(currentSong);
    console.log(`---------EVENTO---------`);
    console.log(`1|ANTERIOR:${currentSong} - ${indexCurrentSong}`);
    if(indexCurrentSong != songsList.length-1){
        objSong.src = `${pathOfLibrary}${songsList[indexCurrentSong+1]}`;
        objSong.play();
        currentSong = songsList[indexCurrentSong+1]
    }else{
        objSong.src = `${pathOfLibrary}${songsList[0]}`;
        objSong.play();
        currentSong = songsList[0];
    }
    console.log(`2|ACTUAL:${currentSong} - ${songsList.indexOf(currentSong)}\n\n`);
}

//Reproducir la cancion anterior.
this.playBackSong = function(){
    let indexCurrentSong = songsList.indexOf(currentSong);
    console.log(`---------EVENTO---------`);
    console.log(`1|ANTERIOR:${currentSong} - ${indexCurrentSong}`);
    if(indexCurrentSong != 0){
        objSong.src = `${pathOfLibrary}${songsList[indexCurrentSong-1]}`;
        objSong.play();
        currentSong = songsList[indexCurrentSong-1];
    }else{
        console.log("-----Igual a 0---------");
        objSong.src = `${pathOfLibrary}${songsList[songsList.length-1]}`;
        objSong.play();
        currentSong = songsList[songsList.length-1];
    }
    console.log(`2|ACTUAL:${currentSong} - ${songsList.indexOf(currentSong)}\n\n`);
}

//Cambia el estado de una cancion entre pausada/reproduciendo el cambio incluye el icono.
this.changeCurrentStateSong = function(){
    if(state == 0){
        playIcon.src = "images/play_icon.png";
        objSong.pause();
    }
    if(state == 1){
        playIcon.src = "images/pause_icon.png";
        objSong.play();
    }

    if(state==0){state=1}else{state=0};
}

}    