<%@page import="Project.Song"%>
<%@page import="Project.SongManager"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Project.FileManager"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%><%
    
    SongManager songManager = new SongManager();
    
    if(request.getParameter("command") != null){
    	
    	if(
    			request.getParameter("command").equals("retrieveSongs")
    			){
    		
    		String result = "Empty";
    		ArrayList<Song> songs = songManager.getSongList();
    		
    		if(!songs.isEmpty()){
	    		StringBuilder newResult = new StringBuilder("[");
    			int count = 0;
	    		for(Song currentSong: songs){
	    			newResult.append(String.format(
	    					"{\"title\":\"%s\",\"author\":\"%s\",\"album\":\"%s\",\"path\":\"%s\"}",
	    					currentSong.getTitle(),
	    					currentSong.getAuthor(),
	    					currentSong.getAlbum(),
	    					currentSong.getLocation()
	    					));
	    			
	    			if(count < songs.size()-1){
	    				newResult.append(",");
	    			}
	    			count++;
	    		}
	    		
	    	newResult.append("]");
	    	
	    	result = newResult.toString();
    		}
    	
    		
    		out.print(String.format(
    				"{\"result\":%s}",
    				result
    				));
    	}
    	
    	else{
    		out.print("{\"result\":\"Unknown command\"}");
    	}
    	
    }
    else{
    	out.print("{\"result\":\"Unknown parameter\"}");
    }
    
%>