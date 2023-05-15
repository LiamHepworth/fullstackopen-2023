const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())

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

const generateId = () => {
  return Math.floor(Math.random() * (1000 - 0) + 0)
}

let contacts = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get("/api/persons", (request, response) => {
  response.send(contacts)
})

//http://expressjs.com/en/guide/routing.html - see the route paramters section to see how we capture the id value.
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id
  const contact = contacts.find((cont) => cont.id == id)

  if (contact) {
    response.send(contact)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  contacts = contacts.filter((cont) => cont.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  console.log(request.body.name)

  if (!request.body.name) {
    return response.status(400).json({
      error: "no content",
    })
  } else if (contacts.find((el) => el.name == request.body.name)) {
    return response.status(404).json({
      error: "contact already exisits within phonebook",
    })
  }
  const newContact = {
    id: generateId(),
    name: request.body.name,
    number: request.body.number,
  }

  contacts = contacts.concat(newContact)
  response.json(newContact)
})

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${contacts.length} people</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
