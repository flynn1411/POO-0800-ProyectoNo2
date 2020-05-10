package Project;

import java.io.*;
import java.net.*;
/**
 * Metodo para obtener la letra de una pagina
 * @version 0.1.0
 */
public class GetLyrics {
	/**
	 * Metodo para obtener el HTML de una pagina 
	 * @param String song URL de la pagina 
	 * @param String type si se busca por medio de la api o una pagina web 
	 */
	public void write(String song,String type) {
		String textFile = "";
		//Elegie que metodo si por medio de la api o desde la web.
		if(type.equals(Constants.API))textFile=Constants.APIFile;
		else if(type.equals(Constants.AZ))textFile=Constants.AZFile;
		
		try {
			//la url donde obtendremos la letra de la cancion
			URL url = new URL(song);
			
			//Leeremos el html de la url
			BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream()));
			
			//Crearemos un archivo para almacenarla 
			File file = new File(textFile);
			BufferedWriter bw = new BufferedWriter(new FileWriter(file));
			String lyrics;

			//leemos el hmtl y lo transcribimos a un .txt
			while((lyrics = bf.readLine())!=null)bw.write(lyrics);
			bf.close();
			bw.close();
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
	}
}
