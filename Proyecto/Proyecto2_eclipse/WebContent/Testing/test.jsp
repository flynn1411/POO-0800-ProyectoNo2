<%@page import="java.util.ArrayList"%>
<%@page import="Project.FileManager"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%><%
    
    FileManager fm = new FileManager("Library");
    
    ArrayList<String> files = fm.listFiles();
    
    for(String file: files){
    	System.out.println(file);
    	//System.out.println(fm.getPath(file));
    }
%>