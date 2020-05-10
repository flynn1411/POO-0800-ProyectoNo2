/**
 * Lyrics.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package soap;

public interface Lyrics extends java.rmi.Remote {
    public java.lang.String lyrics(java.lang.String artist, java.lang.String title, java.lang.String type) throws java.rmi.RemoteException;
    public java.lang.String htmlCleaner(java.lang.String html) throws java.rmi.RemoteException;
    public void write(java.lang.String song, java.lang.String type) throws java.rmi.RemoteException;
    public java.lang.String read(java.lang.String lyricsFile) throws java.rmi.RemoteException;
    public void delete(java.lang.String fileName) throws java.rmi.RemoteException;
}
