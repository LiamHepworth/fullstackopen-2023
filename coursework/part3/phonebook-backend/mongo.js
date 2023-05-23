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
