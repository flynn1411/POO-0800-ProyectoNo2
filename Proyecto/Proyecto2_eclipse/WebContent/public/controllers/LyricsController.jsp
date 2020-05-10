<%@page import="Project.FileManager"%>
<%@page import="Project.Constants"%>
<%@page import="Project.Validator"%>
<%@page import="java.util.regex.Matcher"%>
<%@page import="java.util.regex.Pattern"%>
<%@page import="Project.GetLyrics"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%><%
    
    String showLyrics = "{\"Lyrics\":\"No se pudo encontrar la lyrics\"}";    
	GetLyrics gl = new GetLyrics();
	FileManager fm = new FileManager();
	Validator v = new Validator();
   
    if(
    	Validator.isValid(request,"command") &&
    	Validator.isValid(request,"artist")	&&
    	Validator.isValid(request, "title")
    	){
		//API			
	    if(request.getParameter("command").toString().trim().equals(Constants.API)){
			
	    	String artist = v.cleanArtist(request,Constants.API);
			String song = v.cleanTitle(request,Constants.API);
			
			//Url para obtener la letra de la cancion.	
			String search = String.format("https://api.lyrics.ovh/v1/%s/%s",artist,song);
			
			//Buscamos y la imprimimos y terminamos el servicio del controlador 
			gl.write(search,Constants.API);
			showLyrics = fm.read(Constants.APIFile);
			fm.delete(Constants.APIFile);
	    	
	    //azlyrics
	    }else if(request.getParameter("command").toString().trim().equals(Constants.AZ)){
			
	    	String artist = v.cleanArtist(request,Constants.AZ);
			String song = v.cleanTitle(request,Constants.AZ);
			
			//Url para obtener la letra de la cancion.
	        String url = String.format("https://www.azlyrics.com/lyrics/%s/%s.html",artist,song);
	        
			//Buscamos y la imprimimos
			gl.write(url,Constants.AZ);
			showLyrics = v.HTMLCleaner(fm.read(Constants.AZFile));
	       	fm.delete(Constants.AZFile);
	    }

    }else showLyrics = "{\"Message\":\"Parametros a ricibir incorrectos\"}";
    
	//Se envia como un JSON
%><%=showLyrics%>




