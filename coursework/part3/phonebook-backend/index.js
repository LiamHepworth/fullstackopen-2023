const express = require("express")
const app = express()

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

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${contacts.length} people</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
