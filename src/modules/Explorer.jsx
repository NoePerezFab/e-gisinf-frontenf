import React, {  } from 'react'

import {
    MDBContainer,
    MDBCol,
    MDBTreeview,
    MDBTreeviewList,
    MDBTreeviewItem
  } from 'mdbreact';
const Explorer = ({folders,viewFile,setactualPath,setfiles,setmodal,seteditingFile,seteditFile,setmetadatos,setocrText,setshowfile,actualPath,showFileMenu,hideFileMenu,hideFile}) => {
    const toggle =async (e) =>{
        const auth = JSON.parse(localStorage.getItem("user")).token
        e.preventDefault()
        let file = {}
        file.id = e.currentTarget.dataset.index
        const requestJson = JSON.stringify(file)
        const url = "../e-gisinfback/getfile"
        const response = await fetch(url,{
        method: 'POST',
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
         setmodal(true)
        seteditingFile(true)
    }
    const deleteFile = async(e)=>{
        const auth = JSON.parse(localStorage.getItem("user")).token
        let deleteRequest = {}
        const user = JSON.parse(localStorage.getItem("user"))
        console.log(user)
        console.log(user.name)
        deleteRequest.user = user
        deleteRequest.file ={id : e.currentTarget.dataset.index}
        //deleteRequest.fecha = new Date().toLocaleDateString().split("/").reverse().join("-")
        const splited = new Date().toLocaleDateString().split("/").reverse()
        const converted = splited.map(num => convertDate(num))
        deleteRequest.fecha = converted.join("-")
        
        const url = "../e-gisinfbackT/deletefile"
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
    const handleMetadatos = (e)=>{
       setmetadatos(e.metadatos)
        setocrText(e.documentText)
        
    }  
    const downloadFile = (e) =>{
        window.open(e.currentTarget.dataset.index,'_blank')
    }
    const limpiarTabla = () =>{
        let x = document.getElementById("table-documents").getElementsByTagName("tr")
        for(let i=0;i<x.length;i++){
          x[i].style.backgroundColor = "white"  
          x[i].style.color = "black"  
        }
    
         x = document.getElementById("table-documents").getElementsByTagName("div")
        console.log(x);
        for(let i=0;i<x.length;i++){
          x[i].style.backgroundColor = "white"
          x[i].style.color = "black"  
        }
      }
    const getFiles = async (pathName,e) =>{
        limpiarTabla()
        const auth = JSON.parse(localStorage.getItem("user")).token
        e.preventDefault()
        e.stopPropagation()
        await setactualPath(pathName)
        const requestJson = JSON.stringify({path: pathName})
        const url = "../e-gisinfback/getfiles"
        const response = await fetch(url,{ method: 'POST',
        headers : { 'Content-Type': 'application/json' ,
        Authorization : auth},
            mode: 'cors', // <---
            cache: 'default',
            body : requestJson
         })
         
         let responseJson = await response.json()     
           let index = 1
            const requestMapped = responseJson.map((document) =>{
                let serverPath = document.serverPath+"/"+document.documentSystemName
                serverPath = serverPath.replaceAll(' ','%20')
            document.documentDate = new Date(document.documentDate).toLocaleDateString()
            
            if(JSON.parse(localStorage.getItem("user")).rol === 'ROLE_ADMIN'){
                document.documentName =<div className='w-100 h-100' id={index}onClick={(e)=>showFileMenu(e,serverPath,document.id)}>
                {document.documentName}  
    
                </div>
            document.documentType = <div className='w-100 h-100' >{document.documentType}
            
            </div>
            document.version = <div className='w-100 h-100' >{document.version}
            
            </div>
              }else{
                document.documentName =<div id={index} className='w-100 h-100' >
                {document.documentName}  
                </div>
                 
            
                    if(JSON.parse(localStorage.getItem("user")).permisos.find(permiso => permiso.path === pathName).edicion){
                        document.documentType = <div className='w-100 h-100' >{document.documentType}
                        
                        </div>
                    }
                
              }





            
            document.documentDate = <div className='w-100 h-100' >{document.documentDate}</div>
            
            /*document.ver = [
              <button key={document.path} data-index={serverPath} type="button" onClick={viewFile} className="btn  btn-sm p-2 " style={{background:"#0D7E61",color:"white"}}>Ver</button>]
          document.editar = [
              <button type="button" key={document.path} data-index={document.id} onClick={toggle} className="btn  btn-sm p-2  " style={{background:"#0D529B ",color:"white"}}>Editar</button>]
          document.eliminar = [
              <button type="button" key={document.path} data-index={document.id} onClick={deleteFile}className="btn btn-danger btn-sm  p-2 ">Eliminar</button>]*/
          document.username = <div className='w-100 h-100' >{document.uploadBy.username}</div>
          document.clickEvent = handleMetadatos
          index = index + 1
              return document
            }
            
           )
           
           hideFileMenu()
           hideFile()
           setfiles(requestMapped) 
           setshowfile(false)
           setocrText("")
           setmetadatos([])
           
           
    }

    const getTree = ({name,folderList,path})=>{
        if(folderList !== null & folderList !== undefined){
            if(folderList.length > 0){
                const isopen = actualPath.includes(path)
                return(
                <MDBTreeviewList  title={name} far open onClick={(e) => getFiles(path,e)} opened={isopen} >
                    {folderList.map((folderList) =>{
                        
                            if(folderList !== null & folderList !== undefined){
                               return (getTree(folderList))
                            }
                            return(<p></p>)
                        
                    })}
                </MDBTreeviewList>)
            }else{
                return(
                    <MDBTreeviewItem  title={name} onClick={(e) => getFiles(path,e)}/>
                )
            }
        }
        
        return(<MDBTreeviewItem  title={name} onClick={(e) => getFiles(path,e)}/>)
    }
    const makeList = (folder) =>{
       
        return (
            <>
            <MDBContainer header='Animated' className="w-100 p-0 m-0 h-100" >
            <MDBCol md="100%" className="w-100">
             <MDBTreeview
            theme='animated'
            header='Folders'
            className="w-100"
            
          >  
            {getTree(folder)}
            </MDBTreeview>
            </MDBCol>
            </MDBContainer>
            
            </>
        )
    }
    return (
        <div class="col-3 w-100">           
            {folders === undefined  ? "El servidor no responde" :
               makeList(folders)    
                }
           
        </div>
    )
}

export default Explorer
