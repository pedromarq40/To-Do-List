import Tarefas from './pages/Tarefas.tsx'
import Login from  './pages/Login.tsx'
import { Routes, Route } from 'react-router-dom'
 
function App() {
  return(
  <>
  <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/Tarefas' element={<Tarefas/>}></Route>
  </Routes>
  </>)
}

export default App
