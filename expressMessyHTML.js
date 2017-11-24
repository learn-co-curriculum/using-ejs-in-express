const express = require('express')
const app = express()

app.get('/', function(req, resp){
  const html = `
    <!doctype html>
    <html>
      <head>
        <title>Let's Use EJS</title>
      </head>
      <body>
        <h1>Learning To Use EJS</h1>    
      </body>
    </html>
  `

  resp.send(html)
})

app.listen(3000)