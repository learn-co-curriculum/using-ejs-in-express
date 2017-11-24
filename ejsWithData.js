const express = require('express')
const app = express()
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, resp){
  const welcomeText = "Welcome to EJS"
  const favoriteThings = [
    "NYC"
    "Music",
    "Code",
    "Movies"
  ]
  resp.render('dataTemplate', {
    viewVariable: "I'm available in the view as `viewVariable`"
    welcomeText: welcomeText,
    favoriteThings, favoriteThings
  })
})

app.listen(3000)