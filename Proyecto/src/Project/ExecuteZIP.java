package Project;
import java.io.IOException;
import java.net.URL;
import java.io.*;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.List;
public class ExecuteZIP {
	
	private String eclipsePath;
	private String tomcatPath;
	private String temp;
	private String[] arrPaths;
	private StringBuilder shContent = new StringBuilder();
	private String finalPathZIP; 
	private SongManager songManager = new SongManager();
	private StringBuilder pyContent = new StringBuilder("import zipfile\n" + 
			"import sys\n" + 
			"\n" + 
			"fileList = sys.argv\n" + 
			"fileList.pop(0)\n" + 
			"if(fileList!= None):        \n" + 
			"    with zipfile.ZipFile('Songs.zip','w') as archivo_zip:\n" + 
			"        for i in fileList:\n" + 
			"            archivo_zip.write(i)\n" + 
			"\n" + 
			"    archivo_zip.close()");
	//private String contentSh = "python3 convertToZip.py";

	public ExecuteZIP() {} 
	
	//Carga la ejecucion de la creacion del zip recibiendo una lista de nombres de archivos canciones.
	public void loadZIP(List<String> nameSongs){
		this.getPaths();
		finalPathZIP = String.format("%s/Python",eclipsePath);
		StringBuilder linuxCommand = new StringBuilder("python3 Python/convertToZip.py");
		List<String> paths = new ArrayList<String>();
		List<String> fileName = new ArrayList<String>();
		
		String fileType = ".mp3";
		for(String inf : nameSongs) {
			//System.out.print(inf + "\n");
			fileName.add(inf);
			String[] arrInf = inf.split("__");
			
			String author = arrInf[0];
			String album = arrInf[1];
			String title = arrInf[2].replaceAll(fileType, "");
			Song currentSong = songManager.getCurrentSong(title,author,album); 
			String currentPath = currentSong.getLocation().toString();
			String pathCommand = currentPath.replaceAll(" ","\\\\ "); 
			paths.add(pathCommand); 
		} 
		
		for (String pathToCopy : paths){
			shContent.append(String.format("cp %s %s\n",pathToCopy,finalPathZIP));
		}
		
		for(String fileN : fileName) {
			linuxCommand.append(String.format(" Python/%s",fileN.replaceAll(" ","\\\\ ")));
		}
		shContent.append(linuxCommand.toString());
		System.out.print(linuxCommand);
		
		this.createDirectory("Python");
		this.createFile("Python/copySongs.sh",shContent.toString());
		this.createFile("Python/convertToZip.py",pyContent.toString());
		//this.createDirectory("Python/Songs");
		try {
			this.executeSH("sh Python/copySongs.sh");
			System.out.print("Archivo ZIP creado");
		}catch(Exception e) {
			System.out.print("HUBO UN ERROR EN LA CREACION DEL ZIP");
		}
		//System.out.println(contentSh);
	}


	public void executeSH(String pathOfSh) throws IOException {
		//String cmd = "sh /home/mrzombie/Documents/UNAH/POO/CarpetaPruebas/prueba.sh";
		ProcessBuilder pb = new ProcessBuilder("bash", "-c",pathOfSh);
		pb.start();
	}
	
	public void getPaths() {
		File f = new File("");
		eclipsePath = f.getAbsolutePath();
		tomcatPath = System.getProperty("catalina.home");
	}
	
	//Crea un archivo dado un ruta y el contenido.
	public void createFile(String fileName, String content){
		System.out.println("CREANDO");
		this.createDirectory("Python");
		//Crear el archivo .sh.
		try{
			FileOutputStream fos = new FileOutputStream(fileName);
			try{
			
				byte[] b = content.getBytes();
				fos.write(b);
			
			}finally{
				fos.close();
			}
		}catch(Exception e) {
			
		}
	}

	//Crea un directorio dado un nombre.
	public void createDirectory(String name){
		File directory = new File(name);

		//Si el directorio no existe.
		if (!directory.exists()) {
			directory.mkdir();			
		}
	}
	
	public String loadWorkPlace() {
		return tomcatPath = System.getProperty("catalina.home");
	}
	
	public void loadNewSong(String pathOrigin, String pathDestiny) {
		try {
			Process p = Runtime.getRuntime().exec(String.format("cp %s %s",pathOrigin,pathDestiny));
			p.waitFor();
			if(p.exitValue()==0){System.out.print("Exitoso");}else{System.out.print("Fracaso");}			
		
		}catch(Exception e) {
			System.out.print("Ha ocurrido un error");
		}
	}

}