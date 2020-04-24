<%@page import="Project.texting"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
texting prueba = new texting(); 
out.print(prueba.loadWorkPlace());
//prueba.exec();
//prueba.create("Python/prueba.sh",contentSh);
//out.print("Hola");
//out.print("Hola");
%>