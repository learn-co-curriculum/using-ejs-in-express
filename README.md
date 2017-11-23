# Intro To Express.js

## Objectives

1. Understand the Express DSL
2. Learn a simple Express application structure
3. Load your first Express application
4. Build an express route.
5. Send a response to an HTTP request using Express

## Javascript, Meet `HTTP` with Node

Node introduced a module in the framework called `http`. This low-level module provides a way to turn a Javascript application into a web application. Instead of running a program and it exiting after the procedure terminates, a program that leverages `http` can create a server, an application that will stay on, listening for HTTP requests and providing http responses.

**File: [simpleNodeServer.js](https://github.com/learn-co-curriculum/intro-to-express-js/blob/master/simpleNodeServer.js)**
```js
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

The `http` object from Node has a method, `createServer` that will return an instance of an HTTP server. The function you provide to `createServer` is known as a handler. Every HTTP request the server receives will be passed to that function as the first argument, generally named `req` for "Request". That handler function's job is to send the HTTP response, which is setup as the second argument, generally named `resp` (or `res`) for "Response". `req` and `resp` have methods on them that provide all the HTTP functionality needed for HTTP requests and responses. We use `resp.write` to send information back in the HTTP response and `resp.end()` to terminate the response and send it back to the client.

The issue with the native Node `http` object is that the server can receive one function to handle all the HTTP requests that come in.

If we wanted to support multiple URLs in our application and do different things for each request, we would have to build everything into that main function passed to `createServer`. It would get messy fast, lots of looking at the `req` and figuring out URLs and building an internal routing engine, sort of like a traffic cop saying "Oh, the person wants our "About Page" at `/about`, so call the `AboutPage()` function and pass the response. It'd look like this:

**File: [nodeRouting.js](https://github.com/learn-co-curriculum/intro-to-express-js/blob/master/nodeRouting.js)**
```js
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
```

It's not the worst, but trust me, it would get ugly and unweildy very fast. The important thing to realize is that routing, the act of delegating a request based on a URL to a particular function to handle that request and send a response, is a key part of building a web application.

## Enter Express.js

The [Express.js](https://expressjs.com/) framework is built ontop of Node and `http` to make it easier to build web applications by supplying a [`Domain Specific Language (DSL)`](https://en.wikipedia.org/wiki/Domain-specific_language) ontop of Node `http`.

The main structure of an express program is as follows:

**File: [expressHelloWorld.js](https://github.com/learn-co-curriculum/intro-to-express-js/blob/master/expressHelloWorld.js)**
```js
const express = require('express')
const app = express()

app.get('/', function(req, resp){
  resp.send('Hello World!')
})

app.listen(3000)
```

First we load `express` by `require`ing it (and really first, we added it to our project by using `npm add express`).

We declare `app` to be an new instance of an express application using the `express()` constructor function.

This `app` instance has a variety of methods that make building complex web applications.

The first one we can see above is `.get()`. This, and the family of routing methods express provides, immediately solves our routing problem discussed with Node.

`.get()` takes two arguments, the first is the URL to match, the second is a handler function very similar to the one we saw in Node `http`. With this we can immediately route certain URLs based on HTTP verbs to specific functions. 

The express handler functions also take 2 arguments, the first for the requests, `req`, the second for the response, `resp`.

Instead of simply calling `resp.write()`, express provides higher level response methods that we are going to learn about shortly, but for now, `resp.send()` will send the response back to the browser or client.

Finally, we tell the `app` to listen to HTTP requests on port 3000.

With that, we've begun building web applications with Javascript, Node, and Express.

## Resources 

* [Hello World](https://expressjs.com/en/starter/hello-world.html)