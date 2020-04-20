package Project;

import java.util.ArrayList;

/**
 * Clase que se encarga de manejar las canciones y archivos de arte de album.
 * @version 0.1.0
 * */
public class SongManager {
	
	/**Lista de canciones encontradas*/
	private ArrayList<Song> songList = new ArrayList<Song>();
	
	/**Lista de arte de album encontrados*/
	private ArrayList<Artwork> artworkList = new ArrayList<Artwork>();
	
	/**Lector de archivos*/
	private FileManager fm;

	/**
	 * @return the songList
	 */
	public ArrayList<Song> getSongList() {
		return songList;
	}

	/**
	 * @return the artworkList
	 */
	public ArrayList<Artwork> getArtworkList() {
		return artworkList;
	}
	
	/*Constructor**/
	public SongManager() {
		this.fm = new FileManager("Library");
		this.loadSongs();
		this.loadArtwork();
	}
	
	/**
	 * Metódo privado que carga las canciones y las agrega a la lista.
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
	 * Metódo privado que carga el arte de canciones y los agrega a la lista.
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
	 *Metódo que crea canciones y las agrega a la lista.
	 *@param songData Los datos de la cancion a cargar.
	 * */
	private void addSong(String[] songData, String fileType) {
		
		if(songData[0].matches(String.format("[0-9a-zA-z!_\\s\\-?]+__[0-9a-zA-z!_\\s\\-?]+__[0-9a-zA-z!_\\s\\-?]+.%s", fileType))) {
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
	 *Metódo que crea objetos Artwork y los agrega a la lista.
	 *@param artworkData Los datos del objeto ArtWork a crear.
	 * */
	private void addArtwork(String[] artworkData, String fileType) {
		
		if(artworkData[0].matches(String.format("[0-9a-zA-z!_\\s\\-?]+__[0-9a-zA-z!_\\s\\-?]+.%s", fileType))) {
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
}
