import React from 'react'
import {
  Link,useNavigate
}from "react-router-dom";
import gisnetLogo from './gisnetLogo.png'

const MenuAdmin = () => {
  const navigate = useNavigate();
  const cerrarSesion = (e) => {
    e.preventDefault()
    localStorage.clear()
    navigate('/')
    window.location.reload(false)
}

    return (
        <header >
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top ">
       
                
            
  <div class="collapse navbar-collapse d-flex flex-row align-items-end justify-content-space-between" id="navbarText">
  <a class="navbar-brand" href="#">
                <img src={gisnetLogo} alt="" width="50" height="50" class="d-inline-block align-text-top mr-1"/>
                    
                </a>
                <h4 class="   " style={{color:"#ffffff",fontSize:"30px"}}>e-GISinf</h4>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item ">
        <a class="nav-link" href="#">Home</a>
      </li>
      <li class="nav-item">
       <Link to="/registrar" className="nav-link">Registrar Usuario</Link>
      </li>
      <li class="nav-item">
      <Link to="/permisos" className="nav-link">Permisos</Link>
      </li>
      
    
      <li class="nav-item">
       <a className="nav-link text-end" onClick={cerrarSesion}>Cerrar sesion</a>
      </li>
      </ul>

  </div>
</nav>
    </header>
    )
}

export default MenuAdmin
