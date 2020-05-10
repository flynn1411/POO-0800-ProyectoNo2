package soup;

public class LyricsProxy implements soup.Lyrics {
  private String _endpoint = null;
  private soup.Lyrics lyrics = null;
  
  public LyricsProxy() {
    _initLyricsProxy();
  }
  
  public LyricsProxy(String endpoint) {
    _endpoint = endpoint;
    _initLyricsProxy();
  }
  
  private void _initLyricsProxy() {
    try {
      lyrics = (new soup.LyricsServiceLocator()).getLyrics();
      if (lyrics != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)lyrics)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)lyrics)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (lyrics != null)
      ((javax.xml.rpc.Stub)lyrics)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public soup.Lyrics getLyrics() {
    if (lyrics == null)
      _initLyricsProxy();
    return lyrics;
  }
  
  public java.lang.String lyrics(java.lang.String artist, java.lang.String title, java.lang.String type) throws java.rmi.RemoteException{
    if (lyrics == null)
      _initLyricsProxy();
    return lyrics.lyrics(artist, title, type);
  }
  
  public java.lang.String htmlCleaner(java.lang.String html) throws java.rmi.RemoteException{
    if (lyrics == null)
      _initLyricsProxy();
    return lyrics.htmlCleaner(html);
  }
  
  public void write(java.lang.String song, java.lang.String type) throws java.rmi.RemoteException{
    if (lyrics == null)
      _initLyricsProxy();
    lyrics.write(song, type);
  }
  
  public java.lang.String read(java.lang.String lyricsFile) throws java.rmi.RemoteException{
    if (lyrics == null)
      _initLyricsProxy();
    return lyrics.read(lyricsFile);
  }
  
  
}