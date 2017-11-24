# Using EJS Templates in Express

## Objectives

1. Understand what an EJS template is and how it generates HTML.
2. Use `<%= %>` to embed the return value of a Javascript expression in HTML.
3. Render an EJS template from an Express handler using `resp.render()`
4. Pass data from an Express handler into EJS via `resp.render()`
5. Use data from an Express handler in an EJS template with `<%= %>`.
6. Iterate through an array in an EJS template using `<% %>` to generate HTML.

_A [video lecture](#video-lecture) covering this content is below the README_

**To play with these examples, you have to `git clone git@github.com:learn-co-curriculum/using-ejs-in-express.git` into the Learn IDE or your environment. Then, `cd using-ejs-in-express` to work in the project folder. Run `npm install` too.**

## EJS Templates

Even with Express' simplicity of request routing through handler functions, our handler functions can get pretty messy if we're sending back a full HTML document and the response.

**File: [expressMessyHTML.js](https://github.com/learn-co-curriculum/using-ejs-in-express/blob/master/expressMessyHTML.js)**
```js
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
```

Even with a relatively small HTML document, putting it directly in the handler function already looks messy. We have two languages in 1 function and if we needed to do anything dynamic or have 100 of lines of HTML, it would get worse, and fasts.

Instead of writing HTML within a handler, we use Express to render templates of HTML where we can embed Javascript to create dynamic HTML.

## What's a Template?

A template is a document that contains the structure and content for the final output, but also contains sections that need to be interpreted and compiled in order to generate the final document. They are sort of like "Mail Merges".

A Hypothetical Template Example:

```
Dear <FirstName>,

Congratulations on your <Occassion>!

We send our love to:

<For Each FamilyMemberName in FamilyMembers>
  <FamilyMemberName>
<End For Each>

Mazal Tov!
```

In this hyptothetical template format, variables and logic are defined by being enclosed in `< >`. So `<FirstName>` isn't literally those sequence of characters, but rather represents a variable `FirstName` meant to be injected into the document. The section with some logic is:

```
<For Each FamilyMemberName in FamilyMembers>
  <FamilyMemberName>
<End For Each>
```

This would represent a loop, saying that there was a collection of `FamilyMembers` and for each one, print out the `FamilyMemberName`.

Given the following data:

```
FirstName = "Avi"
Occassion = "Graduation"
FamilyMembers = ["Sarah", "Jonathan"]
```

The template would generate:

```
Dear Avi,

Congratulations on your Graduation!

We send our love to:

Sarah
Jonathan

Mazal Tov!
```

If the data changed, so would the produced final content. Express supports many template libraries for generating HTML, [EJS](http://www.embeddedjs.com) and [Jade](http://jade-lang.com/) are popular ones, we're going to learn about EJS.

## EJS Templates

EJS templates are files that contain text, generally HTML, along with special "EJS" tags that allow for you to embed a Javascript expression whose evaluation (return value) will be added to the template when compiled.

The two EJS tags you need to learn about are:

* `<%= %>` - Used to output the return value of an expression into the document, e.g, `<%= 1+1 %>` will add `2` to the document.
* `<% %>` - Used to evaluate an expression, but not add the return value to the document, e.g, `<% const name = "Avi"%>` defines a `name` variable, but does not add the return value of the expression (in this case, `undefined`), to the document.

We'll be putting our EJS templates in `views` directory for all our Express applications. 

**File: [views/firstEJSTemplate.ejs](https://github.com/learn-co-curriculum/using-ejs-in-express/blob/master/views/firstEJSTemplate.ejs)**
```ejs
<!doctype html>
<html>
  <head>
    <title>Let's Use EJS</title>
  </head>
  <body>
    <h1>Learning To Use EJS</h1>
    <p>The time now is: <%= new Date() %></p>
  </body>
</html>
```

The goal of this template is to embed the current date and time each time the template is compiled. If we compiled it right now we'd get:

```html
<!doctype html>
<html>
  <head>
    <title>Let's Use EJS</title>
  </head>
  <body>
    <h1>Learning To Use EJS</h1>
    <p>The time now is: 2017-11-24T18:39:14.245Z</p>
  </body>
</html>
```

If we then compiled it again in 10 minutes, we'd get:

```html
<!doctype html>
<html>
  <head>
    <title>Let's Use EJS</title>
  </head>
  <body>
    <h1>Learning To Use EJS</h1>
    <p>The time now is: 2017-11-24T18:49:14.245Z</p>
  </body>
</html>
```

Everyime we compile the template, the line `<%= new Date() %>` would actually evaluate and return the current date and time. That's what makes EJS powerful, we can embed code and logic into our template to generate dynamic HTML.

## Using EJS with Express

To use EJS with Express, you have to add `ejs` to your node application with `npm add ejs`. Once the node application has `ejs` in the `package.json`, you have to then tell your express application that your template rendering engine is EJS and the location of your templates.

**File: [expressWithEJS.js](https://github.com/learn-co-curriculum/using-ejs-in-express/blob/master/expressWithEJS.js)**
```js
const express = require('express')
const app = express()
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, resp){
  resp.render('firstEJSTemplate')
})

app.listen(3000)
```

The lines at the top are how we configure the express application, `app`, to use EJS.

```js
const express = require('express')
const app = express()
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

We use the `path` package to get the current directory path and join it with the `views` directory to create a full path to the views directory to use for this application - `app.set('views', path.join(__dirname, 'views'));`

The next line, `app.set('view engine', 'ejs');` sets the application's view engine to `ejs`. With that we get access to a new function available on our response object passed to a route handler function: 

```js
app.get('/', function(req, resp){
  resp.render('firstEJSTemplate')
})
```

`resp.render('templateFile)` tells the response object to render (or compile) the template, `templateFile`, located in the `views` directory and send the generated document as the response to the HTTP request. Since our template is `views/firstEJSTemplate.ejs` we tell the response to `resp.render('firstEJSTemplate')`. 

**Note: We leave out the file extension `.ejs` during the `render()` call. We also don't have to mention the `views` directory as we already told Express to always look inside views.**

If we start this application with `node expressWithEJS.js` and loaded the site in our browser, we'd see:

![Site with EJS](https://cl.ly/nv7A/Image%202017-11-24%20at%201.49.33%20PM.png)

## Passing Data from a handler function to an EJS Template

Generally the data we want to embed into our HTML is coming from Models or other data sources loaded during the event handler. Imagine:

```js
app.get('/', function(req, resp){
  const welcomeText = "Welcome to EJS"
  const favoriteThings = [
    "NYC",
    "Music",
    "Code",
    "Movies"
  ]

  resp.render('dataTemplate')
})
```

In **[views/dataTemplate.ejs](https://github.com/learn-co-curriculum/using-ejs-in-express/blob/master/views/dataTemplate.ejs)** we'd probably want to do something like:
```ejs
<!doctype html>
<html>
  <head>
    <title>Let's Use EJS</title>
  </head>
  <body>
    <h1><%= welcomeText %></h1>
    <h2>My Favorite Things</h2>
    <ul>
      <% favoriteThings.forEach(function(thing){ %>
        <li><%= thing %></li>
      <% }) %>
    </ul>
  </body>
</html>
```

In an effort to generate:

```html
<!doctype html>
<html>
  <head>
    <title>Let's Use EJS</title>
  </head>
  <body>
    <h1>Welcome to EJS</h1>
    <h2>My Favorite Things</h2>
    <ul>
      <li>NYC</li>
      <li>Music</li>
      <li>Code</li>
      <li>Movies</li>
    </ul>
  </body>
</html>
```

The handler function defined two variables, `welcomeText` and `favoriteThings`. The template should be able to access the data defined in the handler function in the form of local Javascript variables. To achieve this and have the variables defined in the handler function accessible in the view template, we must explicitly pass them in via the `resp.render()` function. `resp.render()` takes two arguments, the first the template file to render. The second argument is a javascript object whose keys become local variables in the view set to the key's value in the object.

**File: [ejsWithData.js](https://github.com/learn-co-curriculum/using-ejs-in-express/blob/master/ejsWithData.js)**
```js
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
    viewVariable: "I'm available in the view as 'viewVariable'"
    welcomeText: welcomeText,
    favoriteThings, favoriteThings
  })
})

app.listen(3000)
```

We pass render a javascript object with three keys, `viewVariable`, `welcomeText`, and `favoriteThings`. Those keys' values, a String, a variable referencing a string, and a variable referencing an Array, become available in the view as local variables. 

If you wrote `<%= viewVariable %>` in `dataTemplate.ejs`, our HTML would include: `"I'm available in the view as 'viewVariable'"`.

You could imagine it being a little neater by seperating the creation of the object you're passing to the view as its own variable:

```js
app.get('/', function(req, resp){
  const welcomeText = "Welcome to EJS"
  const favoriteThings = [
    "NYC"
    "Music",
    "Code",
    "Movies"
  ]
  const viewData = {
    viewVariable: "I'm available in the view as 'viewVariable'"
    welcomeText: welcomeText,
    favoriteThings, favoriteThings
  }

  resp.render('dataTemplate', viewData)
})
```

That's how you pass data to the view.

### Iterating Through Data in the View

Let's look at one part of the view that's a bit more complex. 

```ejs
<ul>
  <% favoriteThings.forEach(function(thing){ %>
    <li><%= thing %></li>
  <% }) %>
</ul>
```

What we're doing here is creating an `li` for each element inside of `favoriteThings` array. 

Since the first expression to achieve this is the loop construct, `forEach`, we don't use `<%= %>` but rather `<% %>`. We use `forEach` on the array to start a loop and enclose the entire opening in `<% %>` - `<% favoriteThings.forEach(function(thing){ %>`. 

The template engine begins the loop and will include the next line, outside of any EJS tags, once for each element in the array, thereby adding 3 `li`s to our final HTML. Within that, we can still use EJS to include the value of each element through the argument we pass to the `forEach` callback function, named `thing` in this example. `<li><%= thing %></li>`. 

Finally, we end the loop by closing the callback function and the `forEach`. `<% }) %>`

Looping is a bit tricky but super important, so make sure to practice it.

## Video Lecture

<iframe width="560" height="315" src="https://www.youtube.com/embed/OovkL82Jnx8?rel=0&modestbranding=1" frameborder="0" allowfullscreen></iframe><p><a href="https://youtu.be/OovkL82Jnx8">Intro to Express</a></p>

[Slides](https://docs.google.com/presentation/d/1cqqONyI0s3dnwzKmK34MMvQmh31mQrZ0mj7Pw_c-PBg/edit#slide=id.g242ae760d7_0_47)

## Resources 

* [Templating with EJS](https://scotch.io/tutorials/use-ejs-to-template-your-node-application)
