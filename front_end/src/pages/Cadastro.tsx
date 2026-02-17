import { useState, FormEvent } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

interface Usuario{
    username: string,
    password: string
}

export default function Cadastro(){

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    async function cadastrar(e : FormEvent){

        e.preventDefault()

        const usuario : Usuario = {
            username: username,
            password: password
        }

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/usuarios/', usuario)
            console.log(response)
            navigate('/')
        }catch(error){
            console.log('Erro no post')
            console.log(error)
        }

    }

    return(
        <>
        <h1>Cadastro de Usuário</h1>
        <form onSubmit={cadastrar}>
            <label >Nome</label>
            <input
            value={username}
            onChange={(e) => setUsername(e.target.value)} />

            <label >Senha</label>
            <input
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

            <button type='submit'>Cadastrar</button>
        </form>
        </>
        
    )

}