package Project;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;

public class Validator {
	/**
	 * Verifica si una Instancia de HttpServletRequest existe
	 * @param request que es una Instancia de HttpServletRequest
	 * @param parameter el parametro a obtener para verificar su existencia
	 * @return boolean si existe o no
	 * 
	 */
	public static boolean isValid(HttpServletRequest request,String parameter){
		
		if(request.getParameter(parameter) != null)	return true; 
		return false;
	}
	
	/**
	 * Limpia el nombre del artista.
	 * @param request que es una Instancia de HttpServletRequest.
	 * @param type Si viene desde la API o desde el HTML externo. 
	 * @return El nombre limpio.
	 */
	public String cleanArtist(HttpServletRequest request,String type) {
		
		if(type.equals(Constants.API))	return request.getParameter("artist").toString().trim().replace(" ", "_");
		
		else if(type.equals(Constants.AZ)) return request.getParameter("artist").toString().trim().replace(" ", "").replace(",","").replace("'","").toLowerCase();
		
		else return "Error al entroducir los parametros";
		
	}
	
	/**
	 * Limpia el nombre de la cancion.
	 * @param request que es una Instancia de HttpServletRequest.
	 * @param type Si viene desde la API o desde el HTML externo. 
	 * @return El nombre limpio.
	 */
	public String cleanTitle(HttpServletRequest request,String type){
		
		if(type.equals(Constants.API))	return request.getParameter("title").toString().trim().replace(" ", "_");
		
		else if(type.equals(Constants.AZ))	return request.getParameter("title").toString().trim().replace(" ", "").replace(",","").replace("'","").toLowerCase();
		
		else	return "Error al entroducir los parametros";
	}
	
	/**
	 * Limpia el HTML para obtener la letra.
	 * @param html el HTML a limpiar 
	 * @return JSON de la letra
	 */
	
	public String HTMLCleaner(String html){
		
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
