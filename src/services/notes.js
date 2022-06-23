import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


  
  const metodos = { 
    getAll: getAll, 

    create: create, //Dado que los nombres de las claves y las variables asignadas son los mismos, 
                    //podemos escribir la definición del objeto con una sintaxis más compacta: {getAll,create,update}
    update: update 
  }

  export default metodos;