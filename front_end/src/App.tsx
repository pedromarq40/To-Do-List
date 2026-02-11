import { useState, useEffect} from "react"
import { FormEvent } from 'react'
import { ChangeEvent} from 'react'

interface Tarefa{
    tarefa: string;
    concluida : boolean;
    id? : number;
}
function App() {

  const [lista, setLista] = useState<Tarefa[]>([])
  const [tarefa, setTarefa] = useState<string>('')
  //const [statusLista, setStatusLista] = useState<number>(1)
  
  useEffect(() => {get()}, [])

  async function get(){

    try{
      const resposta = await fetch('http://127.0.0.1:8000/api/')
      let lista_usuarios = await resposta.json()

      console.table(lista_usuarios)
      setLista(lista_usuarios)

    }catch(error){
      console.log('Erro ao buscar tarefas')
    }
  }

  async function post( event : FormEvent){

    event.preventDefault()

    const nova_tarefa : Tarefa = {
          tarefa: tarefa,
          concluida : false
        }

    try{

      const resposta = await fetch('http://127.0.0.1:8000/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(nova_tarefa)
      })

      if (resposta.ok){
        setTarefa('')
        get()

      } else {
        const erro = await resposta.json()
        console.log("Erro ao salvar", erro)
      }

    }catch(error){
      console.log('Erro de conexão com o servidor')
    }

  }

  async function _delete(id : number){

      try{

        let resposta = await fetch(`http://127.0.0.1:8000/api/${id}/`, {method : 'DELETE'})
        
        if (resposta.ok){
          get()
        } else {
          console.log('Erro', resposta)
        }

      }catch(error){
        console.log('Erro ao tentar deletar', error)
      }

  }

  async function _patch( tarefa : Tarefa){

    try{

      const resposta = await fetch(`http://127.0.0.1:8000/api/${tarefa.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({ concluida : !tarefa.concluida})
      })

      if(resposta.ok){
        get()
      }else{
        console.log('Erro ao mudar status')
      }

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

      const resposta = await fetch(`http://127.0.0.1:8000/api/${tarefa.id}/`, {
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(nova_tarefa),
        method: 'PUT'
      })

      if (resposta.ok){
        get()
      } else {
        console.log('Erro no put')
      }

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
            <button onClick={() => tarefa.id && _delete(tarefa.id)}>Terminar Tarefa</button>
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
