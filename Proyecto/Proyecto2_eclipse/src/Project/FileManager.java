package Project;

import java.io.File;
import java.util.ArrayList;

/**
 * Lector de archivos y directorios.
 * @version 0.1.0
 * */
public class FileManager {

	/**El directorio actual de donde se trabaja*/
	private String directory;
	
	/**Constructores*/
	public FileManager(String directory) {
		this.directory = directory;
	}
	
	public FileManager() {
		this.directory = "Library";
	}
	
	/**
	 * Método para obtener la dirección del archivo presente.
	 * @param String fileName Nombre del archivo
	 * @return filePath
	 * */
	public String getPath(String fileName){
		String filePath;
		
		File file = new File(String.format("%s/%s", this.directory, fileName));
		
		if(file.exists()) {
			filePath = file.getAbsolutePath();
		}else {
			filePath = "NotFound";
		}
		
		return filePath;
	}
	
	public ArrayList<String> listFiles() {
		File currentDirectory = new File(this.directory);
		
		ArrayList<String> foundSongs = new ArrayList<String>();
		
		File[] fileList = currentDirectory.listFiles();
		
		for(File currentFile: fileList) {
			if(currentFile.isFile() && (currentFile.getName().contains(".mp3"))) {
				foundSongs.add(currentFile.getName());
			}
			//agregar recursividad en else
		}
		
		return foundSongs;
	}
}
