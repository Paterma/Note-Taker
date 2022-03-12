const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs')
const util = require('util');
const uuid = require('./helpers/uuid'); //generates unique ID's
const path = require('path');
const res = require('express/lib/response');
const { parse } = require('path');
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

const readFileAsync = util.promisify(fs.readFile)
// cnnecting with db.json
app.get("/api/notes", (req, res) => {
//   return res.sendFile(path.join(__dirname, "/db/db.json"))//THIS LINE WORKS

// function read() {return readFileAsync('./db/db.json', 'utf8')}
// function readFiles() {
//     read().then(data => {
//         let parsedData = [].concat(JSON.parse(data))
//         console.log(parsedData)
//         return parsedData
//     })
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        } else {
        //parsing data
        let parsedData = [].concat(JSON.parse(data))
       parsedData.push(content);
       //   writeToFile(file, parsedData)
//     //     }
//     //     })} 
// };
// try {

//     res.status(200).json(readFiles());
//     console.log('success')
// } catch {
//     console.log(error)
// }
})

//res.json()

//route to notes specifically
app.get("/notes", function (req, res) {
res.sendFile(path.join(__dirname, "public/notes.html"))
});

//fall back route
// if nothing else matches then *
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});
// newNoteBtn = document.querySelector('.new-note');

//destructing the notes
// const { noteTitle, noteText} = req.body; //allows you to access data in a string (JSON) 
// const notes = {
//     noteTitle,
//     noteText,
//     review_id: uuid(),
// };
// //read the db file data, show an error if no data, push note if there is data


//making the string a file
// fs.writeFile(`./db/db.json`, JSON.stringify (savedNotes, (err) =>
// err
// ? console.error(err)
// : console.log("New note has been saved")
// )
// );
//need a param set up for the callback- returning the new note 
// const specificTerm = req.params.somethinghere(toLowerCase){

// }

//the server will keep running
app.listen(PORT, function () {
    console.log(`Listening on  http://localhost:${PORT}`)
})
//need to do a callback function
//Link all proper folders/files
//Do read and write files
//create an empty array for notes to go
//link buttons so when clicked they bring stuff up
//Need to link db.json for the write file
//app.get()
//need a param set up for the callback- returning the new note 
//DEPLOY TO HEROKU
//The links are using get requests (clicking the button in index is firing off that get request, so the link)


app.get("/api/notes", function (req, res) {
    //   return res.sendFile(path.join(__dirname, "/db/db.json"))//THIS LINE WORKS
