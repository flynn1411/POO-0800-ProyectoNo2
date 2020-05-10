/**
 * LyricsService.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package soup;

public interface LyricsService extends javax.xml.rpc.Service {
    public java.lang.String getLyricsAddress();

    public soup.Lyrics getLyrics() throws javax.xml.rpc.ServiceException;

    public soup.Lyrics getLyrics(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
