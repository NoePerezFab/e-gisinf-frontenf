import React, { useEffect, useState } from 'react'
import { MDBDataTableV5 } from 'mdbreact';
import MenuAdmin from './MenuAdmin';

const PermiosUsuarios = () => {
    const [data, setdata] = useState({})
    const [usuariosR, setusuariosR] = useState([])
    
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
             setusuariosR(responseJson)
             const datos = responseJson.map(dato => {
                
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
                        let permisoCopy = permiso
                        permisoCopy.ver = permisoCopy.ver ? 
                        <select>
                            <option value="true" selected>Si</option>
                            <option value="false">No</option>
                        </select>:
                        <select>
                        <option value="true" >Si</option>
                        <option value="false" selected>No</option>
                    </select>
                    permisoCopy.carga = permisoCopy.carga ? 
                    <select>
                        <option value="true" selected>Si</option>
                        <option value="false">No</option>
                    </select>:
                    <select>
                    <option value="true" >Si</option>
                    <option value="false" selected>No</option>
                </select>
                permisoCopy.descarga = permisoCopy.descarga ? 
                <select>
                    <option value="true" selected>Si</option>
                    <option value="false">No</option>
                </select>:
                <select>
                <option value="true" >Si</option>
                <option value="false" selected>No</option>
            </select>
            permisoCopy.edicion = permisoCopy.edicion ? 
            <select>
                <option value="true" selected>Si</option>
                <option value="false">No</option>
            </select>:
            <select>
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
                  boton : <button type="button" class="btn btn-primary" key={dato.username} onClick={(e) => handleAxtualizar(e,dato.username)}>Actualizar</button>
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
            
           
          
        }
        getUsers()
      
    }, [])
    const handleAxtualizar = (e,key) => {
        console.log(usuariosR);
       console.log(data);
    }

    return (
        <>
        <MenuAdmin/>
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
      <p>Ok</p>
      </>
    )
}

export default PermiosUsuarios
