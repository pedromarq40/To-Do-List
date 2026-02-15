import { useState, useEffect ,FormEvent, ChangeEvent} from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

interface Tarefa{
    tarefa: string;
    concluida : boolean;
    id? : number;
}

function Tarefa() {

  const [lista, setLista] = useState<Tarefa[]>([])
  const [tarefa, setTarefa] = useState<string>('')
  const url = 'http://127.0.0.1:8000/api/tarefa/'
  const navigate = useNavigate()
  
  function tratar_erro(error){
    if(error.response && error.response.status === 401){
      alert('Sessão expirou!')
      localStorage.removeItem('token')
      navigate('/')
    }
  }

  function buscar_token(){
    const token = localStorage.getItem('token')
      if (!token){
        alert('Não fez login!')
        navigate('/')
        return
      } 
      const config = {
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      }
      return config
  }

  useEffect(() => {get()}, [])

  async function get(){

    try{
      const config = buscar_token()
      if (!config ) return
    
      const response = await axios.get(url, config)

      //qualquer coisa errada levanta erro


      console.table(response.data)
      setLista(response.data)

    }catch(error){

      tratar_erro(error)
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

      const config = buscar_token()
      if (!config ) return

      const resposta = await axios.post(url, nova_tarefa, config)/*fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(nova_tarefa)
      })*/

      //A FUNÇÂO JÁ CONVERTE PARA JSON
      
      setTarefa('')
      get()

    }catch(error){

      tratar_erro(error)
      console.log('Erro de conexão com o servidor')
    }

  }

  async function _delete(id : number){

      try{

        const config = buscar_token()
        if (!config ) return

        let resposta = await axios.delete(url + `${id}/`, config) //fetch(url + `${id}/`, {method : 'DELETE'})
        //qualquer erro o axios levanta erro
        console.table(resposta.data)
        get()
        
        //console.log('Erro', resposta)
        
      }catch(error){

        tratar_erro(error)
        console.log('Erro ao tentar deletar', error)
      }

  }

  async function _patch( tarefa : Tarefa){

    try{

      const novos_dados = { concluida : !tarefa.concluida}
      const config = buscar_token()
      if (!config ) return

      const resposta = await axios.patch(url + `${tarefa.id}/`, novos_dados, config)/*fetch(url + `${tarefa.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({ concluida : !tarefa.concluida})
      })*/

      get()

    }catch(error){

      tratar_erro(error)
      console.log('Erro de conexão', error)
    }
  }

  async function _put( tarefa : Tarefa ){

    try{

      const novoNome = prompt('Digite sua nova Tarefa');
      if (!novoNome) return;

      const config = buscar_token()
      if (!config ) return

      const nova_tarefa : Tarefa = {
        concluida : tarefa.concluida,
        tarefa : novoNome,
        id : tarefa.id
      }

      const resposta = await axios.put(url + `${tarefa.id}/`, nova_tarefa, config)/*fetch(url + `{tarefa.id}/`, {
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(nova_tarefa),
        method: 'PUT'
      })*/
     
      get()
  

    }catch( error ){
      tratar_erro(error)
      console.log('Erro de conexão', error)
    }
  }

  function mudancaForm(event : ChangeEvent<HTMLInputElement> ){
    setTarefa(event.target.value)
  }

  function logout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={logout} style={{ backgroundColor: 'red', color: 'white' }}>Sair</button>
      </div>
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

export default Tarefa