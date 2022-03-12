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
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        } else {
        //parsing data
        let parsedData =JSON.parse(data) //when you need to call JSON, caps. As a method, lowercase
        res.json(parsedData)
}})
}  ) 

//route to notes specifically
app.get("/notes", function (req, res) {
res.sendFile(path.join(__dirname, "public/notes.html"))
});

//fall back route
// if nothing else matches then *
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "index.html"));
});


app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body; //allows you to access data in a string (JSON)

    // If all the required properties are present
    if (title && text ) {
      // Variable for the object we will save
    const newReview = {
        title,
        text,
        id: uuid(),
    };

      // Obtain existing texts
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        } else {
          // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

          // Add a new review
        parsedNotes.push(newReview);

          // Write updated reviews back to the file
        fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
            writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
        );
        }
    });

    const response = {
        status: 'success',
        body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
    } else {
    res.status(500).json('Error in posting review');
    }
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


// app.get("/api/notes", function (req, res) {
    //   return res.sendFile(path.join(__dirname, "/db/db.json"))//THIS LINE WORKS
