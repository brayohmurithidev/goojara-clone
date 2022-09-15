const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app  = express();
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'TestDB',
})
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET ROUTES
app.get('/api/GetReviews', (req, res) => {
    const sqlSelect =  "SELECT * FROM movies_review";
   db.query(sqlSelect, (err, rows) => {
    res.send(rows);
   })
});

// DELETE ROUTE
app.delete('/api/delete/:id', (req, res) => {
  const sqlDelete = 'DELETE FROM movies_review WHERE id = ?';
  const id = req.params.id;

  
  db.query(sqlDelete, id, (err, rows) => {
    if(err) console.log(err);
  })});

// POST ROUTE
app.post('/api/insert', (req, res) => {
  const movie_name = req.body.movie_name;
  const review = req.body.review;
  const sqlInsert = "INSERT INTO movies_review(movie_name, review) VALUES(?, ?);";

  // INSERT
  db.query(sqlInsert, [movie_name, review], (err, result) => {
    console.log(result);
  });
})

// UPDATE ROUTES
app.put('/api/update', (req, res) => {
  const review = req.body.review;
  const name = req.body.movie_name;
  console.log(review, name);
  const sqlUpdate = 'UPDATE movies_review SET review = ? WHERE movie_name = ?';

  db.query(sqlUpdate, [review,name], (err, rows) => {
    if(err) console.log(err);
  })});

// Listener configuration
app.listen(3001, () => {
  console.log('Listening on port 3001...');
});