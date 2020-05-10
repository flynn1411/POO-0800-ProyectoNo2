package Project;
import java.io.*;
import java.util.ArrayList;
public class ExecuteZIP {
	
	private String eclipsePath;
	private String tomcatPath;
	private StringBuilder shContent = new StringBuilder("");
	private String finalPathZIP; 
	private SongManager songManager = new SongManager();
	private StringBuilder pyContent = new StringBuilder("import zipfile\n" + 
			"import sys\n" + 
			"\n" + 
			"fileList = sys.argv\n" + 
			"fileList.pop(0)\n" + 
			"if(fileList!= None):        \n" + 
			"    with zipfile.ZipFile('songs.zip','w') as archivo_zip:\n" + 
			"        for i in fileList:\n" + 
			"            archivo_zip.write(i)\n" + 
			"\n" + 
			"    archivo_zip.close()");

	public ExecuteZIP() {} 
	
	//Carga la ejecucion de la creacion del zip recibiendo una lista de nombres de archivos canciones.
	public void loadZIP(ArrayList<String> nameSongs){
		this.getPaths();
		finalPathZIP = String.format("%s",eclipsePath);
		StringBuilder linuxCommand = new StringBuilder("python3 Python/convertToZip.py");
		ArrayList<String> paths = this.songManager.getSongsLocations(nameSongs);
		
		for (String pathToCopy : paths){
			shContent.append(String.format("cp %s %s\n",pathToCopy,finalPathZIP));
		}
		 
		for(String fileN : nameSongs) {
			linuxCommand.append(String.format(" %s",fileN.replaceAll(" ","\\\\ ")));
		} 
		linuxCommand.append("\n");
		
		for(String fileN : nameSongs) {
			linuxCommand.append(String.format("rm -f %s\n",fileN.replaceAll(" ","\\\\ ")));
		}
		linuxCommand.append(String.format("mv %s/songs.zip %s/webapps/ROOT",eclipsePath,tomcatPath));
		
		shContent.append(linuxCommand.toString());
		
		this.createDirectory("Python");
		this.createFile("Python/copySongs.sh",shContent.toString());
		this.createFile("Python/convertToZip.py",pyContent.toString());
		try {
			this.executeSH("Python/copySongs.sh");
			//System.out.print("Archivo ZIP creado");
		}catch(Exception e) {
			//System.out.print("Ocurrio un error al intentar crear el archivo zip\n");
		}
	}
	
	//Obtiene la ruta local del eclipse y el tomcat.
	public void getPaths() {
		File f = new File("");
		eclipsePath = f.getAbsolutePath();
		tomcatPath = System.getProperty("catalina.home");
	}
	
	//Crea un archivo dado un ruta y el contenido.
	public void createFile(String fileName, String content){
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
	
	//Sub-proceso para la ejecucion del archivo .sh
	public void executeSH(String shPath) {
		try {
			Process p = Runtime.getRuntime().exec(String.format("sh %s",shPath));
			p.waitFor();
			if(p.exitValue()==0){System.out.print("Ejecucion del subproceso exitosa.");}else{System.out.print("Fracaso en la ejecucion del subproceso.");}			
		
		}catch(Exception e) {
			System.out.print("Ha ocurrido un error al ejecutar el script.");
		}
	}
	
	public void deleteZIP() {
		this.getPaths();
		try {
			Process p = Runtime.getRuntime().exec(String.format("rm -f %s/webapps/ROOT/songs.zip",tomcatPath));
			p.waitFor();
			if(p.exitValue()==0){System.out.print("Ejecucion del subproceso exitosa.");}else{System.out.print("Fracaso en la ejecucion del subproceso.");}			
		
		}catch(Exception e) {
			System.out.print("Ha ocurrido un error al ejecutar el script.");
		}
	}
	
}