import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBInput } from 'mdbreact'
import React, { useRef, useState } from 'react'
import MenuInicial from './MenuInicial'

const Login = ({setloged}) => {

    const [usernameState, setusernameState] = useState('')
    const [passState, setpassState] = useState('')

    const handleUsername = (e) => {
      setusernameState(e)
    }

    const handlePass = (e) => {
      setpassState(e)
    }

    const login = async(e) =>{
        e.preventDefault()
        
        let user = {}
        user.username = usernameState
        user.password = passState
        const userJson = JSON.stringify(user)
        console.log(user);
        const url = "../e-gisinfback/login"
        const response = await fetch(url,{ method: 'POST',
        headers : { 'Content-Type': 'application/json' },
        
            body : userJson
         })
        const json =  await response.json()
         console.log(json);
        if(json.token !== null & json.token !== undefined){
          localStorage.setItem("user",JSON.stringify(json))
          setloged(true)
        } else{
          setloged(false)
        }
        
        
         

    }
    return (
  <>   
  <MenuInicial/>
<MDBContainer className='h-100'>
  <MDBRow className='h-100 d-flex justify-content-center align-items-center ml-5'>
    <MDBCol md="4" className='mb-5'>
      <form onSubmit={login}>
        <p className="h5 text-center mb-4">Ingresar</p>
        <div className="grey-text">
          <MDBInput label="Usuario" icon="envelope" getValue={handleUsername} group type="text" validate error="wrong"
            success="right" />
          <MDBInput label="Contraseña" icon="lock" getValue={handlePass} group type="password" validate />
        </div>
        <div className="text-center">
          <MDBBtn type="submit">Ingresar</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
</>

    )
}

export default Login
