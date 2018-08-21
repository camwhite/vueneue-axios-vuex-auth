import axios from 'axios'

export const signup = async (user) => {
  const { data } = await axios.post('auth/signup', user)
  return data
}

export const signin = async (user) => {
  const { data } = await axios.post(`auth/signin`, user)
  return data
}

export const get = async (path) => {
  const { data } = await axios.get(path)
  return data
}

export const post = async (path, body) => {
  const { data } = await axios.post(path, body)
  return data
}

export const put = async (path, body) => {
  const { data } = await axios.put(path, body)
  return data
}

export const del = async (path, body) => {
  const { data } = await axios.delete(path, body)
  return data
}
