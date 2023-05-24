const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://liammoses:${password}@testcluster.pyiixjc.mongodb.net/?retryWrites=true&w=majority`
mongoose.set("strictQuery", false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model("Contact", contactSchema)

if (process.argv.length < 4) {
  Contact.find({}).then((result) => {
    console.log("phonebook:")
    result.forEach((cont) => {
      console.log(cont.name, " ", cont.number)
    })
    mongoose.connection.close()
  })
} else {
  const newContact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  })

  newContact.save().then((result) => {
    console.log(
      `added ${newContact.name} to your phonebook, with the number ${newContact.number}`
    )
    mongoose.connection.close()
  })
}
