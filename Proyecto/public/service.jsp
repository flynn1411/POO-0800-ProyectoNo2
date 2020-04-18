<%@page import="Project.Song"%>
<%@page import="Project.SongManager"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Project.FileManager"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%><%
    
    SongManager songManager = new SongManager();    
    StringBuilder result = new StringBuilder("{\"content\":[");
    int count = 1;
    for(Song currentSong: songManager.getSongList()){
    	String separator = ",";
    	if(count == songManager.getSongList().size()){
    		separator = "";
    	}
    	result.append(
    			String.format("{\"name\":\"%s\",\"artist\":\"%s\",\"album\":\"%s\",\"path\":\"%s\"}%s", 
    					currentSong.getTitle(),
    					currentSong.getAuthor(),
    					currentSong.getAlbum(),
    					currentSong.getLocation(),
    					separator
    					)
    			);
    	count = count + 1;
    }
    result.append("]}");
    
    out.print(result.toString());
%>