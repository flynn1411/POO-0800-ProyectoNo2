<%@page import="Project.SongManager"%>
<%@page import="Project.Validator"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%><%
    
    SongManager songManager = new SongManager();
    
	if(Validator.isValid(request,"command")){
	    	
	    	if(
	   			request.getParameter("command").toString().equals("setCurrentSong") &&
	   			Validator.isValid(request,"title") &&
	   			Validator.isValid(request,"author") &&
	   			Validator.isValid(request,"album")
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