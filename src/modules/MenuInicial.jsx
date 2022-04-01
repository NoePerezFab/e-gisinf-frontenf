import React from 'react'
import gisnetLogo from './gisnetLogo.png'
const MenuInicial = () => {
    return (
        <header >
            <nav class="navbar navbar-dark bg-primary fixed-top d-flex  ">
            <div class="container-fluid d-flex  align-items-end " style={{color:"#ffffff"}}>
                
                <img src={gisnetLogo} alt="" width="50" height="50" class="  "/>
                <h2 class="mr-auto  ml-2 " >e-GISinf</h2>
                
            </div>
            
      </nav>
        </header>
    )
}

export default MenuInicial
