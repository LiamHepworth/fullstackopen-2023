import axios from "axios"
const baseUrl = "/phonebook-backend/contacts.json"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const deleteEntry = (deletionId) => {
  const request = axios.delete(`${baseUrl}/${deletionId}`)
  return request.then((response) => response.data)
}

const update = (id, updateObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updateObject)
  return request.then((response) => response.data)
}

export default { getAll, create, deleteEntry, update }
