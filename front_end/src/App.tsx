import { useState, useEffect, FormEvent } from "react"

function App() {

  const [lista, setLista] = useState<string[]>([])
  const [tarefa, setTarefa] = useState<string>('')
  //const [statusLista, setStatusLista] = useState<number>(1)
  
  useEffect(() => {get()}, [])

  async function get(){

    try{
      const response = await fetch('http://127.0.0.1:8000/back/api/')
      const lista_usuarios = await response.json()

      setLista(lista_usuarios)
    }catch(error){
      console.log('Erro ao buscar tarefas')
    }
  }

  async function post( event : FormEvent<HTMLInputElement>){

    event.preventDefault()

    try{

      const response = await fetch('http://127.0.0.1:8000/back/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(tarefa)
      })

      if (response.ok){
        setTarefa('')
        get()
      } else {
        const erro = await response.json()
        console.log("Erro ao salvar", erro)
      }

    }catch(error){
      console.log('Erro de conexão com o servidor')
    }

  }

  return (
    <>
      <div>
        <form onSubmit={post}>
          <label >Insira sua Tarefa:</label>
          <input type="text"></input>
          <button type="submit">Adicionar Tarefa</button>
        </form>
      </div>
      <h2>Lista de tarefas:</h2>
      <ul>
        {lista.map((tarefa) => {

          const style = {color : tarefa.concluida ? 'green' : 'red'}

          return (<li key={tarefa.key} color={style}>{tarefa.tarefa}</li>)
        })}
      </ul>
    </>
  )
}

export default App
