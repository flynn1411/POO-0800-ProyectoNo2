<%@page import="Project.Song"%>
<%@page import="Project.SongManager"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Project.FileManager"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%><%
    
    SongManager songManager = new SongManager();
    StringBuilder result = new StringBuilder("");
    
    for(Song currentSong: songManager.getSongList()){
    	result.append(
    			String.format(
    					"<b>Titulo:</b>%s &nbsp <b>Author:</b>%s &nbsp <b>Album:</b>%s &nbsp <b>Ruta:</b>%s<br><br>",
    					currentSong.getTitle(),
    					currentSong.getAuthor(),
    					currentSong.getAlbum(),
    					currentSong.getLocation()
    					)
    			);
    }
    
    out.print(result.toString());
%>