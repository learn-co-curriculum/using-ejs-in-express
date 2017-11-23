const http = require('http');

// Create a Server Object
const server = http.createServer(function(req, resp){
  console.log("HTTP request received!")

  resp.write('Hello World!'); // Send a response to the client
  resp.end(); // Close the HTTP connection

  console.log("...continuing to listen...")
})

console.log("Starting Server on Port 3000")
server.listen(3000) //the server object listens on port 3000