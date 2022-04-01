

import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import MainApp from "./modules/MainApp";
import RegistroUsuario from "./modules/RegistroUsuario";
import { useState,useEffect } from 'react'
import PermiosUsuarios from "./modules/PermiosUsuarios";
import PermisosUsuarios from "./modules/PermisosUsuarios";
function App() {
  const [loged, setloged] = useState(false)
  const isloged = async() =>{
    if(JSON.parse(localStorage.getItem("user")) !== undefined & JSON.parse(localStorage.getItem("user")) !== null){
    const auth = JSON.parse(localStorage.getItem("user")).token
    const url = "../fileManager-0.0.1-SNAPSHOT/loged"
    const response = await fetch(url,{ 
      headers:{Authorization : auth},
      method: 'GET',
      mode: 'cors', // <---
      cache: 'default'
    }) 
    const json = await response.json()
    if(json.status === 200){
      setloged(true)
    }else{
      setloged(false)
      localStorage.removeItem("user")
    }
  }else{
    setloged(false)
  } 
  
  }
  useEffect(() => {
    isloged()
    return () => {
      console.log(loged);
    }
  }, [])
  return (
   <Router>
      <Routes>
        <Route  path="/" element={<MainApp loged={loged} setloged={setloged}/>}/>
        <Route  path="/registrar" element={<RegistroUsuario/>}/>
        <Route path="/permisos" element = {<PermisosUsuarios/>}/>

      </Routes>

      

   </Router>

  );
}

export default App;
