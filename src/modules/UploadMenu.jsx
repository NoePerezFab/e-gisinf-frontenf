import React, { useRef, useState,useEffect } from 'react'

import { MDBIcon, MDBRow, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBBtn,MDBInput,MDBCol } from 'mdbreact'


const UploadMenu =  ({actualPath,viewFile,setfiles,modal,setmodal,seteditingFile,seteditFile,editFile,editingFile,setfolders,
                        setmetadatosBusqueda,fileMenu,showFileMenu,actualFile}) => {
    const tipoCliente = useRef(null)
    const documento = useRef(null)
    const fecha = useRef(null)
    const [noDocumento, setnoDocumento] = useState('')
    const [noCliente, setnoCliente] = useState('')
    const [fechaDocumento, setfechaDocumento] = useState('')
    const [modalFolder, setmodalFolder] = useState(false)
    const [nombreCarpeta, setnombreCarpeta] = useState('')
    const [fatherPath, setfatherPath] = useState('')
    const [alert, setalert] = useState(false)
    const [metadatos, setmetadatos] = useState([])
    const [currentKey, setcurrentKey] = useState(1)
    const [actualFolder, setactualFolder] = useState({metadatos: []})
    const [folderName,setfolderName] = useState("Selecciona un documento")
    const handleMetadatos = (e)=>{
        setmetadatos(e.metadatos)
        
    }  
    const changeFileName = ()=>{
        documento.current !== null ?
        setfolderName(documento.current.files[0].name) :
        setfolderName("Selecciona un documento")
    }
    const deleteFile = async(e)=>{
        const auth = JSON.parse(localStorage.getItem("user")).token
        let deleteRequest = {}
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user)
        console.log(user.name)
        console.log(user.password);
        deleteRequest.user = user
        deleteRequest.file ={id : e.currentTarget.dataset.index}
        //deleteRequest.fecha = new Date().toLocaleDateString().split("/").reverse().join("-")
        const splited = new Date().toLocaleDateString().split("/").reverse()
        const converted = splited.map(num => convertDate(num))
        console.log("----------------------");
        console.log(splited);
        console.log(converted);
        deleteRequest.fecha = converted.join("-")
        
        const url = "../e-gisinfback/deletefile"
        const requestJson = JSON.stringify(deleteRequest)
        console.log(requestJson);
         await fetch(url,{ method: 'POST',
        headers : { 'Content-Type': 'application/json',
        Authorization : auth },
            mode: 'cors', // <---
            cache: 'default',
            body : requestJson
         })
        
    } 
    
    const convertDate = (num) =>{
        if(parseInt(num) < 10){
            return "0"+num
        }
        return num
    }

    const downloadFile = (e) =>{
        window.open(e.currentTarget.dataset.index,'_blank')
    }
        
    
    const getFiles = async (pathName) =>{
        const auth = JSON.parse(localStorage.getItem("user")).token
        const requestJson = JSON.stringify({path: pathName})
        const url = "../e-gisinfback/getfiles"
        const response = await fetch(url,{ method: 'POST',
        headers : { 'Content-Type': 'application/json',
        Authorization : auth },
            mode: 'no-cors', // <---
            cache: 'default',
            body : requestJson
         })
         
         let responseJson = await response.json()
          const requestMapped = responseJson.map((document) =>{
              let serverPath = document.serverPath+"/"+document.documentSystemName
              serverPath = serverPath.replaceAll(' ','%20')
          document.documentDate = new Date(document.documentDate).toLocaleDateString()
            document.documentName =<div onClick={showFileMenu}>{document.documentName} </div>
            document.documentType = <div>{document.documentType}</div>
            document.version = <div>{document.version}</div>
            document.documentDate = <div>{document.documentDate}</div>
           
          /*document.ver = [
           

           <button key={document.path} data-index={serverPath} type="button" onClick={viewFile} className="btn btn-outline-danger btn-sm m-0 waves-effect">Ver</button>]
       document.editar = [
           <button type="button" key={document.id} data-index={document.id} onClick={fileEdit} className="btn btn-outline-primary btn-sm m-0 waves-effect  ">Editar</button>]
       document.eliminar = [
           <button type="button" key={document.path} data-index={serverPath} className="btn btn-outline-primary btn-sm m-0 waves-effect  ">Eliminar</button>]*/
           document.username = document.uploadBy.username 
           document.clickEvent = handleMetadatos
           return document
          }
          
         )
         setfiles(requestMapped)
         
    }
    const fileEdit = async(e)=>{
        const auth = JSON.parse(localStorage.getItem("user")).token
        e.preventDefault()
        setmodal(true)
        seteditingFile(true)
        let file = {}
        file.id = e.currentTarget.dataset.index
        const requestJson = JSON.stringify(file)
        const url = "../e-gisinfback/getfile"
        const response = await fetch(url,{ method: 'POST',
        headers : { 'Content-Type': 'application/json' ,
        Authorization : auth},
            mode: 'cors', // <---
            cache: 'default',
            body : requestJson
         })
         let responseJson = await response.json()
         let dateSplited = new Date(responseJson.documentDate).toLocaleDateString().split("/").reverse().map((number) =>{
            if(number.length === 1){
                number = "0"+number
            }
            return(number)
        })
        responseJson.documentDate = dateSplited.join("-")
         seteditFile(responseJson)
         
       
    }
    const upfile = async (jsonObject) =>{
        //////////////////////////////////////////////////
        //Apikey OCR : c63789a2ab88957


        /////////////////////////////////////////////////
        const auth = JSON.parse(localStorage.getItem("user")).token
        const url = "../e-gisinfback/upfile"
        const user = JSON.parse(localStorage.getItem("user"))
        const request = {user : user, file : JSON.parse(jsonObject)}
        const jsonRequest = JSON.stringify(request)
        console.log(jsonRequest);
            const response = await fetch(url,{ method: 'POST',
            headers : { 'Content-Type': 'application/json',
            Authorization : auth },
                mode: 'cors', // <---
                cache: 'default',
                body : jsonRequest
             })
             
             let responseJson = await response.json()
             console.log(responseJson);
             if(responseJson.status === 200){
                 return false
             }
             return true
    }
    const updateFile = async (jsonObject) =>{
        const auth = JSON.parse(localStorage.getItem("user")).token
        const url = "../e-gisinfback/updatefile"
        const user = JSON.parse(localStorage.getItem("user"))
        const request = {user : user, file : JSON.parse(jsonObject)}
        const jsonRequest = JSON.stringify(request)
        console.log(jsonRequest);
            const response = await fetch(url,{ method: 'POST',
            headers : { 'Content-Type': 'application/json',
            Authorization : auth },
                mode: 'cors', // <---
                cache: 'default',
                body : jsonRequest
             })
             
             let responseJson = await response.json()
             console.log(responseJson);
             
    }
    const savefile = async (path,file) => {
        const auth = JSON.parse(localStorage.getItem("user")).token
        const formData = new FormData();
    
            formData.append('file', file);
            formData.append('path',path)
            const response = await fetch(
                '../e-gisinfback/savefile',
                {
                    method: 'POST',
                    body: formData,
                    headers : {
                        Authorization : auth}
                }
            )
            console.log(response);
            getFiles(actualPath)	
    }
    const getDocumentText = async(file) =>{
        const formData = new FormData();
        const url = 'https://api.ocr.space/parse/image'
        formData.append('apikey','c63789a2ab88957')
        formData.append('file',file)
        formData.append('language','spa')
        const response = await fetch(
            url,
            {
                method: 'POST',
                body: formData,

            }
        )
         const responseJson = await response.json()
         const array = responseJson.ParsedResults.map(({ParsedText})=>{
             return ParsedText
         })
        return array
    }
    const prueba = () =>{
        getDocumentText(documento.current.files[0])
    }
    const handleUpdate = async(e) =>{
        e.preventDefault()
        let obj = {}
        obj.documentDate = editFile.Date//new Date().toLocaleDateString().split("/").reverse().join("-")
        obj.documentName = editFile.documentName
        obj.version = editFile.version + 1
        obj.documentText = "Documento subido desde front usando la rest api"
        obj.path = actualPath
        obj.documentSystemName = documento.current.files[0].name
        const jsonObject = JSON.stringify(obj)
       await updateFile(jsonObject)
        await savefile(obj.path,documento.current.files[0])
        
        toggle()
    }
    const handleUpload = async(e) => {
        e.preventDefault()
        let obj = {}
        let date = new Date().toLocaleDateString().split("/").reverse()
        const dateconvert = date.map((digito)=>{
            if(digito.length === 1){
                digito = "0"+digito
            }
            return(digito)
        })
        //Para agregar ocr
       /* const textoArray = await getDocumentText(documento.current.files[0])
       
        const texto = textoArray.join(' ')*/
        const texto = ""
        obj.documentDate = dateconvert.join("-")
        obj.documentName = noDocumento
        const name  = documento.current.files[0].name
        obj.documentType= name.split(".")[name.split().length]
        obj.documentText = texto
        obj.path = actualPath
        obj.version = 1
        obj.documentSystemName = name
        obj.metadatos = metadatos
        console.log(metadatos);
        console.log(obj);
        const jsonObject = JSON.stringify(obj)
        const flag = await upfile(jsonObject)
        console.log(flag);
        if(flag){
           await savefile(obj.path,documento.current.files[0])
            toggle()
            getFiles(actualPath)
            //window.location.reload(false)
        }else{
            setalert(true)
        }
        
    }
    const toggle = () => {
        const value = modal
        setmodal(!value)
        seteditingFile(false)
        setalert(false)
        setmetadatos([])
    }
  
        
    const handleNoDocumento = (e) =>{
        setnoDocumento(e)
        
    }
    const handleNoCliente = (e) =>{
        setnoCliente(e)
        
    }
    
    const handleEditClientNumber = (e)=>{
        setnoCliente(e)
        
    }
    const handleFecha = (e) =>{
        setfechaDocumento(e.currentTarget.value)
    }
    useEffect(() => {
        
        return () => {
            setnoCliente(editFile.clientNumber)
            setfechaDocumento(editFile.documentDate)
        }
    }, [editFile,editingFile])
    useEffect(() => {
        const getActualFolder = async()=>{
            const user = localStorage.getItem("user")
            const auth = JSON.parse(localStorage.getItem("user")).token
            if(actualPath.length > 0){
                const requestJson = JSON.stringify({path: actualPath})
            const url = "../e-gisinfback/getfolder"
            const response = await fetch(url,{ method: 'POST',
            headers : { 'Content-Type': 'application/json',
            Authorization : auth },
                mode: 'cors', // <---
                cache: 'default',
                body : requestJson
            })
            const folderJson = await response.json()
             setactualFolder(folderJson)
            if(folderJson.metadatos !== undefined && folderJson.metadatos !== null){
                setmetadatosBusqueda(folderJson.metadatos)
            }
             
            }
        }
 
            setfatherPath(actualPath)
            getActualFolder()

      
    }, [actualPath])
    const toggleAddFolder = (e)=>{
        const value = modalFolder
        setmodalFolder(!value)
        setmetadatos([])
        setcurrentKey(1)
    }
    const handleNombreCarpeta = (nombre)=>{
        setnombreCarpeta(nombre)
    }
    const getFodlers = async() =>{
        const auth = JSON.parse(localStorage.getItem("user")).token
        const user = JSON.stringify(JSON.parse(localStorage.getItem("user")))
        const url = "../e-gisinfback/index"
        const response = await fetch(url,{ headers : { 'Content-Type': 'application/json',
        Authorization : auth },
        method: 'POST',
        mode: 'cors', // <---
        cache: 'default',
        body : user
     }) 
        const json = await response.json()
        
        setfolders(json)
         
       
    }
    
    const handleAddFolder = async(e)=>{
        e.preventDefault()
        const auth = JSON.parse(localStorage.getItem("user")).token
        conevertirMetadatos()
        let folder = {}
        folder.fatherPath = actualPath
        folder.name = nombreCarpeta
        var meta
        metadatos.length > 0 ?
         meta = metadatos.map(({nombre,tipo,opciones})=>{
             if(tipo === "text"){
                return({nombre: nombre,tipo: tipo,opciones : opciones})     
             }
            return({nombre: nombre,tipo: tipo})
        }) :  meta = []

        folder.metadatos = meta
        const folderJson = JSON.stringify(folder)
        const url = "../e-gisinfback/addfolder"
        const response = await fetch(url,{ method: 'POST',
        headers : { 'Content-Type': 'application/json',
        Authorization : auth },
            mode: 'cors', // <---
            cache: 'default',
            body : folderJson
         })
        const responseJSON = await response.json()
        console.log(responseJSON)
        
        getFodlers()
        toggleAddFolder()
    }
    const addMetadato = async(e)=>{
        e.preventDefault()
        const metadato = {key: currentKey,nombre: '',tipo: ''}
        setmetadatos([...metadatos,metadato])
        setcurrentKey(currentKey+1)
        
    }
    const handleNombreMetadato =(e)=>{
         metadatos.map((meta)=>{
            
            if(meta.key === parseInt(e.target.id)){
                meta.nombre = e.target.value 
            }
            return(meta)
        })
    }
    const handletipo = (e)=>{
       const metaAux = metadatos.map((meta)=>{
            
            if(meta.key === parseInt(e.target.id)){
                meta.tipo = e.target.value 
                if(meta.tipo === "text") {
                meta.opciones = [{valor : "",key : e.target.id + "&1"}] 
                }else { 
                meta.opciones = []
                }
            }
            return(meta)
        })
        setmetadatos(metaAux)

    }
    const addOpcion = (e) =>{
        const metaAux = metadatos.map((meta)=>{
            
            if(meta.key === parseInt(e.target.id)){
                const lop = meta.opciones[meta.opciones.length -1]
                const key = parseInt(lop.key.split("&")[lop.key.split("&").length - 1])+1
                meta.opciones = [...meta.opciones, {valor : "",key : e.target.id + "&"+key }] 
                
            }
            return(meta)
        })
        setmetadatos(metaAux)
    }
    const handleMetadato = (e) =>{
        
        const flag = metadatos.find(({nombre})=> nombre === e.target.id)
        if(flag === undefined){
            setmetadatos([...metadatos,{nombre:e.target.id,valor:e.target.value}])
        }else{
            metadatos.map((meta) =>{
                if(meta.nombre === e.target.id){
                    meta.valor = e.target.value
                }
                return(meta)
            })
        }
    
    }

    const handleOpciones = (e) =>{
        
        const key = e.target.id.split("&")[0]
        const metaAux = metadatos.map((meta)=>{
            
            if(meta.key === parseInt(key)){
                if(meta.tipo === "text") {
                    meta.opciones.map(op =>{
                        if(op.key === e.target.id){
                            op.valor = e.target.value
                        }
                    })
                }
            }
            return(meta)
        })
        console.log(metaAux);
        setmetadatos(metaAux)
    }
    const conevertirMetadatos = () =>{
        const metadatosAux = metadatos.map(meta =>{
            if(meta.tipo === "text"){
               const opAux = meta.opciones.map(op =>{
                    return op.valor
                })
                meta.opciones = opAux
            }
            return meta
        })
        setmetadatos(metadatosAux)
    }

    return (
        <>
        <MDBRow className="w-100 mb-0 pb-0">
        <MDBCol size="8"><h5>{actualPath.split("/")[actualPath.split("/").length-1]}</h5></MDBCol>
            {JSON.parse(localStorage.getItem("user")).rol === 'ROLE_ADMIN' ? <MDBCol size="1"><MDBIcon  icon="folder-plus" onClick={toggleAddFolder}/></MDBCol> : <></>}
            {actualPath !== undefined & actualPath.length > 0 ?  JSON.parse(localStorage.getItem("user")).rol !== 'ROLE_ADMIN' ?
            JSON.parse(localStorage.getItem("user")).permisos.find(permiso => permiso.path === actualPath).carga ?
            <MDBCol size="1"><MDBIcon icon="upload"  onClick={toggle} /></MDBCol> : <></>  : <MDBCol size="1"><MDBIcon icon="upload"  onClick={toggle} /></MDBCol> :<></>}
            {actualPath !== undefined & actualPath.length > 0 ?  JSON.parse(localStorage.getItem("user")).rol !== 'ROLE_ADMIN' ?
            JSON.parse(localStorage.getItem("user")).permisos.find(permiso => permiso.path === actualPath).edicion ?
            <MDBCol size="1"><MDBIcon icon="pen"  /></MDBCol>: <></>  : <MDBCol size="1"><MDBIcon icon="pen"  /></MDBCol> : <></>}
             <MDBRow className="ml-2">
                 
             {fileMenu ? JSON.parse(localStorage.getItem("user")).rol === "ROLE_ADMIN"  ? <>
            <button  className="btn  btn-sm p-2 " data-index={actualFile.path}  onClick={viewFile} style={{background:"#0D7E61",color:"white"}}>Ver</button>
            <button className="btn  btn-sm p-2  " data-index={actualFile.id} onClick={fileEdit} style={{background:"#0D529B ",color:"white"}}>Editar</button>
            <button className="btn btn-danger btn-sm  p-2 " data-index={actualFile.id} onClick={deleteFile}>Eliminar</button></>
                : <></> : <></>}
               
            {actualPath !== undefined & actualPath.length > 0 ? JSON.parse(localStorage.getItem("user")).rol !== "ROLE_ADMIN"  ? fileMenu ? JSON.parse(localStorage.getItem("user")).permisos.find(permiso => permiso.path === actualPath).ver ? 
                <button  className="btn  btn-sm p-2 " data-index={actualFile.path} onClick={viewFile}style={{background:"#0D7E61",color:"white"}}>Ver</button> :
                <></> : <></> : <></>:<></>
            } 

            { actualPath !== undefined & actualPath.length > 0 ?  JSON.parse(localStorage.getItem("user")).rol !== 'ROLE_ADMIN' ? fileMenu ?
            JSON.parse(localStorage.getItem("user")).permisos.find(permiso => permiso.path === actualPath).edicion ?
            <button className="btn  btn-sm p-2  " data-index={actualFile.id} onClick={fileEdit} style={{background:"#0D529B ",color:"white"}}>Editar</button>: <></>  : <></> : <></> : <></>
             }



            </MDBRow> 
        
        </MDBRow > 
       

        {!editingFile ? <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Subir archivo</MDBModalHeader>
        <form class="was-validated" onSubmit={handleUpload}>
        <MDBModalBody>
        
    
        <MDBInput label="Nombre del documento" icon="file-alt" group type="text" validate error="wrong" required
            success="right" getValue={handleNoDocumento} />
            
        <div class="custom-file">
            <input type="file" class="custom-file-input" id="validatedCustomFile" required lang="es" ref={documento} onInput={changeFileName}/>
            <label class="custom-file-label" for="validatedCustomFile">{folderName}</label>    
        </div>
        {actualFolder.metadatos !== undefined && actualFolder.metadatos !== null ? actualFolder.metadatos.map(({nombre,tipo,opciones})=>{
            
            return(
                tipo === "text" ?
                <select className="custom-select mt-2" id={nombre} onInput={handleMetadato}  required>
                    <option value="">{nombre}</option>
                    {opciones.map(op =>{
                        return(
                            <option value={op}>{op}</option>
                        )
                    })}
                </select> :
                tipo !== 'date' ?
                <MDBInput label={nombre} icon="file-alt" group type={tipo} validate error="wrong" required
            success="right"  id={nombre} onInput={handleMetadato} />:<div class="form-group">
           <label>{nombre}</label> <input  class="form-control"label={nombre} group type={tipo} validate error="wrong" required
            success="right"  id={nombre} onInput={handleMetadato} /></div>
            )
        }):<p></p>}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>Cerrar</MDBBtn>
          <MDBBtn color="primary" type="submit">Guardar</MDBBtn>
        </MDBModalFooter>
        </form>
        {alert ? <div class="alert alert-danger" role="alert">Ya existe un archivo con ese nombre 
</div>: <p></p>}
      </MDBModal> :
      
      <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Editar archivo</MDBModalHeader>
        <form class="was-validated" onSubmit={handleUpdate}>
        <MDBModalBody>
        
    
        <MDBInput label="Nombre del documento" icon="file-alt" group type="text" validate error="wrong" required
            success="right"  value={editFile.documentName} readonly/>
            
        <div class="custom-file">
            <input type="file" class="custom-file-input" id="validatedCustomFile"  lang="es" ref={documento} onInput={changeFileName} required/>
            <label class="custom-file-label" for="validatedCustomFile" >{folderName}</label>    
        </div>
        
        
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>Cerrar</MDBBtn>
          <MDBBtn color="primary" type="submit">Guardar</MDBBtn>
          
        </MDBModalFooter>
        </form>
      </MDBModal>}

      <MDBModal isOpen={modalFolder} toggle={toggleAddFolder}>
        <MDBModalHeader toggle={toggleAddFolder}>Agregar Carpeta</MDBModalHeader>
        <form class="was-validated" onSubmit={handleAddFolder}>
        <MDBModalBody>
        
    
        <MDBInput label="Nombre de la carpeta" icon="folder" group type="text" validate error="wrong" required
            success="right" getValue={handleNombreCarpeta} />
           
        {metadatos.length > 0 ? metadatos.map(({key,opciones})=>{
            return(
                <>
                <MDBInput label="Nombre" icon="file-signature" group type="text" validate error="wrong" required
            success="right" onInput={handleNombreMetadato}  key={key} id={key} />
            <div>
        <select className="custom-select" id={key} onInput={handletipo} required>
          <option value="">Tipo</option>
          <option value="number">Numero</option>
          <option value="text">Texto</option>
          <option value="date">Fecha</option>
        </select>
        {opciones !== undefined && opciones.length > 0 ?
        <MDBBtn color="indigo" onClick={addOpcion} id={key}><i class="fas fa-plus"></i></MDBBtn> :<></>   }
        {opciones !== undefined ? opciones.map(op => {
            return(
                <>
            <MDBInput label="Valor" icon="file-signature" group type="text" validate error="wrong" required
            success="right" id={op.key} onInput={handleOpciones}   />
            
            </> )
        }) : <></>}
      </div>
            </>
            )
        }):<p></p>}

           <MDBBtn color="indigo" onClick={addMetadato}>Agregar metadato</MDBBtn>    
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleAddFolder}>Cerrar</MDBBtn>
          <MDBBtn color="primary" type="submit">Agregar</MDBBtn>
          
        </MDBModalFooter>
        </form>
      </MDBModal>


        
        </>
    )
}

export default UploadMenu
