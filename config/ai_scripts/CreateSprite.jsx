// Import Folder's Files as Layers - Illustrator CS3 script
// Description: Imports a series of images (from the designated folder) as named layers into a new document
// Author: Nathaniel V. KELSO (nathaniel@kelsocartography.com)
// Version: 1.0.0 on 10/March/2009

// Global script setting
var frameWidth = 0, frameHeight = 0, groups = [], srcFolder;
var targetWidth = 40, targetHeight = 108;
var spriteDoc;

function importFileToSprite(frameDoc, spriteDoc, spriteIndex) {
    frameDoc.selectObjectsOnActiveArtboard();
    app.copy();
    frameDoc.close(SaveOptions.DONOTSAVECHANGES);
    spriteDoc.activate();
    app.paste();
    
    var sel = app.activeDocument.selection;
        
     var newGrp = app.activeDocument.groupItems.add();
     for (i =0; i < sel.length; i++) {
        sel[i].move(newGrp, ElementPlacement.PLACEATEND);
        frameWidth < newGrp.width && (frameWidth = newGrp.width);
        frameHeight < newGrp.height && (frameHeight = newGrp.height);
     }
    groups.push(newGrp);
    
}

function importFolder() {	
	// if a folder was selected continue with action, otherwise quit
    var frameDoc;    
    spriteDoc = app.documents.add();
    
    selectedFolder = Folder.selectDialog('Please select the folder containing images you want to create sprite from:', "E:\\MyDocs\\Work\\hub43\\Dots\\Animation");
    if (selectedFolder) {
        // create document list from files in selected folder
        var imageList = selectedFolder.getFiles();
        for (var i = 0; i < imageList.length; i++) {
            frameDoc = app.open(imageList[i]);
            importFileToSprite(frameDoc, spriteDoc, i);
        }	
	} else {
		// alert("The action has been cancelled.");
		// display error message if no supported documents were found in the designated folder
		alert("Rerun the script and choose a folder with images.");
		//importFolderAsLayers(getFolder());
	}
}
function placeGroups()  {
    for (i = 0; i < groups.length ; i ++)  {
        groups[i].left = i * frameWidth + (frameWidth - groups[i].width) / 2;
        groups[i].top = app.activeDocument.height - (frameHeight - groups[i].height) / 2;
    }
}

function moveToDoc() {
    //alert('width : ' + groups.length * frameWidth + ' height: ' + frameHeight);
     var f = app.documents.add(DocumentColorSpace.RGB,  groups.length * frameWidth, frameHeight);
      spriteDoc.activate();
     spriteDoc.selectObjectsOnActiveArtboard();
     app.copy();
     f.activate();
     app.paste();
     //spriteDoc.close(SaveOptions.DONOTSAVECHANGES);   
}
// Start the script off
importFolder( );
placeGroups();
moveToDoc();