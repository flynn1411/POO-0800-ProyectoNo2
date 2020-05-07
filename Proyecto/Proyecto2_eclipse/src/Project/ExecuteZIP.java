package Project;
import java.io.*;
import java.util.ArrayList;
//import java.util.List;
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
			"    with zipfile.ZipFile('Songs.zip','w') as archivo_zip:\n" + 
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
		ArrayList<String> fileName = new ArrayList<String>();
		
		StringBuilder array = new StringBuilder("[");
		for(String path: paths) {
			array.append(String.format("%s,", path));
		}
		array.append("]");
		
		System.out.append(array.toString());
		
		for (String pathToCopy : paths){
			shContent.append(String.format("cp %s %s\n",pathToCopy,finalPathZIP));
		}
		 
		for(String fileN : fileName) {
			linuxCommand.append(String.format(" %s",fileN.replaceAll(" ","\\\\ ")));
		}
		linuxCommand.append("\n");
		
		for(String fileN : fileName) {
			linuxCommand.append(String.format("rm -f %s\n",fileN.replaceAll(" ","\\\\ ")));
		}
		linuxCommand.append(String.format("mv %s/Songs.zip %s/webapps/ROOT",eclipsePath,tomcatPath));
		
		System.out.print(linuxCommand);
		shContent.append(linuxCommand.toString());
		
		this.createDirectory("Python");
		this.createFile("Python/copySongs.sh",shContent.toString());
		this.createFile("Python/convertToZip.py",pyContent.toString());
		try {
			this.executeSH("Python/copySongs.sh");
			System.out.print("Archivo ZIP creado");
		}catch(Exception e) {
			System.out.print("HUBO UN ERROR EN LA CREACION DEL ZIP");
		}
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
	
	//Sub-proceso para la ejecucion del archivo .sh
	public void executeSH(String shPath) {
		try {
			Process p = Runtime.getRuntime().exec(String.format("sh %s",shPath));
			p.waitFor();
			if(p.exitValue()==0){System.out.print("Ejecucion del script exitosa.");}else{System.out.print("Fracaso en la ejecucion.");}			
		
		}catch(Exception e) {
			System.out.print("Ha ocurrido un error al ejecutar el script.");
		}
	}

}