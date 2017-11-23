const http = require('http');

// Create a Server Object
const server = http.createServer(function(req, resp){
  // req.url contains the URL of the Request  
  if (req.url.match("/about")){
    AboutPage(resp)
  } else if (req.url.match("/contact")){
    ContactPage(resp)
  } else {
    HomePage(resp)
  }
  resp.end()
})

console.log("Starting Server on Port 3000")
server.listen(3000) //the server object listens on port 3000

function AboutPage(resp){
  resp.write("The About Page")
}

function ContactPage(resp){
  resp.write("The Contact Page")
}

function HomePage(resp){
  resp.write("The Home Page")
}
