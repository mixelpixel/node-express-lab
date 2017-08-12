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
  const id = posts.length + 1;
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

server.delete('/posts', (req, res) => {
  let idExists = false;
  let delPostid = parseInt(req.body.id);
  let index = -1;
  console.log(delPostid, idExists);

  if (!(delPostid + 1)) {  // 0 is false other nums true https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/
    res.status(STATUS_USER_ERROR);
    res.json({ err: 'Must provide a post id number to delete it' });
    return;
  }
  posts.map((post, indexId) => {    //check if the id exists in the posts array
   if (post.id == delPostid ) {
     idExists = true;
     index = indexId;  // we need this to delete the post on index number later on
     console.log(index, idExists); // we need this to delet the post later on
     return;
   }

  });
  if (!idExists) { //check if the post exists before deleting it
    res.status(STATUS_USER_ERROR);
    res.json({ err: `enter an id that exists` });
    return;
  }
  posts.splice((index), 1);
  res.send({ posts });
  //res.send({ sucess: true });
  delPostid = '';  // clear it so if another del request is sent , we check the newly sent id
  idExists = false; //reset ths checking in future
});


module.exports = { posts, server };
