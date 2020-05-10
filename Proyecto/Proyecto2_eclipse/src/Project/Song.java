package Project;

/**
 * Objeto que contiene la informaci�n de las canciones encontradas en un directorio.
 * @version 0.1.0
 * */
public class Song {
	/**Titulo de la canci�n*/
	private String title;
	
	/**Autor de la canci�n*/
	private String author;
	
	/**Album al que pertenece la canci�n*/
	private String album;
	
	/**Locaci�n del archivo*/
	private String location;
	
	/**Constructores de la clase*/
	public Song(String title, String author, String album, String location){
		this.title = title;
		this.author = author;
		this.album = album;
		this.location = location;
	}
	
	public Song(String location, int n) {
		this.title = String.format("Unknown Song%s", n);
		this.album = String.format("Unknown Artist%s", n);
		this.author = String.format("Unknown Album%s", n);
		this.location = location;
	}

	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * @return the author
	 */
	public String getAuthor() {
		return author;
	}

	/**
	 * @param author the author to set
	 */
	public void setAuthor(String author) {
		this.author = author;
	}

	/**
	 * @return the album
	 */
	public String getAlbum() {
		return album;
	}

	/**
	 * @param album the album to set
	 */
	public void setAlbum(String album) {
		this.album = album;
	}

	/**
	 * @return the location
	 */
	public String getLocation() {
		return location;
	}

	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
		this.location = location;
	}
	
	
}
