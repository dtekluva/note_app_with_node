console.log("starting app.js")

var fs       = require('fs');
const yargs   = require('yargs');

const notes = require('./notes.js');
const  _     = require('lodash');


const titleOptions = {
    describe: 'Title of note',
    demand:    true,
     alias:     't'
}
const bodyOptions = {
    describe: 'Body of note',
    demand:    true,
    alias:     'b'
}
const argv   = yargs
    .command('add', 'add a new note', {
        title: titleOptions,
        body: bodyOptions
    })

    .command('list', 'List all notes note')
    .command('read', 'read a note', {
        title: titleOptions
    })
    .help()
    .argv;

var command  = argv._[0];
console.log('Command: ',command);
console.log('Yargs: ',argv);

if (command === 'add'){
  var note = notes.addNote(argv.title, argv.body);

  if(note) {
      console.log('note created');
    //   console.log('--');
    //   console.log(`title: ${note.title}`);
    //   console.log(`body: ${note.body}`);
    notes.logNote(note)
  }
  else{
    console.log('note title taken')
  }
} else if (command === 'list'){
    var list    = notes.getAll();
    console.log("Total notes : ", list.length, "found in database\n")
    list.forEach(element => {
        notes.logNote(element)
    });
    

} else if (command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message     = noteRemoved ? 'Note was removed' : 'NOte note rremoved';
    console.log(message)

} else if (command === 'read'){
    var note = notes.getNote(argv.title);
    console.log(note)
    if (note) {
        console.log('note found');
        notes.logNote(note)
    } else {
        console.log('note not found')
    }

} else {
    console.log('command not recognised')
}