package Project;

import java.util.ArrayList;

/**
 * Clase que se encarga de manejar las canciones y archivos de arte de album.
 * @version 0.1.1
 * */
public class SongManager {
	
	/**Lista de canciones encontradas*/
	private ArrayList<Song> songList = new ArrayList<Song>();
	
	/**Lista de arte de album encontrados*/
	private ArrayList<Artwork> artworkList = new ArrayList<Artwork>();
	
	/**Lector de archivos*/
	private FileManager fm;
	
	/*Constructor**/
	public SongManager() {
		this.fm = new FileManager("Library");
		this.loadSongs();
		this.loadArtwork();
	}
	
	/**
	 * Met�do privado que carga las canciones y las agrega a la lista.
	 * */
	private void loadSongs() {
		ArrayList<String[]> mp3List = this.fm.findFiles(".mp3");
		ArrayList<String[]> oggList = this.fm.findFiles(".ogg");
		
		if(!mp3List.isEmpty()) {
			for(String[] songData: mp3List) {
				this.addSong(songData, ".mp3");
			}
		}
		
		if(!oggList.isEmpty()) {
			for(String[] songData: oggList) {
				this.addSong(songData, ".ogg");
			}
		}
	}
	
	/**
	 * Met�do privado que carga el arte de canciones y los agrega a la lista.
	 * */
	private void loadArtwork() {
		ArrayList<String[]> jpgList = this.fm.findFiles("jpg");
		ArrayList<String[]> jpegList = this.fm.findFiles("jpeg");
		ArrayList<String[]> pngList = this.fm.findFiles("png");
		
		if(!jpgList.isEmpty()) {
			for(String[] artworkData: jpgList) {
				this.addArtwork(artworkData, ".jpg");
			}	
		}
		
		if(!jpegList.isEmpty()) {
			for(String[] artworkData: jpegList) {
				this.addArtwork(artworkData, ".jpeg");
			}	
		}
		
		if(!jpgList.isEmpty()) {
			for(String[] artworkData: pngList) {
				this.addArtwork(artworkData, ".png");
			}	
		}
		
	}
	
	/**
	 *Met�do que crea canciones y las agrega a la lista.
	 *@param songData Los datos de la cancion a cargar.
	 * */
	private void addSong(String[] songData, String fileType) {
		
		if(songData[0].matches(String.format("[0-9a-zA-z!_,\\s\\-?']+__[0-9a-zA-z!_,\\s\\-?']+__[0-9a-zA-z!_,\\s\\-?']+.%s", fileType))) {
			String[] songInfo = songData[0].split("__");
			
			this.songList.add(
					new Song(
							songInfo[2].replaceAll("_", " ").replaceAll(fileType, ""),
							songInfo[0].replaceAll("_", " "),
							songInfo[1].replaceAll("_", " "),
							songData[1]
							)
					);
			
		}else {
			this.songList.add(new Song(songData[1]));
		}
	}
	
	
	/**
	 *Met�do que crea objetos Artwork y los agrega a la lista.
	 *@param artworkData Los datos del objeto ArtWork a crear.
	 * */
	private void addArtwork(String[] artworkData, String fileType) {
		
		if(artworkData[0].matches(String.format("[0-9a-zA-z!_,\\s\\-?']+__[0-9a-zA-z!_,\\s\\-?']+.%s", fileType))) {
			String[] artworkInfo = artworkData[0].split("__");
			
			this.artworkList.add(
					new Artwork(
							artworkInfo[1].replaceAll("_", " ").replaceAll(fileType, ""),
							artworkInfo[0].replaceAll("_", " "),
							artworkData[1]
							)
					);
		}
	}
	
	/**
	 * Met�do que convierte el ArrayList de Song a una cadena JSON.
	 * @return json
	 * */
	public String getSongsAsJSON() {
		StringBuilder json = new StringBuilder("{\"songs\":[");
		
		if(!this.songList.isEmpty()) {
			int count = 0;
    		for(Song currentSong: this.songList){
    			json.append(String.format(
    					"{\"title\":\"%s\",\"author\":\"%s\",\"album\":\"%s\"}",
    					currentSong.getTitle(),
    					currentSong.getAuthor(),
    					currentSong.getAlbum()
    					//currentSong.getLocation() /**,\"path\":\"%s\"**/
    					));
    			
    			if(count < this.songList.size()-1){
    				json.append(",");
    			}
    			count++;
    		}
		}
		
		return json.append("]}").toString();
	}
	
	/**
	 * Met�do que convierte el ArrayList de Artwork a una cadena JSON.
	 * @return json
	 * */
	public String getArtworksAsJSON() {
		StringBuilder json = new StringBuilder("{\"artworks\":[");
		
		if(!this.songList.isEmpty()) {
			int count = 0;
    		for(Artwork currentArtwork: this.artworkList){
    			json.append(String.format(
    					"{\"author\":\"%s\",\"album\":\"%s\"}",
    					currentArtwork.getAuthor(),
    					currentArtwork.getAlbum()
    					/**currentArtwork.getLocation()**/ /**,\"path\":\"%s\"**/
    					));
    			
    			if(count < this.artworkList.size()-1){
    				json.append(",");
    			}
    			count++;
    		}
		}
		
		return json.append("]}").toString();
	}
	
	/**
	 * Método que sirve para encontrar una canción y devolver el objeto Song.
	 * @param title Titulo de la canción
	 * @param author Autor de la canción
	 * @param album Albúm de la canción
	 * @return foundSong Objeto Song
	 * */
	private Song getCurrentSong(String title, String author, String album) {
		Song  foundSong = null;
		
		for(Song currentSong: this.songList) {
			if(
					currentSong.getTitle().equals(title) &&
					currentSong.getAuthor().equals(author) &&
					currentSong.getAlbum().equals(album)
					) {
				foundSong = currentSong;
				break;
			}
		}
		
		return foundSong;
	}
	
	/**
	 * Método que sirve para encontrar un arte de albúm y devolver el objeto Artwork.
	 * @param author Autor de la canción
	 * @param album Albúm de la canción
	 * @return foundSong Objeto Song
	 * */
	private Artwork getCurrentArtwork(String author, String album) {
		Artwork  foundArtwork = null;
		
		for(Artwork currentArtwork: this.artworkList) {
			if(
					currentArtwork.getAuthor().equals(author) &&
					currentArtwork.getAlbum().equals(album)
					) {
				foundArtwork = currentArtwork;
				break;
			}
		}
		
		return foundArtwork;
	}
	
	public String setCurrentSong(String title, String author, String album) {
		boolean songExists = true;
		boolean artworkExists = true;
		String status = "success";
		
		Song song = this.getCurrentSong(title, author, album);
		Artwork artwork = this.getCurrentArtwork(author, album);
		
		
		if(song != null) {
			String fileType = ".mp3";
			if(song.getLocation().contains(".ogg")) {
				fileType = ".ogg";
			}
			
			this.fm.makeCopy(
					song.getLocation(),
					String.format(
							"%s__%s__%s%s",
							song.getAuthor(),
							song.getAlbum(),
							song.getTitle(),
							fileType
							));
				
			
			if(artwork == null) {
				artworkExists = false;
				
			}else {
				String imageType = ".png";
				
				if(artwork.getLocation().contains(".jpg")) {
					imageType = ".jgp";
				}else if(artwork.getLocation().contains(".jpeg")) {
					imageType = ".jpeg";
				}
				
				this.fm.makeCopy(
						artwork.getLocation(),
						String.format(
								"%s__%s%s",
								artwork.getAuthor(),
								artwork.getAlbum(),
								imageType
								)
						);
			}
		
		}else {
			songExists = false;
		}
		
		return "";
	}
}
