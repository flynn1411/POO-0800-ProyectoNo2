//Libreria de contenido.
var arrLibrary = [
        {"name":"In the flesh?","artist":"Pink Floyd","album":"The Wall"},
        {"name":"You are so cool","artist":"Jonathan Bree","album":"Sleep Walking"},
        {"name":"Another Brick In The Wall Part1","artist":"Pink Floyd","album":"The Wall"},
        {"name":"Another Brick In The Wall Part2","artist":"Pink Floyd","album":"The Wall"},
        {"name":"The Thin Ice","artist":"Pink Floyd","album":"The Wall"},
        {"name":"Young Lost","artist":"Pink Floyd","album":"The Wall"},
        {"name":"You're so Cold","artist":"Two Feet","album":"First Steps"},
        {"name":"Faded","artist":"Alan Walker","album":"Different World"},
        {"name":"19-2000","artist":"Gorillaz","album":"Gorillaz"},
        {"name":"Empire ants","artist":"Gorillaz","album":"Plastic Beach"},
        {"name":"Stylo","artist":"Gorillaz","album":"Plastic Beach"},
        {"name":"Daddy Issues","artist":"The Neighbourhood","album":"Wiped Out!"},
        {"name":"Nervous","artist":"The Neighbourhood","album":"Hard To Imagine The Neighbourhood Ever Changing"},
        {"name":"Apocalypse","artist":"Cigarettes After Sex","album":"Cigarettes After Sex"}
    ];

//------------------ Muestra los artistas y albumes en la pagina. -----------------
function loadArtistsAndAlbums(){
    var htmlArtists = '<body>',
        htmlAlbums= '<body>';
        arrOfArtists = [],
        arrOfAlbums = [];

    //Se llenan los arreglos de album y artistas sin dejar repetidos.
    for(let inf in arrLibrary){
        let current = arrLibrary[inf];
        
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

//----------------- Cargas las coincidencias de la libreria con el texto ingresado por el usuario. ---------
function searchElement(){
    let enteredText = searchBox.value.toLowerCase();
    let html_ = '<body>';
    
    //Oculta y muestra la caja de resultados en caso que no haya nada ingresado.
    if(enteredText !=""){
        resultsToSearch.style.display = "inline-block";    
    }else{
        resultsToSearch.style.display = "none";
    }
    
    //Recorre los elementos de un arreglo con las canciones de la libreria
    for(i in arrLibrary){
        let inf = `${arrLibrary[i].name} ${arrLibrary[i].artist} ${arrLibrary[i].album}`;  
            inf = inf.toLowerCase();
        if(inf.indexOf(enteredText) != -1 && enteredText !=""){
            //let temp = currentElement.split('_');
            //let artist = capitalize(temp[0]);
            //let album = capitalize(temp[1]);
            //let nameSong = capitalize(temp[2]);
            //temp = artist + " " + nameSong;
            html_ += `<tr><td class="inconstant"><input type="checkbox" value=${i} class="inconstant checked">${arrLibrary[i].artist} - ${arrLibrary[i].name}</td></tr>`;    
        }
    }
    html_ += '</body>';
    tableOfResults.innerHTML = html_;

}

//------------ Descarga los elementos seleccionados en el checkbox ----------------
function downloadElements(array){               
    console.log(array)
}

//Capitaliza un texto.
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
