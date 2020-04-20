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
        progress,
        inputBar,
        stateSong = false,
        finishedSong = false;                                                                                //Se guarda un setInterval de la barra de progreso.
    
    //------------------ Muestra los artistas y albumes y otros elementos iniciales en la pagina. -----------------
    this.loadArtistsAndAlbums = function(){
        objSong.volume = 0.5;
        //volumenIcon.src = "images/volumen_icon2.png";
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
        console.log("ENTRA AL CLICKED")
        if(stateSong == false || objSong.paused == true){
            this.functionInterval(2);
            finishedSong = true;
            stateSong = true;
            this.playOrPauseSong();
            this.changeIconStateSong();
        }

        progressBar.value = 0;                                      //Se reinicia la barra de progreso.
        inputProgressBar.value = "0";
        let nameClickedSong = element.getAttribute('name'),
            songPath = `${pathOfLibrary}${nameClickedSong}`;

        console.log("Dentro del metadata",objSong.duration);
        objSong.src = songPath;
        objSong.play();            
        
        /* objSong.onloadedmetadata = function() {    
            console.log("Dentro del metadata",objSong.duration);
            objSong.src = songPath;
            objSong.play();
        } */
        this.updateMaxProgress();
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
        //console.log("Cancion Actual: ",currentSong);
        var arrCurrentSong = currentSong.split('__');
        var fileAlbumName = `${arrCurrentSong[0]}_${arrCurrentSong[1]}`
        let state = false;
        let fileName;
        
        //Utilizando Ajax para obtener y verificar si aun existe el archivo cancion.
        var action = "service.jsp";
        var parameters = {"command":"getJsonAlbums"};
        var callback = function(content){
            var jsonAlbumFile = JSON.parse(content.trim());
            var arrAlbumLibrary = jsonAlbumFile.content;
    
            for(file in arrAlbumLibrary){
                var currentFile = arrAlbumLibrary[file];
                //let path = currentFile.path;                                                             //Ruta en disco del archivo.
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
            nameCurrentSong.innerHTML = `${arrCurrentSong[2].slice(0,-4)}`;
            artistCurrentSong.innerHTML = `${arrCurrentSong[0]}`;
        }
        $.get(action,parameters,callback);
        
    }

    //Capitaliza un texto.
    this.capitalize = function(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    //========================= FUNCIONES PARA LAS ACCIONES DEL CONTROLADOR ============================
    //Funcion al clickear el boton de play/pause.
    this.playOrPauseSong = function(){
        if(stateLoad == 0){
            objSong.src =`${pathOfLibrary}${songsList[0]}`;
            currentSong =  songsList[0];
            inputProgressBar.value = "0";
    
            this.updateInfo();
            this.updateMaxProgress();
            stateLoad = 1;
            stateSong = true;
        }
        //En caso que la cancion ya finalizo se reestablece los valores de progreso de cancion.
        if(finishedSong == true){
            progressBar.value = 0;
            objSong.currentTime = 0;    
            inputProgressBar.value = "0";
            finishedSong = false;
            stateSong = true;
        }
        //Si hay que reproducir la cancion.
        if(stateSong == true){
            objSong.play();
            this.functionInterval(1);
        }
        //Si hay que pausar la cancion.
        if(stateSong == false){
            objSong.pause();
            this.functionInterval(2);
        }
        //Cambia el valor entre pause/play.
        if(stateSong==true){stateSong=false}else{stateSong=true};
        this.changeIconStateSong();
    }

    //Funcion al clickear el icono de cancion siguiente.
    this.playNextSong = function(){
        //Reproduce automaticamente en caso que haya estado pausado en la cancion anterior.
        if(stateSong == false || objSong.paused == true){
            this.functionInterval(2);
            finishedSong = true;
            stateSong = true;
            this.playOrPauseSong();
            this.changeIconStateSong();
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

    //Funcion al clickear el icono de cancion anterior.
    this.playBackSong = function(){
        if(stateSong == false || objSong.paused == true){
            this.functionInterval(2);
            finishedSong = true;
            stateSong = true;
            this.playOrPauseSong();
            this.changeIconStateSong();
        }

        let indexCurrentSong = songsList.indexOf(currentSong);
        progressBar.value = 0;
        inputProgressBar.value = "0"; 

        if(indexCurrentSong != 0){
            objSong.src = `${pathOfLibrary}${songsList[indexCurrentSong-1]}`;
            objSong.play();
            currentSong = songsList[indexCurrentSong-1];
        }else{
            objSong.src = `${pathOfLibrary}${songsList[songsList.length-1]}`;
            objSong.play();
            currentSong = songsList[songsList.length-1];
        }
        this.updateInfo();
        this.updateMaxProgress();
    }

    //Funcion que permite cambiar el volumen de la cancion con la input[range].
    this.changeValueVolume = function(element){
        var newVolume = parseInt(element.value)/100;
        objSong.volume = newVolume;
        console.log("NEW VOLUMEN: ",objSong.volume);
        volumeSave = newVolume;

        if(newVolume == 0){
            volumenIcon.src = "images/volumen_icon2.png";
        }else{
            volumenIcon.src = "images/volumen_icon.png";
        }

    }

    //Funcion para mutear un cancion al hacer click en el icono de volumen.
    this.muteSong = function(){
        if(objSong.volume != 0){
            volumeSave = objSong.volume;
            objSong.volume = 0; 
            volumenIcon.src = "images/volumen_icon2.png";
            currentVolumeBar.value = "0";
        }else{
            if(volumeSave == 0){
                volumeSave = 0.5;
            }
            objSong.volume = volumeSave;
            volumenIcon.src = "images/volumen_icon.png";
            currentVolumeBar.value = (volumeSave*100).toString();
        }
    }
    
    //Cambia un icono dependiendo del estado play/pause de la cancion.
    this.changeIconStateSong = function(){
        if(objSong.paused == true){
            playIcon.src = "images/play_icon.png";
        }
        if(objSong.paused == false){
            playIcon.src = "images/pause_icon.png";
        }        
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
    
    //Obtiene el tiempo que ha transcurrido la cancion para mostrarla en la barra de controles.
    this.timeOfSong = function(){
        if(objSong.paused == false){
            currentTime.innerHTML = this.transformTime(parseInt(objSong.currentTime));
            duration.innerHTML = this.transformTime(parseInt(objSong.duration)); 
        }
        if(objSong.currentTime == objSong.duration && 
            parseInt(inputProgressBar.value) == parseInt(inputProgressBar.max)){
            
            //------- CUANDO LA CANCION HA FINALIZADO ----------
            console.log('-----Cancion Finalizada------');
            currentTime.innerHTML = this.transformTime(parseInt(objSong.currentTime));
            finishedSong = true;
            objSong.pause();
            stateSong = false;
            this.functionInterval(2);
            this.changeIconStateSong();
        }
    }
    
    //Actualiza el maximo de la barra de progreso.
    this.updateMaxProgress = function(){
        objSong.onloadedmetadata = function() {
            //au.duration;
            //console.log("Dentro UPDATE: ",objSong.duration);
            progressBar.max = objSong.duration.toString();
            inputProgressBar.max = objSong.duration.toString();
        };
    }
    //Va cambiando el relleno de la barra de progreso acorde a la cancion.
    this.changeProgressBar = function(){ 
        progressBar.value = progressBar.value + 0.05;
    }
    
    //Va cambiando el valor del input[range] del progreso acorde a la cancion.
    this.changeInputProgressBar = function(){
        //console.log(`Progreso actual: ${inputProgressBar.value} - MAX: ${inputProgressBar.max}`);
        if(parseInt(inputProgressBar.value) < parseInt(inputProgressBar.max)){
            var tempTime = parseFloat(inputProgressBar.value) + 1;
            inputProgressBar.value = tempTime.toString();
        }
    }

    //Lee el cambio realizado a la barra de progreso.
    this.changeProgressSong = function(element){
        progressBar.value = parseInt(element.value);
        objSong.currentTime = parseInt(element.value);
    }

    //Establece o limpia la ejecucion de funciones con intervalos.
    this.functionInterval = function(option){
        if(option == 1){
            progress = setInterval("temp.timeOfSong()",1000);
            bar = setInterval("temp.changeProgressBar()",50);
            inputBar = setInterval("temp.changeInputProgressBar()",1000);
        }
        if(option == 2){
            clearInterval(bar);
            clearInterval(progress);
            clearInterval(inputBar);
        }
    }    
}    