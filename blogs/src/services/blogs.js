import axios from 'axios'
const baseUrl = BACKEND_URL + '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: {"Authorization": token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, blog) => {
  const config = {
    headers: {"Authorization": token}
  }

  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: {"Authorization": token}
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

const addComment = async (id, comment) => {
  const config = {
    headers: {"Authorization": token}
  }

  const response = await axios.post(`${baseUrl}/${id}/comments`, {comment}, config)
  return response.data
}

export default { getAll, create, update, remove, setToken, addComment}