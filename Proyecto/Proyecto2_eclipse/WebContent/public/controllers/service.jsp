<%@page import="Project.Song"%>
<%@page import="Project.Artwork"%>
<%@page import="Project.SongManager"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Project.FileManager"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="UTF-8"%><%
    
    SongManager songManager = new SongManager();   
    
    StringBuilder result = new StringBuilder("{\"content\":[");
	int count = 1;
	int count2 = 1;
	
	if(request.getParameter("command").toString().equals("getJsonSongs")){
		for(Song currentSong: songManager.getSongList()){
			String separator = ",";
			if(count == songManager.getSongList().size()){
				separator = "";
			}
			result.append(
					String.format("{\"name\":\"%s\",\"artist\":\"%s\",\"album\":\"%s\"}%s", 
							currentSong.getTitle(),
							currentSong.getAuthor(),
							currentSong.getAlbum(),
							//currentSong.getLocation(),
							separator
							)
					);
			count = count + 1;
		}
		result.append("]}");
		
		out.print(result.toString());
	}
    
    else if(request.getParameter("command").toString().equals("getJsonAlbums")){
    	for(Artwork currentAlbum: songManager.getArtworkList()){ 
			String separator2 = ",";
			if(count2 == songManager.getArtworkList().size()){
				separator2 = "";
			}
			result.append(
					String.format("{\"artist\":\"%s\",\"album\":\"%s\",\"path\":\"%s\"}%s", 
							currentAlbum.getAuthor(),
							currentAlbum.getAlbum(),
							currentAlbum.getLocation().replaceAll(":",""),
							separator2
							)
					);
			count2 = count2 + 1;    		
    	}
		result.append("]}");
		System.out.println(result.toString());
		out.print(result.toString());
    }
    else{
    	out.print("{\"Status\":\"error\"}");
    }
%>