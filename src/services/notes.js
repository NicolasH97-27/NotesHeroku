import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

  const metodos = { 
    getAll: getAll, 

    create: create, //Dado que los nombres de las claves y las variables asignadas son los mismos, 
                    //podemos escribir la definición del objeto con una sintaxis más compacta: {getAll,create,update}
    update: update,

    setToken: setToken
  }

  export default metodos;