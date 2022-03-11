const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const util = require('util');
const uuid = require('./helpers/uuid');
const path = require('path');
const notes = req.body;
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
app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});

// //read the db file data, show an error if no data
fs.readFile('/db/db.json', (err, data) => {
if (err) {
console.log ("Error: ", err);
}
})




//converting data to a string to save it
const stringData = JSON.stringify(newReview);

//making the string a file
fs.writeFile(`./db/${newReview.product}.json`, stringData, (err) =>
err
? console.error(err)
: console.log(
`The new note ${newReview.product} has been saved`
)
);



//Link all proper folders/files
//Do read and write files
//create an empty array for notes to go
//link buttons so when clicked they bring stuff up
//Need to link db.json for the write file

//need a param set up for the callback- returning the new note 
//uses a param for the delete option as well- BONUS

//The links are using get requests (clicking the button in index is firing off that get request, so the link)

//app.get()