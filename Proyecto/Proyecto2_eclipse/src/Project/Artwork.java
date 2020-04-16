package Project;

/**
 * Clase que representa un arte de albúm.
 * @version 0.1.0
 * */
public class Artwork {
	
	/** Nombre del album*/
	private String album;
	
	/**Nombre del autor*/
	private String author;
	
	/** Ruta del archivo*/
	private String location;
	
	/**Constructor*/
	public Artwork(String album, String author, String location) {
		this.album = album;
		this.author = author;
		this.location = location;
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
