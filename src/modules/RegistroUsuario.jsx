import React, { useState } from 'react'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBBtn
  } from 'mdbreact';
import MenuAdmin from './MenuAdmin';
const RegistroUsuario = () => {
    const [nombreUsuario, setNombreUsuario] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [pass, setPass] = useState('')
    const [tipo, setTipo] = useState('')
    const [alertUser, setalertUser] = useState(false)
    const [alertServidor,setalertServidor] = useState(false)
    const [alertuserOk,setalertuserOk] = useState(false)


    const registarUsuario = async(e) => {
      e.preventDefault()
      const usuario = {
        username : nombreUsuario,
        password : pass,
        name : nombre,
        lastname : apellido,
        rol : tipo
      }
      const auth = JSON.parse(localStorage.getItem("user")).token
      const userJson = JSON.stringify(usuario)
        const url = "../e-gisinfback/register"
        const response = await fetch(url,{ method: 'POST',
        headers : { 'Content-Type': 'application/json',
        Authorization : auth },
            mode: 'cors', // <---
            cache: 'default',
            body : userJson
         })
        const responseJSON = await response.json()
        if(responseJSON !== undefined & responseJSON !== null){
          if(responseJSON.username !== undefined & responseJSON.username !== null){
            //Alerta de comfirmacion de usuario regitrado
            setalertuserOk(true)
            
          }else{
            //Alerta de usuario ya existente
            setalertUser(true) 
          }
        }else{
          //error con el servidor
          setalertServidor(true) 
        }
        window.location.reload(false)
       
    }
    const handleNombreUsuario = (e) =>{
      setNombreUsuario(e)
    }
    const handleNombre= (e) =>{
      setNombre(e)
    }
    const handleApellido = (e) =>{
      setApellido(e)
    }
    const handlePass = (e) =>{
      setPass(e)
    }
    const handleTipo = (e) =>{
      setTipo(e.target.value)
    }
    return (

      
      JSON.parse(localStorage.getItem("user")) !== undefined & JSON.parse(localStorage.getItem("user")) !== null ?
      JSON.parse(localStorage.getItem("user")).rol === "ROLE_ADMIN" ?
      <>
      <MenuAdmin/>
        <MDBContainer className='h-100'>
  <MDBRow className='h-100 d-flex justify-content-center align-items-center'>
    <MDBCol md="6" className='mb-5'>
      <form onSubmit={registarUsuario}>
        <p className="h5 text-center mb-4">Registrar Usuario</p>
        <div className="grey-text">
          <MDBInput label="Nombre de usuario" icon="user" group type="text" validate error="wrong"
            success="right" required getValue={handleNombreUsuario}/>
          <MDBInput label="Nombre" icon="user" group type="text" validate error="wrong"
            success="right" required getValue={handleNombre}/>
          <MDBInput label="Apellido" icon="user" group type="text" validate error="wrong" success="right" required getValue={handleApellido}/>
          <MDBInput label="Contraseña" icon="lock" group type="password" validate error="wrong" success="right" required getValue={handlePass}/>
          <select name="tipoUsuario" className="custom-select"  required onInput={handleTipo}>
            <option value="">Tipo de usuario</option>
            <option value="ROLE_ADMIN" >Administrador</option>
            <option value="ROLE_USER">Usuario</option>
          </select>
        </div>
        <div className="text-center">
        
          <MDBBtn color="cyan" type="submit">
            Registrar
          </MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
{alertuserOk ? <div class="alert alert-success" role="alert">Usuario registrado con exito
</div>: <p></p>}
{alertUser ? <div class="alert alert-danger" role="alert">Ya existe un usuario registrado coon ese nombre de usuario
</div>: <p></p>}
{alertServidor ? <div class="alert alert-danger" role="alert">Error al conectar con el servidor
</div>: <p></p>}


  </>:<p></p>:
<p></p>
      
    )
}

export default RegistroUsuario
