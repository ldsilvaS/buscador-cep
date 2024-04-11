import axios from "axios"

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"    // Criado o service da api
})



export default api;   // Exportando a API.