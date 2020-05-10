<%@page import="Project.Validator"%>
<%@page import="Project.Constants"%>
<%@page import="soup.LyricsProxy"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%><% 
    
    String Lyrics = "{\"Lyrics\":\"No se pudo encontrar la lyrics\"}";;
	LyricsProxy service = new LyricsProxy();
    
    if(	
    Validator.isValid(request,"command") &&
    Validator.isValid(request,"artist")	&&
    Validator.isValid(request, "title")
    ){
    	String artist = request.getParameter("artist").toString();
    	String title = request.getParameter("title").toString();
    	
    	 if(request.getParameter("command").toString().trim().equals(Constants.API)){
			Lyrics = service.lyrics(artist,title,Constants.API);
			
    	 }else if(request.getParameter("command").toString().trim().equals(Constants.AZ)){
    		 Lyrics = service.lyrics(artist,title,Constants.AZ);
    	 
    	 }else Lyrics = "{\"Message\":\"Parametros a ricibir incorrectos\"}";
    }
%><%=Lyrics%>