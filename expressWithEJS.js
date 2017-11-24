const express = require('express')
const app = express()
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, resp){
  resp.render('firstEJSTemplate')
})

app.listen(3000)