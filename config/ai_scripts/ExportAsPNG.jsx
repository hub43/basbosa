// Import Folder's Files as Layers - Illustrator CS3 script
// Description: Imports a series of images (from the designated folder) as named layers into a new document
// Author: Nathaniel V. KELSO (nathaniel@kelsocartography.com)
// Version: 1.0.0 on 10/March/2009

// Global script setting
var frameWidth = 0, frameHeight = 0, groups = [], srcFolder;
var targetWidth = 40, targetHeight = 108;
var spriteDoc, selectedFolder;


function importFolder() {	
	// if a folder was selected continue with action, otherwise quit
    var frameDoc;    
    
    
    selectedFolder = Folder.selectDialog('Please select the folder containing images you want to create to convert png:', "E:\\www\\dev\\basbosa\\dotsc\\themes\\default\\img");
    if (selectedFolder) {
        // create document list from files in selected folder
        var imageList = selectedFolder.getFiles();
        for (var i = 0; i < imageList.length; i++) {
            frameDoc = app.open(imageList[i]);
            exportFileToPNG8(getTargetFile(frameDoc.name, '.png', selectedFolder));
            frameDoc.close(SaveOptions.DONOTSAVECHANGES);
            
        }	
	} else {
		// alert("The action has been cancelled.");
		// display error message if no supported documents were found in the designated folder
		alert("Rerun the script and choose a folder with images.");
		//importFolderAsLayers(getFolder());
	}
}
function exportFileToPNG8 (dest) {
    if ( app.documents.length > 0 ) {
        var exportOptions = new ExportOptionsPNG8();
        var type = ExportType.PNG8;
        var fileSpec = new File(dest);
        exportOptions.matt = false;
        app.activeDocument.exportFile( fileSpec, type, exportOptions );
    }
}
function exportFileToPNG24 (dest) {
    if ( app.documents.length > 0 ) {
        var exportOptions = new ExportOptionsPNG24();
        var type = ExportType.PNG24;
        var fileSpec = new File(dest);
        app.activeDocument.exportFile( fileSpec, type, exportOptions );
    }
}

/** Returns the file to save or export the document into.
	@param docName the name of the document
	@param ext the extension the file extension to be applied
	@param destFolder the output folder
	@return File object
*/
function getTargetFile(docName, ext, destFolder) {
	var newName = "";

	// if name has no dot (and hence no extension),
	// just append the extension
	if (docName.indexOf('.') < 0) {
		newName = docName + ext;
	} else {
		var dot = docName.lastIndexOf('.');
		newName += docName.substring(0, dot);
		newName += ext;
	}
	
	// Create the file object to save to
	var myFile = new File( destFolder + '/' + newName );
	
	// Preflight access rights
	if (myFile.open("w")) {
		myFile.close();
	}
	else {
		throw new Error('Access is denied');
	}
	return myFile;
}


// Start the script off
importFolder( );
