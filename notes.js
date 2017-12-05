console.log('starting notes.js');

const fs = require('fs');

var fetchNotes = ()=>{
    try {
        var notesString = fs.readFileSync('note-data.json');
        return JSON.parse(notesString);
        
    } catch (e) {
    return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('note-data.json', JSON.stringify(notes));    
}

var addNote = (title, body) => {

    var notes = fetchNotes();
    var note  = {
        title,
        body
    };


    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll     = (title) =>{
    var notes  = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0], notes;
    // console.log('Getting all note');
};
var getNote    = (title) =>{
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title)
    return filteredNotes[0];
    // console.log('Getting note', title);
};
var removeNote = (title) =>{
    var notes         = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
    console.log('Removing note', title);
};

var logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    removeNote,
    getNote,
    logNote
}