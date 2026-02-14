import { useState, useEffect} from "react"
import { FormEvent } from 'react'
import { ChangeEvent} from 'react'
import axios from 'axios'

interface Tarefa{
    tarefa: string;
    concluida : boolean;
    id? : number;
}
function App() {

  const [lista, setLista] = useState<Tarefa[]>([])
  const [tarefa, setTarefa] = useState<string>('')
  //const [statusLista, setStatusLista] = useState<number>(1)
  const url = 'http://127.0.0.1:8000/api/'
  
  useEffect(() => {get()}, [])

  async function get(){

    try{
      const response = await axios.get(url) //fetch(url)
      //qualquer coisa errada levanta erro

      //console.log(response.data)
      //let lista_usuarios = await response.json()

      console.table(response.data)
      setLista(response.data)

    }catch(error){
      console.log('Erro ao buscar tarefas')
      console.log(error)
    }
  }

  async function post( event : FormEvent){

    event.preventDefault()

    const nova_tarefa : Tarefa = {
          tarefa: tarefa,
          concluida : false
        }

    try{

      const resposta = await axios.post(url, nova_tarefa)/*fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(nova_tarefa)
      })*/

      //A FUNÇÂO JÁ CONVERTE PARA JSON
      
      setTarefa('')
      get()

    }catch(error){
      console.log('Erro de conexão com o servidor')
    }

  }

  async function _delete(id : number){

      try{

        let resposta = await axios.delete(url + `${id}/`) //fetch(url + `${id}/`, {method : 'DELETE'})
        //qualquer erro o axios levanta erro
        console.table(resposta.data)
        get()
        
        //console.log('Erro', resposta)
        
      }catch(error){
        console.log('Erro ao tentar deletar', error)
      }

  }

  async function _patch( tarefa : Tarefa){

    try{

      const novos_dados = { concluida : !tarefa.concluida}

      const resposta = await axios.patch(url + `${tarefa.id}/`, novos_dados)/*fetch(url + `${tarefa.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({ concluida : !tarefa.concluida})
      })*/

      get()

    }catch(error){
      console.log('Erro de conexão', error)
    }
  }

  async function _put( tarefa : Tarefa ){

    try{

      const novoNome = prompt('Digite sua nova Tarefa');
      if (!novoNome) return;

      const nova_tarefa : Tarefa = {
        concluida : tarefa.concluida,
        tarefa : novoNome,
        id : tarefa.id
      }

      const resposta = await axios.put(url + `${tarefa.id}/`, nova_tarefa)/*fetch(url + `{tarefa.id}/`, {
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(nova_tarefa),
        method: 'PUT'
      })*/
     
      get()
  

    }catch( error ){
      console.log('Erro de conexão', error)
    }
  }

  function mudancaForm(event : ChangeEvent<HTMLInputElement> ){
    setTarefa(event.target.value)
  }

  return (
    <>
      <div>
        <form onSubmit={post}>
          <label >Insira sua Tarefa:</label>
          <input type="text"
          value={tarefa}
          onChange={mudancaForm}>
          </input>
          <button type="submit">Adicionar Tarefa</button>
        </form>
      </div>
      <h2>Lista de tarefas:</h2>
      <ul>
        {lista.map((tarefa) => {

          const style = {color : tarefa.concluida ? 'green' : 'red'}

          return (
          <li key={tarefa.id} style={style}>id: {tarefa.id} tarefa: {tarefa.tarefa}
            <button onClick={() => tarefa.id && _delete(tarefa.id)}>Excluir Tarefa</button>
            <button onClick={() => tarefa.id && _patch(tarefa)}>{tarefa.concluida? 'Reativar':'Terminar'}</button>
            <button onClick={() => _put(tarefa)}>Editar Tarefa</button>
          </li>
          )
        })}
      </ul>
    </>
  )
}

export default App
