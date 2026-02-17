import { useState, FormEvent } from "react"
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"

function Login(){

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    const url = 'http://127.0.0.1:8000/token/'

    async function login( event : FormEvent){

        event.preventDefault()

        try{

            const response = await axios.post(url, {
                username: username,
                password: password
            })

            const token = response.data.access//pega na api caso não tenha erro
            localStorage.setItem('token', token)
            navigate('/tarefas')

        }catch(error){
            alert('Usuário ou senha incorretos')
            console.log(error)
        }

    }
    return(
    <>

    <div>
      <Link to='/Cadastro'>Não tem cadastro?</Link>
      <h1>Login</h1>
      <form onSubmit={login}>
        
        <input 
          placeholder="Usuário" 
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        
        <input 
          placeholder="Senha" 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        
        <button type="submit">Entrar</button>
      
      </form>
    </div>
    </>)

}

export default Login