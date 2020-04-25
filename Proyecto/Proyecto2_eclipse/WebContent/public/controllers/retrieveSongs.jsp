<%@page import="Project.SongManager"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="UTF-8"%><%
    
    SongManager songManager = new SongManager();   
    
    if(request.getParameter("command") != null){
    	
    	if(request.getParameter("command").toString().equals("retrieveSongs")){
    		out.print(
    				String.format("{\"status\": \"success\", \"result\":%s}",
    						songManager.getSongsAsJSON()
    						)
    				);    		
    	}else{
    		out.print("{\"status\":\"Invalid Command\"}");
    	}
    	
    }else{
    	out.print("{\"status\":\"Null Command.\"}");
    }
%>