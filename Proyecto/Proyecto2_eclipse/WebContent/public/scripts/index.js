function ViewFunctions(){
    
    //Variables inicializadas en un valor para determinar si una funcion se ejecuta por primera vez o no.
    var volumeSave = 0,                                                                     //Guarda el volumen al mutearse.
        songsList = [],                                                                     //Guarda los nombres de los archivos de las canciones.
        currentSong,                                                          //Guarda la cancion reproduciendo actualmente.
        pathOfCurrentSong = "http://localhost:8080/CurrentSong",
        firstInteraction = false;
        objSong.volume = 0.5;
    
        //------------------ Muestra los artistas y albumes y otros elementos iniciales en la pagina. -----------------
    this.loadArtistsAndAlbums = function(){
        var htmlArtists = '<body>',
            htmlAlbums= '<body>';
            arrOfArtists = [],
            arrOfAlbums = [];

        var action = "controllers/retrieveSongs.jsp",
            parameters = {"command":"retrieveSongs"},
            callback = function(content){
                var jsonSongFile = JSON.parse(content),    
                    arrLibrary2 = jsonSongFile.result.songs,
                    typeFileSong = "mp3";
                
                for(let inf in arrLibrary2){
                    let current = arrLibrary2[inf],
                        fileName = `${current.author}__${current.album}__${current.title}.${typeFileSong}`;
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
        $.get(action,parameters,callback);   
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
        
        var action = "controllers/retrieveSongs.jsp",
            parameters = {"command":"retrieveSongs"},
            callback = function(content){
                var jsonSongFile = JSON.parse(content),
                    arrLibrary2 = jsonSongFile.result.songs 
                
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
            
                    if(arrForDownload.includes(valueToRow)){
                        checkedElement[i].checked = 1;
                    }
                }
            };
        $.get(action,parameters,callback);

    }

    //========================= FUNCIONES PARA LAS ACCIONES DE LOS CONTROLES ============================
    //Reproduce la cancion clickeada en la tabla de busqueda.
    this.playClickedSong = function(element){
        firstInteraction = true;
        let nameClickedSong = element.getAttribute('name');
        this.updateNewCurrentSong(nameClickedSong);
    }

    //Funcion al clickear el boton de play/pause.
    this.playOrPauseSong = function(){
        //En caso que se clickee cuando no hay ninguna cancion seleccionada, por defecto reproduce la primera de la lista.
        if(firstInteraction == false){
            currentSong = songsList[0];
            this.updateNewCurrentSong(currentSong);
            firstInteraction = true;
        }
        //Pausa o reproduce, dependiendo del estado actual.
        if(objSong.paused == false){
            objSong.pause();
        }else{
            objSong.play();
        }

    }

    //Funcion al clickear el icono de cancion siguiente.
    this.playNextSong = function(){
        this.loadStateFirstInteraction();
        let indexCurrentSong = songsList.indexOf(currentSong),
            indexToNewCurrentSong; 
        
        if(indexCurrentSong != songsList.length-1){
            indexToNewCurrentSong = indexCurrentSong + 1; 
        }else{
            indexToNewCurrentSong = 0;
        }

        this.updateNewCurrentSong(songsList[indexToNewCurrentSong]);
    }

    //Funcion al clickear el icono de cancion anterior.
    this.playBackSong = function(){
        this.loadStateFirstInteraction();
        let indexCurrentSong = songsList.indexOf(currentSong),
            indexToNewCurrentSong;

        if(indexCurrentSong != 0){
            indexToNewCurrentSong = indexCurrentSong-1;
        }else{
            indexToNewCurrentSong = songsList.length-1;
        }
        this.updateNewCurrentSong(songsList[indexToNewCurrentSong]);

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
    
//============================= FUNCIONES AUXILIARES DE LOS CONTROLES =================================
    //------------ Descarga los elementos seleccionados en el checkbox ----------------
    this.downloadElements = function(){               
        console.log(arrForDownload);
        var action = "controllers/sessionManager.jsp",
            parameters = {"command":"addToSession","option":"2"},
            callback = function(content){
                    console.log(content);
            };
            $.post(action,parameters,callback);
    }

    //Llamada para salvar todos los cambios o resultados mostrados en el area de busqueda.
    this.saveChangesToResults = function(){
        var checkedElement = document.getElementsByClassName("checked");
        for(i in checkedElement){
            if(checkedElement[i].checked == true){
                let nameToElement = tableOfResults.rows[i].getElementsByTagName('td')[0].getAttribute('name');
                if(arrForDownload.includes(nameToElement) != true){
                    arrForDownload.push(nameToElement);
                }

                var action = "controllers/sessionManager.jsp",
                    parameters = {"command":"addToSession","option":"1","fileName":nameToElement},
                    callback = function(content){
                        //console.log(content);
                    };
                $.post(action,parameters,callback);
            
            }
        }
    }

//Funcion que permite cambiar el volumen de la cancion con la input[range].
    this.changeValueVolume = function(element){
        var newVolume = parseInt(element.value)/100;
        objSong.volume = newVolume;
        volumeSave = newVolume;

        if(newVolume == 0){
            volumenIcon.src = "images/volumen_icon2.png";
        }else{
            volumenIcon.src = "images/volumen_icon.png";
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
        
    //Lee el cambio realizado a la barra de progreso.
    this.changeProgressSong = function(element){
        progressBar.value = parseInt(element.value);
        objSong.currentTime = parseInt(element.value);
    }

    //Estable los cancions de la barra de progreso acorde al transcuro de la cancion.
    this.timeOfSong = function(){
        //progressBar - Int            inputProgressBar - String            currentTime - Int
        progressBar.value = Math.floor(objSong.currentTime);
        inputProgressBar.value = Math.floor(objSong.currentTime).toString();
        currentTime.innerHTML = this.transformTime(parseInt(objSong.currentTime));
        if(isNaN(objSong.duration) == false){
            duration.innerHTML = this.transformTime(parseInt(objSong.duration));
        }else{
            duration.innerHTML = "0:00";
        }
    }
    
    //Funcion que primeramente coloca la cancion a reproducir en el directorio tomcat/webapps/ROOT/CurrentSong y
    //borra la cancion anterior, pero luego acceder a ella y reproducirla.
    this.updateNewCurrentSong = function(fileName){
        let values = this.getValues(fileName);
            title = values[0],
            author = values[1],
            album = values[2];
        
        var action = "controllers/setCurrentSong.jsp",
            parameters = {"command":"setCurrentSong","title":title,"author":author,"album":album},
            callback = function(content){
                //console.log(content);
                let result = JSON.parse(content.trim());

                if(result.status === "Success"){
                    objSong.src= `${pathOfCurrentSong}/${result.songFile}`;
                    objSong.play();
                    nameCurrentSong.innerHTML = title;
                    artistCurrentSong.innerHTML = author; 
                    updateMaxProgress();
                    if(result.artworkFile == "Not Found"){
                        albumImage.src = "images/artworkDefault.jpg";
                    }else{
                        albumImage.src = `${pathOfCurrentSong}/${result.artworkFile}`;
                    }
                    
                    //setLyrics(title, author);
                    $.post("controllers/LyricsController.jsp",{"command":"api","artist":author,"title":title}, function(data){
                		//console.log(data);
                    	let json = JSON.parse(data);
                		let apiLyric = json.lyrics.replace("\\n", "<br>");
                		currentLyricR.innerHTML = apiLyric;
                		currentLyric.innerHTML = apiLyric;
                	});
                    $.post("controllers/LyricsController.jsp",{"command":"az","artist":author,"title":title}, function(data){
                    	let json = JSON.parse(data);
                    	console.log(json);
                	});
                };
            }

        $.post(action,parameters,callback);
    }

    //Separa y extrae los valores de un nombre de archivo con formato Artista_Album_Nombre.mp3.
    this.getValues = function(fileName){
        let tempValue = fileName.split('__');
            title = tempValue[2].split(".mp3")[0];
            album = tempValue[1];
            author = tempValue[0];
        
        currentSong = fileName;
        return [title,author,album];
    }

    //Capitaliza un texto.
    this.capitalize = function(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
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

    this.loadStateFirstInteraction = function(){
        if(firstInteraction == false){
            currentSong =  songsList[0];
            firstInteraction = true;
        }
    }
    
    //Actualiza el valor maximo de la barra de progreso.
    updateMaxProgress = function(){
        objSong.onloadedmetadata = function() {
            progressBar.max = objSong.duration.toString();
            inputProgressBar.max = objSong.duration.toString();
        };
    }
}