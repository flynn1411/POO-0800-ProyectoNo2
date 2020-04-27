package Project;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
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
		
		if(currentDirectory.exists()) {
			
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
	
	/**
	 * Met�do que transforma un archivo a un arreglo de bytes para un mejor pase de su información.
	 * @param path Ruta del archivo
	 * @return array Arreglo de bytes 
	 * */
	private byte[] file2ByteArray(String path) {
		File file = new File(path);
		byte[] array = new byte[(int) file.length()];
		
		if(file.exists()) {
			try {
				FileInputStream fis = new FileInputStream(file);
				fis.read(array);
				fis.close();
			}
			catch(Exception e) {
				System.out.println(e);
			}
		}
		
		return array;
	}
	
	/**
	 * Función que crea un archivo en base a un arreglo de bytes.
	 * @param arr El arreglo de bytes.
	 * @param path El directorio donde se desea crear el File.
	 * @param fileName El nombre del archivo a crear.
	 * @return fileWasCreated Booleano que indica si se creo o no el archivo.
	 * */
	private boolean byteArray2File(byte[] arr, String path, String fileName) {
		
		File parent = new File(path);
		boolean fileWasCreated = true;
		
		if(!parent.exists()) {
			parent.mkdir();
		}
		
		try {
			
			File newFile = new File(parent, fileName);
			FileOutputStream os = new FileOutputStream(newFile);
			os.write(arr);
			os.close();
			
		}catch(Exception e) {
			fileWasCreated = false;
		}
		
		return fileWasCreated;
	}
	
	/**
	 * Método qeu obtiene el directorio de tomcat.
	 * */
	private String getRootDirectory() {
		return System.getProperty("catalina.home");
	}
	
	/**
	 * Método que obtiene un archivo del directorio actual, obtiene sus datos como un byte array y lo crea en otra ruta dada.
	 * @param path Ruta de donde se encuenta el archivo
	 * @param fileName Nombre del archivo
	 * */
	public boolean makeCopy(String path, String fileName) {
		byte[] byteArray = this.file2ByteArray(path);
		String tomcatPath = this.getRootDirectory();
		
		return this.byteArray2File(byteArray, String.format("%s/webapps/ROOT/CurrentSong", tomcatPath), fileName);
	}
}