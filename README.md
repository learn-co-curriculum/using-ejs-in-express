# Intro To Express Js

## Objectives

1. Understand the Express DSL
2. Learn a simple Express application structure
3. Load your first Express application
4. Build an express route.
5. Send a response to an HTTP request using Express
6. 

## Instructions

Node introduced a module in the framework called `http`. This low-level module provides a way to turn a Javascript application into a web application. Instead of running a program and it exiting after the procedure terminates, a program that leverages `http` can create a server, an application that will stay on, listening for HTTP requests and providing http responses.

**File: [simpleNodeServer.js]()**
```js
var http = require('http');

// Create a Server Object
const server = http.createServer(function(req, resp){
  console.log("HTTP request received!")

  resp.write('Hello World!'); // Send a response to the client
  resp.end(); // Close the HTTP connection

  console.log("...continuing to listen...")
})

console.log("Starting Server on Port 3000")
server.listen(3000) //the server object listens on port 3000
```

_Note: On the IDE these servers will work however for now you won't be able to find the IP address of the server._

By requiring `http`, we get access to a class that can create instances of web servers (using `http.createServer()`) that can listen for TCP/IP connections that are valid `HTTP` requests and send valid `HTTP` responses. When we run our application, `node simpleNodeServer.js` and visit `http://localhost:3000` we would see `Hello World!` in our browser. Our terminal would log:

```
Starting Server on Port 3000
HTTP request received!
...continuing to listen...
HTTP request received!
...continuing to listen...
```

With that functionality we can build web applications as complex as Facebook, Airbnb, and everything.

The `http` object from Node has a method, `createServer` that will return an instance of an HTTP server. The function you provide to `createServer` is known as a handler, every HTTP request the server receives will be passed to that function as the first 

The issue with the native Node `http` object is that the server can receive one function to handle all the HTTP requests that come in.

If we wanted to support multiple URLs in our application and do different things for each request, we would have to build everything into that main function passed to `createServer`. It would get messy fast, lots of looking at the `req`
