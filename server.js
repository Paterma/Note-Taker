const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const util = require('util');
// const uuid = require('./helpers/uuid');
const path = require('path');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const savedNotes = []; //array for my saved notes


//allows a post to be made
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//allows access to the folders 
app.use(express.static('public'));

//get route for homepage
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);
// cnnecting with db.json
app.get("/api/notes", function (req, res) {
res.sendFile(path.join(__dirname, "db/db.json"))
});

//route to notes specifically
app.get("/notes", function (req, res) {
res.sendFile(path.join(__dirname, "public/notes.html"))
});

//fall back route
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});

// //read the db file data, show an error if no data, push note if there is data
fs.readFile('/db/db.json', (err, data) => {
if (err) {
console.error(err);
} else {
    const notes = req.body; //allows you to access data in a string (JSON)
//pushing new notes in the saved array
    savedNotes.push(notes);
}
})
//parsing data
const parsedData = data.toString()
savedNotes = JSON.parse(parsedData)





//making the string a file
fs.writeFile(`./db/db.json`, JSON.stringify (savedNotes, (err) =>
err
? console.error(err)
: console.log("New note has been saved")
)
);
//a promise to run
res.send("Achieved")

//the server will keep running
app.listen(PORT, function () {
    console.log(`Listening on ${PORT}...`)
})



//Link all proper folders/files
//Do read and write files
//create an empty array for notes to go
//link buttons so when clicked they bring stuff up
//Need to link db.json for the write file
//app.get()
//need a param set up for the callback- returning the new note 
//need to go to heroku
//The links are using get requests (clicking the button in index is firing off that get request, so the link)

