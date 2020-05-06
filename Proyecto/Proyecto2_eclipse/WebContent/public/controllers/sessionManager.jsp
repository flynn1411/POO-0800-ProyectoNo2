<%@page import="Project.ExecuteZIP"%>
<%@page import="Project.SongManager"%>
<%@page import="java.util.*"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%
	SongManager songManager = new SongManager();
	ExecuteZIP execZIP = new ExecuteZIP(); 

    if(request.getParameter("command") != null){
    		
		if(request.getParameter("command").equals("addToSession")){
	
				List<String> selectedSongs = (List<String>)session.getAttribute("selected");
				if(request.getParameter("option").equals("1")){
					
					if(selectedSongs == null){
						selectedSongs = new ArrayList<String>();
						session.setAttribute("selected",selectedSongs);
					}
					
					String element = request.getParameter("fileName");
					selectedSongs.add(element);
					
					Set<String> hashSet = new HashSet<String>(selectedSongs);
					selectedSongs.clear();
					selectedSongs.addAll(hashSet);
			

				}else if(request.getParameter("option").equals("2")){
					for(String i : selectedSongs){
						out.print(i + "\n");
					}
					execZIP.loadZIP(selectedSongs);
				}
		}
		
    	
    }
    else{
    	out.print("{\"result\":\"Unknown parameter\"}");
    }
%>