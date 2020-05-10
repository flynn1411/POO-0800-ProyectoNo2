<%@page import="Project.ExecuteZIP"%>
<%@page import="Project.SongManager"%>
<%@page import="Project.Validator"%>
<%@page import="java.util.*"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%
	SongManager songManager = new SongManager();
	ExecuteZIP execZIP = new ExecuteZIP(); 

    if(Validator.isValid(request,"command")){
    		
		if(request.getParameter("command").equals("addToSession")){
	
				ArrayList<String> selectedSongs = (ArrayList<String>)session.getAttribute("selected");
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
					
				}else if(request.getParameter("option").equals("3")){
					StringBuilder jsonSelectedSongs = new StringBuilder("{\"selected\":[");
					int count = 1;
					for (String i : selectedSongs){
						if(count != selectedSongs.size()){
							jsonSelectedSongs.append(String.format("\"%s\",",i));
						}else{
							jsonSelectedSongs.append(String.format("\"%s\"",i));
						}
						count ++;
					}
					jsonSelectedSongs.append("]}");
					out.print(jsonSelectedSongs.toString().trim());
				}
				
		}else if (request.getParameter("command").equals("deleteZip")){
			execZIP.deleteZIP();		
		}
    }
    else{
    	out.print("{\"result\":\"Unknown parameter\"}");
    }
%>