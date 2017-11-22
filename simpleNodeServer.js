var http = require('http');

// Create a Server Object
const server = http.createServer(function(req, res){
  console.log("HTTP request received!")

  res.write('Hello World!'); // Send a response to the client
  res.end(); // Close the HTTP connection
  
  console.log("...continuing to listen...")
})

console.log("Starting Server on Port 3000")
server.listen(3000) //the server object listens on port 8080