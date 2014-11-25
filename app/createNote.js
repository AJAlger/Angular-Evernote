/**
 * Created by Abdullah-Mac on 11/25/14.
 */
var Evernote = require('evernote').Evernote;

function makeNote(noteStore, noteTitle, noteBody, parentNotebook, callback) {

    var nBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    nBody += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
    nBody += "<en-note>" + noteBody + "</en-note>";

    // Create note object
    var ourNote = new Evernote.Note();
    ourNote.title = noteTitle;
    ourNote.content = nBody;

    // parentNotebook is optional; if omitted, default notebook is used
    if (parentNotebook && parentNotebook.guid) {
        ourNote.notebookGuid = parentNotebook.guid;
    }

    // Attempt to create note in Evernote account
    noteStore.createNote(ourNote, function(err, note) {
        if (err) {
            // Something was wrong with the note data
            // See EDAMErrorCode enumeration for error code explanation
            // http://dev.evernote.com/documentation/reference/Errors.html#Enum_EDAMErrorCode
            console.log(err);
        } else {
            callback(note);
        }
    });

}
