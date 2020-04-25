function ViewFunctions(){
    
    //Variables inicializadas en un valor para determinar si una funcion se ejecuta por primera vez o no.
    var state = 1;
        stateLoad = 0;
        
    var volumeSave = 0,                                                                     //Guarda el volumen al mutearse.
        songsList = [],                                                                     //Guarda los nombres de los archivos de las canciones.
        currentSong,                                                          //Guarda la cancion reproduciendo actualmente.
        pathOfCurrentSong = "http://localhost:8080/CurrentSong",
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

        var action = "controllers/retrieveSongs.jsp",
            parameters = {"command":"retrieveSongs"},
            callback = function(content){
                var jsonSongFile = JSON.parse(content),    
                    arrLibrary2 = jsonSongFile.result.songs;
        
                for(let inf in arrLibrary2){
                    let current = arrLibrary2[inf];
                    let fileName = `${current.author}__${current.album}__${current.title}.mp3`;
                    songsList.push(fileName);

                    if(arrOfArtists.includes(current.author) == false){
                        arrOfArtists.push(current.author);
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
            };
            console.log(action);
        $.get(action,parameters,callback);
        console.log(songsList);   
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
        
        var action = "controllers/retrieveSongs.jsp";
        console.log(action);
            parameters = {"command":"retrieveSongs"};
            callback = function(content){
                var jsonSongFile = JSON.parse(content);
                var arrLibrary2 = jsonSongFile.result.songs;

                //Recorre los elementos de un arreglo con las canciones de la libreria para agregarlas a la tabla de resultados.
                for(i in arrLibrary2){
                    let fileName = `${arrLibrary2[i].author}__${arrLibrary2[i].album}__${arrLibrary2[i].title}.mp3`, //Nombre del archivo.
                        inf = `${arrLibrary2[i].title} ${arrLibrary2[i].author} ${arrLibrary2[i].album}`;  
                        inf = inf.toLowerCase();

                    if(inf.indexOf(enteredText) != -1 && enteredText !=""){
                        html_ += `<tr><td class="inconstant" onclick="playClickedSong(this)" name="${fileName}"><input type="checkbox" value=${i} class="inconstant checked" onclick="temp.saveChangesToResults()">${arrLibrary2[i].author} - ${arrLibrary2[i].title}</td></tr>`;    
                    }
                }
                html_ += '</body>';
                tableOfResults.innerHTML = html_;

                //Recorre toda la tabla para marcar los elementos que ya han sido seleccionados por el usuario.
                for(i=0; i<tableOfResults.rows.length; i++){
                    let valueToRow = tableOfResults.rows[i].getElementsByTagName('td')[0].getAttribute('name'),
                        checkedElement = document.getElementsByClassName("checked");
                    
                    console.log("ARREGLO A DESCARGAR: ",arrForDownload);
                    console.log("ELEMENTO A COMPARAR: ",valueToRow);
                    if(arrForDownload.includes(valueToRow)){
                        checkedElement[i].checked = 1;
                    }
                }
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
            };
        $.get(action,parameters,callback);

    }

    //------------ Descarga los elementos seleccionados en el checkbox ----------------
    this.downloadElements = function(){               
        console.log(arrForDownload);
        var action = "controllers/service.jsp";
                var parameters = {"command":"addToSession","option":"2"};
                var callback = function(content){
                    //console.log(content);
                }
                $.post(action,parameters,callback);
    }

    //Llamada para salvar todos los cambios o resultados mostrados en el area de busqueda.
    this.saveChangesToResults = function(){
        console.log("ENTRA PARA SALVAR LA CANCION");   
        var checkedElement = document.getElementsByClassName("checked");
        for(i in checkedElement){
            if(checkedElement[i].checked == true){
                console.log("CAMBIO AGREGADO PARA LA SESION");
                let nameToElement = tableOfResults.rows[i].getElementsByTagName('td')[0].getAttribute('name');
                if(arrForDownload.includes(nameToElement) != true){
                    arrForDownload.push(nameToElement);
                }
                var action = "controllers/service.jsp";
                var parameters = {"command":"addToSession","option":"1","fileName":nameToElement};
                var callback = function(content){
                    console.log(content);
                }
                $.post(action,parameters,callback);
            }
        }
    }

    //Funcion para actualizar la informacion a mostrar de la cancion actual.
    this.updateInfo = function(){
        var arrCurrentSong = currentSong.split('__');
        var fileAlbumName = `${arrCurrentSong[0]}_${arrCurrentSong[1]}`
        let state = false;
        let fileName;
        
        //Utilizando Ajax para obtener y verificar si aun existe el archivo cancion.
        var action = "controllers/retrieveSongs.jsp";
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
                //console.log(`FAILE: NombreAlbum :${fileAlbumName} - NombreArchivo: ${fileName}\n\n`);
                albumImage.src = `${pathOfAlbums}default.jpg`;
            }
            nameCurrentSong.innerHTML = `${arrCurrentSong[2].slice(0,-4)}`;
            artistCurrentSong.innerHTML = `${arrCurrentSong[0]}`;
        }
        $.get(action,parameters,callback);
        
    }

    //========================= FUNCIONES PARA LAS ACCIONES DE LOS CONTROLES ============================
    //Reproduce la cancion clickeada en la tabla de busqueda.
    this.playClickedSong = function(element){
        //console.log("ENTRA AL CLICKED")
        if(stateSong == false || objSong.paused == true){
            this.functionInterval(2);
            finishedSong = true;
            stateSong = true;
            this.playOrPauseSong();
            this.changeIconStateSong();
        }

        let nameClickedSong = element.getAttribute('name');
        this.updateNewCurrentSong(nameClickedSong);
        this.updateInfo();
        this.updateMaxProgress();
    }

    //Funcion al clickear el boton de play/pause.
    this.playOrPauseSong = function(){
        if(stateLoad == 0){
            //objSong.src =`${pathOfLibrary}${songsList[0]}`;
            currentSong =  songsList[0];
            //let values = this.getValues(currentSong);
            this.updateNewCurrentSong(currentSong);
            
            //this.changeIconStateSong();
            this.updateInfo();
            this.updateMaxProgress();
            stateLoad = 1;
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
        console.log("Reproduciendo ahora: ",songsList[indexCurrentSong+1]);
        let indexToNewCurrentSong; 
        
        if(indexCurrentSong != songsList.length-1){
            indexToNewCurrentSong = indexCurrentSong + 1; 
        }else{
            indexToNewCurrentSong = 0;
        }

        //let values = this.getValues();
        this.updateNewCurrentSong(songsList[indexToNewCurrentSong]);
        this.updateInfo();
        this.updateMaxProgress();
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
        let indexToNewCurrentSong;

        if(indexCurrentSong != 0){
            indexToNewCurrentSong = indexCurrentSong-1;
        }else{
            indexToNewCurrentSong = songsList.length-1;
        }

        //let values = this.getValues();
        this.updateNewCurrentSong(songsList[indexToNewCurrentSong]);
        this.updateInfo();
        this.updateMaxProgress();
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
    
//============================= FIN DE ACCIONES DE LOS CONTROLES =================================

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
    
    //Funcion que extraer un archivo local y lo convierte a blub luego lo crea en objeto URL.
    this.updateNewCurrentSong = function(fileName){
        let values = this.getValues(fileName);
        let title = values[0];
        let author = values[1];
        let album = values[2];
        var action = "controllers/setCurrentSong.jsp";
        var parameters = {"command":"setCurrentSong","title":title,"author":author,"album":album};
        var callback = function(content){
        	console.log(content);
        	let result = JSON.parse(content.trim());
        	
        	if(result.status === "Success"){
        		objSong.src= `${pathOfCurrentSong}/${result.songFile}`;
        		objSong.play();
        		albumImage.src = `${pathOfCurrentSong}/${result.artworkFile}`;
        			progressBar.value = 0;
        		inputProgressBar.value = "0";
        		stateSong = true;
        	}
            
        }

        $.post(action,parameters,callback);
    }

    //Separa y extrae los valores de un nombre de archivo con formato Artista_Album_Nombre.mp3.
    this.getValues = function(fileName){
        let tempValue = fileName.split('__');
        let title = tempValue[2].split(".mp3")[0];
        let album = tempValue[1];
        let author = tempValue[0];
        currentSong = fileName;
        return [title,author,album];
    }

    //Capitaliza un texto.
    this.capitalize = function(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
}    