import {FiSearch} from 'react-icons/fi'
import { useState } from 'react';
import './styles.css'
import api from './services/api';

function App() {

  const [input, setInput] = useState('')    // Criada para guardar o estado do input
  const [cep, setCep] = useState({}) // Criada para guardar o response recebido pela api
  
  async function heandleSearch() {   // Crio uma async function, pois o processo é assincrono.
    if(input === '') {
      alert('Informe algum CEP')
      return
    }

    try{
      const response = await api.get(`${input}/json`)  // guardo no response o valor que recebo da api.
      setCep(response.data)    // Guardo no cep apenas o objeto recebido pelo response
      setInput('') // Limpo o input
      console.log(cep)
      if(cep.logradouro){
        console.log('Existe')
        console.log(cep.logradouro)
      }else{
        console.log('Não Existe')
        console.log(cep.logradouro)
      }
    }catch{
      alert("Erro ao buscar o CEP, tente novamente!")
      setInput('')  // Limpo o input
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>


      <div className="containerInput">
        <input 
          type="text"
          placeholder="Informe seu CEP"
          value={input} // referencio o valor para o input
          onChange={(e) => setInput(e.target.value)} // Seto o valor digitado dentro do input.
        />


        <button className="buttonSearch" onClick={heandleSearch}>
          <FiSearch size={25} color='#FFF'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (      // Sintaxe utilizada para mostrar a div main, apenas se existir valor dentro do input
        <section className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Estrada: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>

        </section>
      )} 

    </div>

    
  );
}

export default App;

