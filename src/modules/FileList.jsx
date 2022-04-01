import { MDBDataTableV5,MDBContainer,MDBCard,MDBCardBody,MDBCardHeader,MDBCardTitle,MDBCardText,MDBInput,MDBRow, MDBIcon } from 'mdbreact'

import React, { useEffect,useState } from 'react'
import UploadMenu from './UploadMenu'


const FileList = ({files,actualPath,viewFile,setfiles,modal,setmodal,seteditingFile,seteditFile,editFile,editingFile,
  setfolders,folders,setmetadatos,metadatos,setmetadatosBusqueda,metadatosBusqueda, ocrText,showFileMenu,fileMenu,actualFile}) => {
 const [metadatoSelected, setmetadatoSelected] = useState("")
 const [busqueda, setbusqueda] = useState("")
 let colums = [
  {
    label: 'Nombre',
    field: 'documentName',
    sort: 'asc',
    width: 150,
    
  },
  {
    label: 'Tipo',
    field: 'documentType',
    sort: 'asc',
    width: 270
  },
  {
    label: 'Version',
    field: 'version',
    sort: 'asc',
    width: 200
  },
  {
    label: 'Fecha',
    field: 'documentDate',
    sort: 'asc',
    width: 100
  },
  {
    label: 'Publicado por',
    field: 'username',
    sort: 'asc',
    width: 150
  }/*,

  {
    label: 'Ver',
    field: 'ver',
    sort: 'asc',
    width: 10
  }*/
]
  const [data, setdata] = useState({colums:colums,rows : []})
    const handleFilter = (e)=>{
      e.preventDefault()
        const expresion = new RegExp(`${busqueda}.*`, "i")
        const dataShow = files.filter(({metadatos}) => {
          if(metadatos !== null & metadatos !== undefined & metadatos.length > 0){
            const metas = metadatos.map(({nombre,valor}) =>{
              if(nombre === metadatoSelected){
                return(expresion.test(valor))
              }
              return(false)
            })
            return(metas.includes(true))
          }
          return(false)
        })
        console.log(dataShow);
        setdata({columns : colums,rows : dataShow})
    }
    const handleMetadatoSelected = (e) =>{
      setmetadatoSelected(e.target.value)
    }
    const handleBusqueda = (e) =>{
      setbusqueda(e)

    }
    useEffect(() => {
       /* if(JSON.parse(localStorage.getItem("user")).rol === 'ROLE_ADMIN'){
          colums = [...colums,{
            label: 'Editar',
            field: 'editar',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Eliminar',
            field: 'eliminar',
            sort: 'asc',
            width: 150
          }]
        }else if(actualPath !== undefined & actualPath.length > 0){
            
            if(JSON.parse(localStorage.getItem("user")).permisos.find(permiso => permiso.path === actualPath).edicion){
              colums = [...colums,{
                label: 'Editar',
                field: 'editar',
                sort: 'asc',
                width: 150
              }]
            }
        }*/
        setdata({columns: colums ,
          rows: files
        })
        
    }, [files])
  
    return (
      
        <div class="col-4">
          <div className="d-flex w-100">
         
         
         
          <UploadMenu actualPath={actualPath} viewFile={viewFile} setfiles={setfiles}modal={modal} setmodal={setmodal}
          seteditingFile={seteditingFile} seteditFile={seteditFile} editFile={editFile} editingFile={editingFile} 
          setfolders={setfolders} folders={folders} setmetadatosShow={setmetadatos} metadatosShow={metadatos}
          setmetadatosBusqueda={setmetadatosBusqueda} fileMenu={fileMenu} showFileMenu={showFileMenu}  actualFile={actualFile}/>
          </div>
           <MDBDataTableV5
            width = "100%"
            responsive
            entriesOptions={[5, 10, 15]}
             entries={5}
             searching={false}
             sortable={false}
            data = {data}
            id="table-documents"/>
<MDBContainer className="w-100">
  <MDBRow>

<div class="d-flex flex-row">
        <select className="custom-select md-form form-group mr-3 p-2"  required onInput={handleMetadatoSelected}>
        <option value="">Selecciona un metadato</option>
        {metadatosBusqueda.map(({nombre}) =>{
          return(
            <option value={nombre}>{nombre}</option>
          )
        })}
        
        </select>
        <MDBInput label="Buscar por metadatos" className="p-2" group type="text" getValue={handleBusqueda}/>
        <MDBIcon icon="search" className="p-2" size="2x" onClick={handleFilter}/>
        </div>
        </MDBRow>
  </MDBContainer>
<MDBContainer className="w-100">
  <MDBCard style={{ width: "22rem", marginTop: "1rem" }} className="w-100">
    <MDBCardHeader color="primary-color">Metadatos</MDBCardHeader>
    <MDBCardBody>
      <MDBCardTitle></MDBCardTitle>
      <MDBCardText>
      {metadatos.map(({nombre,valor})=>{
              return(
                <p><b>{nombre}</b>: {valor}</p>
              )
            })}
      </MDBCardText>
      
    </MDBCardBody>
  </MDBCard>
</MDBContainer>
<MDBContainer className="w-100">
  <MDBCard style={{ width: "22rem", marginTop: "1rem" }} className="w-100">
    <MDBCardHeader color="primary-color">OCR</MDBCardHeader>
    <MDBCardBody>
      <MDBCardTitle></MDBCardTitle>
      <MDBCardText>
            {ocrText}
      </MDBCardText>
      
    </MDBCardBody>
  </MDBCard>
</MDBContainer>

            
        </div>
    )
}

export default FileList
