<%@page import="Project.SongManager"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%><%
    
    SongManager songManager = new SongManager();
    
	if(request.getParameter("command") != null){
	    	
	    	if(
	    			request.getParameter("command").toString().equals("setCurrentSong") &&
	    			request.getParameter("title") != null &&
	    			request.getParameter("author") != null &&
	    			request.getParameter("album") != null
	    			){
	    		out.print(
	    				String.format("%s",
	    						songManager.setCurrentSong(
	    								request.getParameter("title").toString(),
	    								request.getParameter("author").toString(),
	    								request.getParameter("album").toString()
	    								)
	    						)
	    				);    		
	    	}else{
	    		out.print("{\"status\":\"Invalid Command\"}");
	    	}
	    	
	    }else{
	    	out.print("{\"status\":\"Null Command.\"}");
	    }
%>