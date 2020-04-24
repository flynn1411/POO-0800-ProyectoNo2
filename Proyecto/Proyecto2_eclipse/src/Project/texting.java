package Project;
import java.io.IOException;
import java.io.*;

public class texting {
	
	private String eclipsePath;
	private String tomcatPath;
	private String temp;
	private String[] arrPaths;
	private StringBuilder contentSh = new StringBuilder();
	private String finalPathZIP = "/home/mrzombie/eclipse/jee-2019-122/eclipse/Python/Songs"; 
	//private String contentSh = "python3 convertToZip.py";

	public texting() {}
	
	
	public void loadExecution() throws IOException{
		
		String[] commands = {	"/home/mrzombie/eclipse/jee-2019-122/eclipse/Library/Gorillaz__Gorillaz__19200.mp3",
								"/home/mrzombie/eclipse/jee-2019-122/eclipse/Library/ArtistaDesconocido__AlbumDesconocido__NombreDesconocido.mp3"};
		
		for (String pathToCopy : commands){
			contentSh.append(String.format("cp %s %s\n",pathToCopy,finalPathZIP));
		}
		

		//contentSh.append("python3 convertToZip.py");
		//this.getPaths();
		this.createFile("Python/prueba.sh",contentSh.toString());
		this.createDirectory("Python/Songs");
		this.executeSH("sh /home/mrzombie/eclipse/jee-2019-122/eclipse/Python/prueba.sh");
		//System.out.println(contentSh);
	}


	public void executeSH(String pathOfSh) throws IOException {
		//String cmd = "sh /home/mrzombie/Documents/UNAH/POO/CarpetaPruebas/prueba.sh";
		ProcessBuilder pb = new ProcessBuilder("bash", "-c",pathOfSh);
		pb.start();
	}
	
	public void getPaths() {
		File f = new File(".");
		eclipsePath = f.getAbsolutePath();
		tomcatPath = System.getProperty("catalina.home");
		//String temp = System.getProperty("user.dir");
		//System.out.println(temp);
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

		//Si el directorio PYTHON no existe, sera creado.
		if (!directory.exists()) {
			directory.mkdir();			
		}
	}
	
	public String loadWorkPlace() {
		return tomcatPath = System.getProperty("catalina.home");
	}

}