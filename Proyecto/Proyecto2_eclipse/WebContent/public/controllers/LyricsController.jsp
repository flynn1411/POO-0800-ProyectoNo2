<%@page import="Project.FileManager"%>
<%@page import="java.util.regex.Matcher"%>
<%@page import="java.util.regex.Pattern"%>
<%@page import="Project.GetLyrics"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%><%
    
    String showLyrics = "{\"Lyrics\":\"No se pudo encontrar la lyrics\"}";    
	GetLyrics gl = new GetLyrics();
	FileManager fm = new FileManager();
   
    if(	request.getParameter("command") != null &&
    	request.getParameter("artist") != null &&
		request.getParameter("title") != null
		){
			//API			
	    	if(request.getParameter("command").toString().trim().equals("api")){
				String artist = request.getParameter("artist").toString().trim().replace(" ", "_");
				String song = request.getParameter("title").toString().trim().replace(" ", "_");
				//Url para obtener la letra de la cancion.	
				String search = String.format("https://api.lyrics.ovh/v1/%s/%s",artist,song);
				//Buscamos y la imprimimos y terminamos el servicio del controlador 
				gl.write(search,"api");
				showLyrics = fm.read("lyricsAPI.txt");
				fm.delete("lyricsAPI.txt");
	    	
	    	//azlyrics
	    	}else if(request.getParameter("command").toString().trim().equals("az")){
				String artist = request.getParameter("artist").toString().trim().replace(" ", "").replace(",","").replace("'","").toLowerCase();
				String song = request.getParameter("title").toString().trim().replace(" ", "").replace(",","").replace("'","").toLowerCase();
				//Url para obtener la letra de la cancion.
	    	    String url = String.format("https://www.azlyrics.com/lyrics/%s/%s.html",artist,song);
	    	    //Buscamos y la imprimimos
				gl.write(url,"az");
	    	    String html = fm.read("lyricsAZ.txt");
	    	    //Por medio de expresiones regulares obtenemos la lyrics de la cancion separandola del html que no se necesita
	    	    String exp = "that. -->[\\w ,.'<>¿?¡!()áéíóúüÁÉÍÓÚÑñäöüßÄÖÜẞçëÇËêôûïÊÔÛÏ\\[\\]:;/\\-\\&—]+";
	    	    Pattern patron = Pattern.compile(exp);
	    	    Matcher matcher = patron.matcher(html);
	    	    if(matcher.find()) {
	    	    	showLyrics = String.format("{\"Lyrics\":\"%s\"}",matcher.group());
	    	    	showLyrics = showLyrics.replace("that. -->","");
	    	    	showLyrics = showLyrics.replace("<!-- MxM banner --><div class","");
	    		}
				fm.delete("lyricsAZ.txt");
	    	}

    }else showLyrics = "{\"Message\":\"Parametros a ricibir incorrectos\"}";
    
	//Se envia como un JSON
%><%=showLyrics%>




