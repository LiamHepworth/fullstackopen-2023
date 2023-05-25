require("dotenv").config()
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)
const url = process.env.MONGODB_URI

console.log(url)

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const contactSchema = new mongoose.Schema({
  // name: String,
  // number: String,
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 11,
    required: true,
  },
})

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Contact", contactSchema)
