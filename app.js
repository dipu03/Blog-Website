
const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash')

let app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const ipsumTextObj = require('./util/sampleIpsum')
const posts = [];
posts.push(ipsumTextObj.day1, ipsumTextObj.day2)

app.get("/", (req, res) => {
  res.render("home", {startingContent : ipsumTextObj.homeStartingContent, newPost : posts})
})

app.get("/about", (req, res) => {
  res.render("about", {aboutPageContent : ipsumTextObj.aboutContent})
})

app.get("/contact", (req, res) => {
  res.render("contact", {contactPageContent : ipsumTextObj.contactContent})
})

app.get("/compose", (req, res) => {
  res.render("compose")
})

app.post("/compose", (req, res) => {

  let post = {
    title : req.body.postTitle,
    body : req.body.postBody
  }
  posts.push(post)
  res.redirect("/")
});

app.get("/posts/:postName", (req, res) => {
  let requestedTitle = _.lowerCase(req.params.postName)

  posts.forEach((elm) => {

    let storedTitle = _.lowerCase(elm.title)

    if( storedTitle === requestedTitle){
      res.render("post", {title : elm.title, body : elm.body})
    }
  })
  res.render("post", {title : "Oops !!" , body : "Post Title Not Found. Please Try again with Correct Title."})
})



app.listen(PORT, function() {
  console.log("Server started on port: " + PORT);
});






