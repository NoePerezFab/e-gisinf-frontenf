import React, { useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact';
import MenuAdmin from './MenuAdmin';
const PermisosUsuarios = () => {

        const [data, setdata] = useState({})
        const [users,setusers] = useState([])
        const showdata = async(e) =>{
            const auth = JSON.parse(localStorage.getItem("user")).token
            const user = users.filter(user => user.username === e.target.id)[0]
            const bodyJson = JSON.stringify(user)
            console.log(user);
            console.log(bodyJson);
            const url = "../e-gisinfback/updatepermisos"
            const response = await fetch(url,{ method: 'POST',
            headers : { 'Content-Type': 'application/json',Authorization : auth },
            mode: 'cors', // <---
            cache: 'default',
            body: bodyJson
         })
         const responseJson = await response.json()
            console.log(responseJson);
            window.location.reload(false)
        }
        const changeVer = (e) =>{
            const username = e.target.id.split('.')[0]
            const path = e.target.id.split('.')[1]
            const usersNew = users.map(user =>{
                if(user.username === username){
                   const permisos =  user.permisos.map(permiso =>{
                       if(permiso.path === path){
                           e.target.value === 'true' ? permiso.ver = true : permiso.ver = false
                       }
                       return permiso
                   })
                   user.permisos = permisos
                }
                return(user)
            })
            setusers(usersNew)

        }
        const changeSubir = (e) =>{
            const username = e.target.id.split('.')[0]
            const path = e.target.id.split('.')[1]
            const usersNew = users.map(user =>{
                if(user.username === username){
                   const permisos =  user.permisos.map(permiso =>{
                       if(permiso.path === path){
                           e.target.value === 'true' ? permiso.carga = true : permiso.carga = false
                       }
                       return permiso
                   })
                   user.permisos = permisos
                }
                return(user)
            })
            setusers(usersNew)
        }
        const changeDescarga = (e) =>{
            const username = e.target.id.split('.')[0]
            const path = e.target.id.split('.')[1]
            const usersNew = users.map(user =>{
                if(user.username === username){
                   const permisos =  user.permisos.map(permiso =>{
                       if(permiso.path === path){
                           e.target.value === 'true' ? permiso.descarga = true : permiso.descarga = false
                       }
                       return permiso
                   })
                   user.permisos = permisos
                }
                return(user)
            })
            setusers(usersNew)
        }
        const changeEdicion = (e) =>{
            const username = e.target.id.split('.')[0]
            const path = e.target.id.split('.')[1]
            const usersNew = users.map(user =>{
                if(user.username === username){
                   const permisos =  user.permisos.map(permiso =>{
                       if(permiso.path === path){
                           e.target.value === 'true' ? permiso.edicion = true : permiso.edicion = false
                       }
                       return permiso
                   })
                   user.permisos = permisos
                }
                return(user)
            })
            setusers(usersNew)
        }
        useEffect(() => {
            const getUsers = async() =>{
                const auth = JSON.parse(localStorage.getItem("user")).token
                const url = "../e-gisinfback/getusers"
                const response = await fetch(url,{ method: 'GET',
                headers : { Authorization : auth },
                mode: 'cors', // <---
                cache: 'default'
             })
             const responseJson = await response.json()

             setusers([...responseJson])

            
           
            }



            getUsers()
        }, [])
       
        useEffect(() => {
            const usersCopy = [...users]
            const datos = usersCopy.map(dato =>{
                const permisosTable = {
                    columns : [{
                        label: 'Carpeta',
                        field: 'path',
                        sort: 'asc'
                    },{
                        label : 'Ver',
                        field: 'ver',
                        sort : 'asc'
                    },{
                        label : 'Subir',
                        field : 'carga',
                        sort : 'asc'
                    },
                    {
                        label : 'Descarga',
                        field : 'descarga',
                        sort : 'asc'
                    },
                    {
                        label : 'Edicion',
                        field : 'edicion',
                        sort : 'asc'
                    }],
                    rows : dato.permisos.map(permiso => {
                        let permisoCopy = {...permiso}
                        permisoCopy.ver = permisoCopy.ver ? 
                        <select id={dato.username+'.'+permiso.path} onInput={changeVer}>
                            <option value="true" selected>Si</option>
                            <option value="false">No</option>
                        </select>:
                        <select id={dato.username+'.'+permiso.path} onInput={changeVer}>
                        <option  value="true">Si</option>
                        <option value="false" selected>No</option>
                    </select>
                    permisoCopy.carga = permisoCopy.carga ? 
                    <select id={dato.username+'.'+permiso.path} onInput={changeSubir}>
                        <option value="true" selected>Si</option>
                        <option value="false">No</option>
                    </select >:
                    <select id={dato.username+'.'+permiso.path} onInput={changeSubir}>
                    <option value="true" >Si</option>
                    <option value="false" selected>No</option>
                </select>
                permisoCopy.descarga = permisoCopy.descarga ? 
                <select id={dato.username+'.'+permiso.path} onInput={changeDescarga}>
                    <option value="true" selected>Si</option>
                    <option value="false">No</option>
                </select>:
                <select id={dato.username+'.'+permiso.path} onInput={changeDescarga}>
                <option value="true" >Si</option>
                <option value="false" selected>No</option>
            </select>
            permisoCopy.edicion = permisoCopy.edicion ? 
            <select id={dato.username+'.'+permiso.path} onInput={changeEdicion}>
                <option value="true" selected>Si</option>
                <option value="false">No</option>
            </select>:
            <select id={dato.username+'.'+permiso.path} onInput={changeEdicion}>
            <option value="true" >Si</option>
            <option value="false" selected>No</option>
        </select>
            
            
                        return(permisoCopy)
                    })   
            }
            const returnDato = {username: dato.username,
                permisos: <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={
                 permisosTable
                }
                pagingTop
                searchTop
                searchBottom={false}
              />,
              boton : <button type="button" class="btn btn-primary" key={dato.username}  id={dato.username}onClick={showdata}>Actualizar</button>
            }
            return(returnDato)

            
         })
         
         setdata({
            columns : [{
                label: 'Nombre de usuario',
                field: 'username',
                sort: 'asc',
                width: 270
              },
            {
                label : 'Permisos',
                field : 'permisos',
                sort : 'asc'
            },
        {
            label : 'Actualizar',
            field : 'boton',
            sort: 'asc'
        }],
            rows: datos

        })
    
        }, [users])
      

    return (
        <>
        <MenuAdmin/>
        <div class="p-1">
        <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={data}
        pagingTop
        searchTop
        searchBottom={false}
       
      />
      </div>

      </>
    )
}

export default PermisosUsuarios
