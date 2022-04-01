import React from 'react'
import gisnetLogo from './gisnetLogo.png'
const header = () => {

    const cerrarSesion = (e) => {
        e.preventDefault()
        localStorage.clear()
        window.location.reload(false)
    }
    return (
        <header >
            <nav class="navbar navbar-dark bg-primary fixed-top ">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                <img src={gisnetLogo} alt="" width="50" height="50" class="d-inline-block align-text-top mr-1"/>
                   
                </a>
                <h4 class="  m-0 " style={{color:"#ffffff",fontSize:"30px"}}> e-GISdoc</h4>
                <ul class="navbar-nav ml-auto ">
      <li class="nav-item ">
       <a className="nav-link" onClick={cerrarSesion}>Cerrar sesion</a>
      </li>
    </ul>



            </div>
      </nav>
        </header>
    )
}

export default header
