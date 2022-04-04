const methodOverride = require('method-override');
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const path = require('path');
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true })); //makes post data to go through express
app.use(express.json()); //makes post json data to go through express
app.use(methodOverride('_method')); //for editing

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// INDEX  /comments   GET   Display all comments
let comments = [
  {
    id: uuid(),
    username: 'Rajeev',
    comment: 'Whats a lovely hen',
    details: 'Hen has two eyes 4 eggs in their pocket.',
  },
  {
    id: uuid(),
    username: 'Vishwas',
    comment: 'Tasty hen',
    details: 'Hen has two eyes 4 eggs in their pocket.',
  },
  {
    id: uuid(),
    username: 'Rachit',
    comment: 'I want this beautiful hen',
    details: 'No hen has two eyes only 2 eggs in their pocket.',
  },
  {
    id: uuid(),
    username: 'Harsh',
    comment: 'Cheee big hens eat insects',
    details: 'hen has two eyes 4 eggs in their pocket.',
  },
];

app.get('/', (req, res) => {
  res.render('comments/index', { comments });
});

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
});

// NEW  /comments/new   GET   Form to Create new
app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

// CREATE  /comments   post   Create new comment on server
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  // console.log(req.body);
  // res.send('Your comment is successfully saved');
  res.redirect('/comments');
});

// SHOW  /comments/:id   get   Details for one specific comment
app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render('comments/show', { comment });
});

// EDIT  /comments/:id   get   Edit one specific comment
app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newComment;
  res.redirect('/comments');
});
app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render('comments/edit', { comment });
});

// DELETE  /comments/:id   get   Delete one specific comment
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect('/comments');
});
// --------------------------------------
app.get('/search', (req, res) => {
  res.send('Get Hello World!');
  console.log(req.body); //only takes string
});

app.post('/search', (req, res) => {
  res.send(`Your request for ${req.body.search.toUpperCase()} is here`);
  console.log(req.body); //takes json
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/`);
});
