<%@page import="Project.Song"%>
<%@page import="Project.SongManager"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Base64"%>
<%@page import="Project.FileManager"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%><%
    
    SongManager songManager = new SongManager();
    
    if(request.getParameter("command") != null){
    	
    	if(
    			request.getParameter("command").equals("retrieveSongs")
    			){
    		
    		String result = songManager.getSongsAsJSON();
    		
    		out.print(String.format(
    				"{\"result\":%s}",
    				result
    				));
    	}
    	
    	else if(
    			request.getParameter("command").equals("getSong") &&
    			request.getParameter("title") != null &&
    			request.getParameter("author") != null &&
    			request.getParameter("album") != null
    			){
    		
    		byte[] file = songManager.getSongAsBytes(
    				request.getParameter("title").toString(),
    				request.getParameter("author").toString(),
    				request.getParameter("album").toString()
    				);
    		
    		if (file != null){
    			String encoded = Base64.getEncoder().encodeToString(file);
    			//System.out.println(file);
    			out.print(String.format(
    					"%s",
    					encoded
    					));
    		}else{
    			out.print("{\"status\":\"failure\"}");
    		}
    	}
    	
    	else{
    		out.print("{\"result\":\"Unknown command\"}");
    	}
    	
    }
    else{
    	out.print("{\"result\":\"Unknown parameter\"}");
    }
    
%>