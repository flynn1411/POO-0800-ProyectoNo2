/**
 * LyricsServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package soup;

public class LyricsServiceLocator extends org.apache.axis.client.Service implements soup.LyricsService {

    public LyricsServiceLocator() {
    }


    public LyricsServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public LyricsServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for Lyrics
    private java.lang.String Lyrics_address = "http://localhost:8080/soup/services/Lyrics";

    public java.lang.String getLyricsAddress() {
        return Lyrics_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String LyricsWSDDServiceName = "Lyrics";

    public java.lang.String getLyricsWSDDServiceName() {
        return LyricsWSDDServiceName;
    }

    public void setLyricsWSDDServiceName(java.lang.String name) {
        LyricsWSDDServiceName = name;
    }

    public soup.Lyrics getLyrics() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(Lyrics_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getLyrics(endpoint);
    }

    public soup.Lyrics getLyrics(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            soup.LyricsSoapBindingStub _stub = new soup.LyricsSoapBindingStub(portAddress, this);
            _stub.setPortName(getLyricsWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setLyricsEndpointAddress(java.lang.String address) {
        Lyrics_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (soup.Lyrics.class.isAssignableFrom(serviceEndpointInterface)) {
                soup.LyricsSoapBindingStub _stub = new soup.LyricsSoapBindingStub(new java.net.URL(Lyrics_address), this);
                _stub.setPortName(getLyricsWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("Lyrics".equals(inputPortName)) {
            return getLyrics();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://soup", "LyricsService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://soup", "Lyrics"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("Lyrics".equals(portName)) {
            setLyricsEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
