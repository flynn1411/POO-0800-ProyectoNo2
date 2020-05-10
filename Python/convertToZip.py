import zipfile
import sys

fileList = sys.argv
fileList.pop(0)
if(fileList!= None):        
    with zipfile.ZipFile('songs.zip','w') as archivo_zip:
        for i in fileList:
            archivo_zip.write(i)

    archivo_zip.close()