const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/post');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { posts: posts });
    }
  });
});

app.get('/posts/new', (req, res) => {
  res.render('new');
});

app.post('/posts', (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;

  const newPost = new Post({
    title: title,
    body: body,
    author: author
  });

  newPost.save();
  res.redirect('/');
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});