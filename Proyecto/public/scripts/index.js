function ViewFunctions(){
    //Variables inicializadas en un valor para determinar si una funcion se ejecuta por primera vez o no.
    var state = 1;
        stateLoad = 0;
        
    var volumeSave = 0,                                                                     //Guarda el volumen al mutearse.
        songsList = [],                                                                     //Guarda los nombres de los archivos de las canciones.
        currentSong,                                                          //Guarda la cancion reproduciendo actualmente.
        pathOfLibrary = "http://localhost:8080/Proyecto2_v0.5/public/Library/",             //Ruta temporal de la libreria.
        pathOfAlbums = "http://localhost:8080/Proyecto2_v0.5/public/Library/Albums/",       //Ruta temporal de los albumes.
        bar,
        inputBar;                                                                                //Se guarda un setInterval de la barra de progreso.
    
    //------------------ Muestra los artistas y albumes y otros elementos iniciales en la pagina. -----------------
    this.loadArtistsAndAlbums = function(){
        objSong.volume = 0;
        volumenIcon.src = "images/volumen_icon2.png";
        var htmlArtists = '<body>',
            htmlAlbums= '<body>';
            arrOfArtists = [],
            arrOfAlbums = [];

        var action = "service.jsp",
            parameters = {"command":"getJsonSongs"},
            callback = function(content){
                var jsonSongFile = JSON.parse(content),    
                    arrLibrary2 = jsonSongFile.content;

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
                objSong.src =`${pathOfLibrary}${songsList[0]}`;
            };
        $.get(action,parameters,callback);
        //console.log(songsList);   
    }

    //----------------- Cargas las coincidencias de la libreria con el texto ingresado por el usuario. ---------
    this.searchElement = function(){
        let enteredText = searchBox.value.toLowerCase();                                   //Texto ingreso por el usuario.
        let html_ = '<body>';
        
        //Oculta y muestra la caja de resultados en caso que no haya nada ingresado.
        if(enteredText !=""){                                                               //Si la caja input no esta vacia.
            resultsToSearch.style.display = "inline-block";    
        }else{
            resultsToSearch.style.display = "none";
        }
        
        var action = "service.jsp";
            parameters = {"command":"getJsonSongs"};
            callback = function(content){
                var jsonSongFile = JSON.parse(content);
                var arrLibrary2 = jsonSongFile.content;

                //Recorre los elementos de un arreglo con las canciones de la libreria para agregarlas a la tabla de resultados.
                for(i in arrLibrary2){
                    let fileName = `${arrLibrary2[i].artist}__${arrLibrary2[i].album}__${arrLibrary2[i].name}.mp3`, //Nombre del archivo.
                        inf = `${arrLibrary2[i].name} ${arrLibrary2[i].artist} ${arrLibrary2[i].album}`;  
                        inf = inf.toLowerCase();

                    if(inf.indexOf(enteredText) != -1 && enteredText !=""){
                        html_ += `<tr><td class="inconstant" onclick="playClickedSong(this)" name="${fileName}"><input type="checkbox" value=${i} class="inconstant checked">${arrLibrary2[i].artist} - ${arrLibrary2[i].name}</td></tr>`;    
                    }

                }
                
                html_ += '</body>';
                tableOfResults.innerHTML = html_;

                //Recorre toda la tabla para marcar los elementos que ya han sido seleccionados por el usuario.
                for(i=0; i<tableOfResults.rows.length; i++){
                    let valueToRow = tableOfResults.rows[i].getElementsByTagName('td')[0].innerHTML.slice(60),
                        checkedElement = document.getElementsByClassName("checked");
                    
                    if(arrForDownload.includes(valueToRow)){
                        checkedElement[i].checked = 1;
                    }
                }
            };
        $.get(action,parameters,callback);
    
    }

    //Reproduce la cancion clickeada en la tabla de busqueda.
    this.playClickedSong = function(element){
        progressBar.value = 0;                                      //Se reinicia la barra de progreso.
        inputProgressBar.value = "0";
        let nameClickedSong = element.getAttribute('name'),
            songPath = `${pathOfLibrary}${nameClickedSong}`;
        
        objSong.src = songPath;
        state = 1;
        currentSong = nameClickedSong;
        console.log("Dentro del Pause: ",objSong.duration);
        this.changeCurrentStateSong();
        this.updateInfo();
        this.updateMaxProgress();
        this.runTime();
        //objSong.play();
        
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

    //Funcion para actualizar la informacion a mostrar de la cancion actual.
    this.updateInfo = function(){
        console.log("Cancion Actual: ",currentSong);
        var arrCurrentSong = currentSong.split('__');
        var fileAlbumName = `${arrCurrentSong[0]}_${arrCurrentSong[1]}`
        let state = false;
        let fileName;
        
        var action = "service.jsp";
        var parameters = {"command":"getJsonAlbums"};
        var callback = function(content){
            var jsonAlbumFile = JSON.parse(content.trim());
            //console.log(jsonAlbumFile);
        var arrAlbumLibrary = jsonAlbumFile.content;
            for(file in arrAlbumLibrary){
                var currentFile = arrAlbumLibrary[file];
                let path = currentFile.path;                                                             //Ruta en disco del archivo.
                //console.log(path);
                fileName = `${currentFile.artist}_${currentFile.album}.jpg`; //Nombre del archivo.
                if(fileName.toLowerCase().indexOf(fileAlbumName.toLowerCase()) != -1){                
                    state = true;
                    break;
                }
            }
            if(state == true){
                albumImage.src = `${pathOfAlbums}${fileName}`;
            }else{
                console.log(`FAILE: NombreAlbum :${fileAlbumName} - NombreArchivo: ${fileName}\n\n`);
                albumImage.src = `${pathOfAlbums}default.jpg`;
            }
            nameCurrentSong.innerHTML = `${arrCurrentSong[2]}`;
            artistCurrentSong.innerHTML = `${arrCurrentSong[0]}`;
        }
        $.get(action,parameters,callback);
        
    }

    //Capitaliza un texto.
    this.capitalize = function(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }


    //========================= FUNCIONES PARA LAS ACCIONES DE LAS CANCIONES ============================
    //Funcion al clickear una cancion buscada.
    this.playOrPauseSong = function(){
        if(stateLoad == 0){
            objSong.src =`${pathOfLibrary}${songsList[0]}`;
            currentSong =  songsList[0];
            inputProgressBar.value = "0";
            this.updateInfo();
            this.updateMaxProgress();
            stateLoad = 1;
        }
        if(parseInt(inputProgressBar.value) == parseInt(inputProgressBar.max)){
            inputProgressBar.value = "0";
            progressBar.value = 0;
            objSong.currentTime = 0;
        }
        this.changeCurrentStateSong();
        this.runTime();

    }

    //Reproduce la cancion siguiente.
    this.playNextSong = function(){
        //Reproduce automaticamente en caso que haya estado pausado en la cancion anterior.
        if(state == 1){
            playIcon.src = "images/pause_icon.png";
            objSong.play();
            state = 0;
        }

        let indexCurrentSong = songsList.indexOf(currentSong);
        progressBar.value = 0;
        inputProgressBar.value = "0";
        if(indexCurrentSong != songsList.length-1){
            objSong.src = `${pathOfLibrary}${songsList[indexCurrentSong+1]}`;
            currentSong = songsList[indexCurrentSong+1];
            this.updateMaxProgress();
            objSong.play();
        }else{
            objSong.src = `${pathOfLibrary}${songsList[0]}`;
            objSong.play();
            currentSong = songsList[0];
            this.updateMaxProgress();
        }
        this.updateInfo();

    }

    //Reproducir la cancion anterior.
    this.playBackSong = function(){
        if(state == 1){
            playIcon.src = "images/pause_icon.png";
            objSong.play();
            state = 0;
        }
        
        let indexCurrentSong = songsList.indexOf(currentSong);
        progressBar.value = 0;
        inputProgressBar.value = "0"; 

        if(indexCurrentSong != 0){
            objSong.src = `${pathOfLibrary}${songsList[indexCurrentSong-1]}`;
            objSong.play();
            currentSong = songsList[indexCurrentSong-1];
        }else{
            //console.log("-----Igual a 0---------");
            objSong.src = `${pathOfLibrary}${songsList[songsList.length-1]}`;
            objSong.play();
            currentSong = songsList[songsList.length-1];
        }
        //console.log(`Reproduciendo: ${currentSong} - ${songsList.indexOf(currentSong)}\n\n`);
        this.updateInfo();
        this.updateMaxProgress();
    }

    //Funcion para mutear un cancion al hacer click en el icono de volumen.
    this.muteSong = function(){
        console.log("Silenciado");
        if(objSong.volume != 0){
            volumeSave = objSong.volume;
            objSong.volume = 0; 
            volumenIcon.src = "images/volumen_icon2.png";
        }else{
            if(volumeSave == 0){
                volumeSave = 0.5;
            }
            objSong.volume = volumeSave;
            volumenIcon.src = "images/volumen_icon.png";
        }
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

    //Obtiene el tiempo que ha transcurrido la cancion para mostrarla en la barra de controles.
    this.timeOfSong = function(){
        if(objSong.paused == false){
            currentTime.innerHTML = this.transformTime(parseInt(objSong.currentTime));
            duration.innerHTML = this.transformTime(parseInt(objSong.duration)); 
        }
    }

    //Va cambiando el relleno de la barra de progreso acorde a la cancion.
    this.changeProgressBar = function(){ 
        progressBar.value = progressBar.value + 0.05;
    }
    
    //Va cambiando el relleno del input[range] de; progreso acorde a la cancion.
    this.changeInputProgressBar = function(){
        console.log(`Progreso actual: ${inputProgressBar.value} - MAX: ${inputProgressBar.max}`);
        if(parseInt(inputProgressBar.value) < parseInt(inputProgressBar.max)){
            var tempTime = parseFloat(inputProgressBar.value) + 1;
            inputProgressBar.value = tempTime.toString();
        }else{
            this.changeCurrentStateSong();
            this.runTime();
        }
        console.log("Progress Point: ",inputProgressBar.value);
    }

    //Transforma segundos a formato [min]:[seg]. 
    this.transformTime = function(seconds){
        var minute = Math.floor((seconds / 60) % 60);
            minute = (minute < 10)? minute : minute;
            minute = (minute >=10)? '0' + minute : minute;
        var second = seconds % 60;
            second = (second < 10)? '0' + second : second;
            return minute + ':' + second;
    }

    //Funcion que permite reaundar o detener el tiempo de la cancion y la barra de progreso.
    this.runTime = function(){
        let progress = setInterval("temp.timeOfSong()",1000);
        
        if(objSong.paused == false){
                    clearInterval(bar);
                    bar = setInterval("temp.changeProgressBar()",50);
                    inputBar = setInterval("temp.changeInputProgressBar()",1000);
                }else{
                    console.log("Detiene el intervalo")
                    clearInterval(progress);
                    clearInterval(bar);
                    clearInterval(inputBar);
                }
    }

    this.updateMaxProgress = function(){
        objSong.onloadedmetadata = function() {
            //au.duration;
            //console.log("Dentro UPDATE: ",objSong.duration);
            progressBar.max = objSong.duration.toString();
            inputProgressBar.max = objSong.duration.toString();
            console.log("----------------------------");
            console.log("MaxDuration: ",objSong.duration);
            console.log("MaxInputBar :",inputProgressBar.max);
            console.log("MaxProgressBar :",progressBar.max);
            console.log("----------------------------");
        };
    }

    //Lee el cambio realizado a la barra de progreso.
    this.changeProgressSong = function(element){
        progressBar.value = parseInt(element.value);
        objSong.currentTime = parseInt(element.value);
    }
}    