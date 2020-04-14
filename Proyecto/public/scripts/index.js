var arrLibrary = [
        "Pink Floyd_The Wall_In the flesh?",
        "Jonathan Bree_Sleep Walking_You are so cool",
        "Pink Floyd_The Wall_Another Brick In The Wall Part1",
        "Pink Floyd_The Wall_Another Brick In The Wall Part2",
        "Pink Floyd_The Wall_The Thin Ice",
        "Pink Floyd_The Wall_Young Lost",
        "Two Feet_First Steps_You're so Cold"
    ];

//SOLO ES UN BORRADOR
function loadContent(){
    var html = '<body>';
            
    for(i=0;i<5;i++){
    html += `<tr><td>Gorillaz</td></tr>`;
    }
    
    html += '</body>';
    contentArtists.innerHTML = html;
    var html2 = '<body>';
    for(i=0;i<5;i++){
    html2 += `<tr><td>Dark Side of the Moon</td></tr>`;
    }
    
    html2 += '</body>';
    contentAlbums.innerHTML = html2;
}

//----------------- Cargas las coincidencias de la libreria con el texto ingresado---------
function searchElement(){
    let enteredText = searchBox.value.toLowerCase();
    let html_ = '<body>';
    
    //Oculta y muestra la caja de resultados.
    if(enteredText !=""){
        resultsToSearch.style.display = "inline-block";    
    }else{
        resultsToSearch.style.display = "none";
    }
    
    //Recorre los elementos de un arreglo con las canciones de la libreria
    for(i in arrLibrary){
        let currentElement = arrLibrary[i].toLowerCase();
        if(currentElement.indexOf(enteredText) != -1 && enteredText !=""){
            let temp = currentElement.split('_');
            let artist = capitalize(temp[0]);
            let album = capitalize(temp[1]);
            let nameSong = capitalize(temp[2]);
            temp = artist + " " + nameSong;
            html_ += `<tr><td>${temp}</td></tr>`;    
        }
    }
    html_ += '</body>';
    tableOfResults.innerHTML = html_;
}

//Capitaliza un texto.
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

