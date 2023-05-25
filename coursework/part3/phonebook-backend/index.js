// require("dotenv").config()
const Contact = require("./models/contact")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(express.static("dist"))
app.use(express.json())
app.use(cors())

morgan.token("type", function (req, res) {
  return JSON.stringify(req.body)
})

//https://github.com/expressjs/morgan - Morgan middleware, to log HTTP requests
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      "~content-length:",
      tokens.res(req, res, "content-length"),
      "~response-time:",
      tokens["response-time"](req, res),
      "ms",
      "~data:",
      tokens.type(req, res),
    ].join(" ")
  })
)

const errorHandler = (error, request, response, next) => {
  // console.log(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }

  next(error)
}

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((cont) => {
    response.json(cont)
  })
})

app.post("/api/persons", (request, response) => {
  console.log(request.body.name)

  if (!request.body.name) {
    return response.status(400).json({
      error: "no content",
    })
  }
  // else if (contacts.find((el) => el.name == request.body.name)) {
  //   return response.status(404).json({
  //     error: "contact already exisits within phonebook",
  //   })
  // }

  const newContact = new Contact({
    name: request.body.name,
    number: request.body.number,
  })

  newContact.save().then((savedContact) => {
    response.json(savedContact)
  })
})

//http://expressjs.com/en/guide/routing.html - see the route paramters section to see how we capture the id value.
//needs updating to draw from database now
app.get("/api/persons/:id", (request, response) => {
  Contact.findById(request.params.id)
    .then((cont) => {
      if (cont) {
        response.json(cont)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      console.log(error)
      response.status(400).send({ error: "malformatted id" })
    })
})

//needs updating to draw from database now
app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

//needs updating to work with DB
// app.get("/info", (request, response) => {
//   response.send(`<p>Phonebook has info for ${contacts.length} people</p>`)
// })

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
