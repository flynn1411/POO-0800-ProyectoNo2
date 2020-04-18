package Project;

import java.io.File;
import java.util.ArrayList;

/**
 * Lector de archivos y directorios.
 * @version 0.1.1
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
	 * M�todo para obtener la direcci�n del archivo presente.
	 * @param String fileName Nombre del archivo
	 * @return filePath
	 * */
	public String getPath(String fileName, String directory){
		String filePath;
		
		File file = new File(String.format("%s/%s", directory, fileName));
		
		if(file.exists()) {
			filePath = file.getAbsolutePath();
		}else {
			filePath = "NotFound";
		}
		
		return filePath;
	}
	
	/** 
	 * Met�do que busca archivos con una terminaci�n espec�fica
	 * @param fileType Terminaci�n del archivo a buscar.
	 * @return Lista de archivos encontrados.
	 * */
	public ArrayList<String[]> findFiles(String fileType) {
		File currentDirectory = new File(this.directory);
		
		ArrayList<String[]> foundFiles = new ArrayList<String[]>();
		
		File[] fileList = currentDirectory.listFiles();
		
		for(File currentFile: fileList) {
			if(currentFile.isFile()) {
				if(currentFile.getName().contains(fileType)) {
					String[] fileData = {currentFile.getName(),currentFile.getAbsolutePath()};
					foundFiles.add(fileData);
				}
			}
			else {
				ArrayList<String[]> innerFiles = this.findFiles(fileType, currentFile);
				if(!innerFiles.isEmpty()) {
					for(String[] fileData: innerFiles) {
						foundFiles.add(fileData);
					}
				}
			}
		}
		
		return foundFiles;
	}
	
	/** 
	 * Met�do que busca archivos con una terminaci�n espec�fica
	 * @param fileType Terminaci�n del archivo a buscar.
	 * @return Lista de archivos encontrados.
	 * */
	public ArrayList<String[]> findFiles(String fileType, File currentDirectory){
		
		ArrayList<String[]> foundFiles = new ArrayList<String[]>();
		
		File[] fileList = currentDirectory.listFiles();
		
		for(File currentFile: fileList) {
			if(currentFile.isFile()) {
				if(currentFile.getName().contains(fileType)) {
					String[] fileData = {currentFile.getName(),currentFile.getAbsolutePath()};
					foundFiles.add(fileData);
				}
			}
			else {
				ArrayList<String[]> innerFiles = this.findFiles(fileType, currentFile);
				if(!innerFiles.isEmpty()) {
					for(String[] fileData: innerFiles) {
						foundFiles.add(fileData);
					}
				}
			}
		}
		
		return foundFiles;
	}
}
