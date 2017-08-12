const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];
let post = {};

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  let id = posts.length;
  if (!title || !contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ err: 'Must provide a title and content' });
    return;
  }
  console.log(title, contents);
  post = { id, title, contents };
  posts.push(post);
  res.send({ posts });
});


module.exports = { posts, server };
