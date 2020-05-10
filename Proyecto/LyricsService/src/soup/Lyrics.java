package soup;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Lyrics {
	
	/**Nombre para representar la API*/
	public static String API = "api";
	
	/**Nombre para representar si es del HTML externo */
	public static String AZ = "az";
	
	/**Nombre para el archivo de txt de la letra de la API*/
	public static String APIFile = "lyricsAPI.txt";
	
	/**Nombre para el archivo de txt de la letra del HTML externo*/
	public static String AZFile = "lyricsAZ.txt";

	public String lyrics(String artist, String title,String type) {
		
		String result ="";
		if(type.equals(API)) {
			
			String searchAPI = String.format(
					"https://api.lyrics.ovh/v1/%s/%s",
					artist.trim().replace(" ", "_"),
					title.trim().replace(" ", "_")
			);
			this.write(searchAPI,API);
			result = this.read(APIFile);
		
		}else if(type.equals(AZ)) {
			
			String searchAZ = String.format(
					"https://www.azlyrics.com/lyrics/%s/%s.html",
					artist.trim().replace(" ", "").replace(",","").replace("'","").toLowerCase(),
					title.trim().replace(" ", "").replace(",","").replace("'","").toLowerCase()
					);
			this.write(searchAZ,AZ);
			result = this.htmlCleaner(this.read(AZFile));
		}
		return result;
	}
	/**
	 * Metodo para obtener el HTML de una pagina 
	 * @param String song URL de la pagina 
	 * @param String type si se busca por medio de la api o una pagina web 
	 */
	public void write(String song,String type) {
		String textFile = "";
		//Elegie que metodo si por medio de la api o desde la web.
		if(type.equals(API))textFile=APIFile;
		else if(type.equals(AZ))textFile=AZFile;
		
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
	/**
	 * Metodo para leer el archivo de un texto
	 * @param String lyricsFile es el archivo a leer
	 * @return el texto de archivo
	 */
	public String read(String lyricsFile){
		
		String text = "";
		try {
			//Obtenemos el archivo donde se encuentra nuestra lyrics
			BufferedReader bf = new BufferedReader(new FileReader(lyricsFile));
			String temp = "";
			String bfReader;
			//Leemos el contenido del arhicov .txt
			while((bfReader = bf.readLine())!=null)temp = temp + bfReader;
			
			text = temp;
			bf.close();
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return text;
	}
	/**
	 * Limpia el HTML para obtener la letra.
	 * @param html el HTML a limpiar 
	 * @return JSON de la letra
	 */
	public String htmlCleaner(String html){
		
		String Lyrics = "";
		String exp = "that. -->[\\w ,.'’<>¿?¡!()áéíóúüÁÉÍÓÚÑñäöüßÄÖÜẞçëÇËêôûïÊÔÛÏ\\[\\]:;/\\-\\&—]+";
	    Pattern patron = Pattern.compile(exp);
	    Matcher matcher = patron.matcher(html);
	    
	    if(matcher.find()) {
	       	Lyrics = String.format("{\"Lyrics\":\"%s\"}",matcher.group());
	       	Lyrics = Lyrics.replace("that. -->","");
	       	Lyrics = Lyrics.replace("<!-- MxM banner --><div class","");
	   	}
		return Lyrics;
	}
}
