import React from 'react'
import Explorer from "./Explorer";
import FileViewer from "./FileViewer";
import Header from "./Header";
import FileList from "./FileList";
import { useState,useEffect, useMemo } from 'react'
import Login from "./Login";
import MenuAdmin from './MenuAdmin';
const MainApp = ({loged,setloged}) => {
    const [folders, setfolders] = useState(undefined)
  const [files, setfiles] = useState([])
  const [actualPath, setactualPath] = useState('')
  const [showFile, setshowFile] = useState(false)
  const [showedFile, setshowedFile] = useState("")
  
  const [modal, setmodal] = useState(false)
  const [editingFile, seteditingFile] = useState(false)
  const [editFile, seteditFile] = useState({})
  const [metadatos, setmetadatos] = useState([])
  const [metadatosBusqueda, setmetadatosBusqueda] = useState([])
  const [ocrText, setocrText] = useState('')
  const [fileMenu, setfileMenu] = useState(false)
  const [actualFile, setactualFile] = useState(undefined)
  const showFileMenu = (e,path,id) => {
    limpiarTabla()
    setactualFile({id : id, path : path})
    setshowFile(false)
    setfileMenu(true)
    let x = document.getElementById("table-documents").getElementsByTagName("tr")
    console.log(e.currentTarget.id);
    console.log(x);
    
      x[e.currentTarget.id].style.backgroundColor = "#0D529B"
      x[e.currentTarget.id].style.color = "white"  
      x = x[e.currentTarget.id].getElementsByTagName("div")
      for(let i=0;i<x.length;i++){
        x[i].style.backgroundColor = "#0D529B" 
        x[i].style.color = "white"  
      }
    
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
  const hideFileMenu = () => {
    setfileMenu(false)
  }
  useEffect(() => {
        
        
    const getFiles = async() =>{
      const auth = JSON.parse(localStorage.getItem("user")).token
      const user = JSON.stringify(JSON.parse(localStorage.getItem("user")))

        const url = "../e-gisinfback/index"
        console.log(user);
        const response = await fetch(url,{ 
          headers:{Authorization : auth,
            'Content-Type': 'application/json'},
          
          method: 'POST',
          mode: 'cors', // <---
          cache: 'default',
          body : user
     }) 
        const json = await response.json()
        setfolders(json)
        console.log(json);
    }
    
    if(loged){
      
      getFiles()
    }
    
},[loged])

/*const hideFile = () => {
  setshowFile(false)
}*/
const viewFile = (e) => {
  
  setshowedFile(e.currentTarget.dataset.index)
  setshowFile(true)
}
const hideFile = () => {
  setshowFile(false)

}

    const explorer = useMemo(() => <Explorer folders={folders} viewFile={viewFile} setactualPath={setactualPath} setfiles={setfiles} setmodal={setmodal} 
    seteditingFile={seteditingFile} seteditFile={seteditFile} setmetadatos={setmetadatos} setocrText={setocrText} setshowfile={setshowFile} actualPath={actualPath}
    showFileMenu={showFileMenu} hideFileMenu={hideFileMenu} hideFile={hideFile}/>,[folders])

    return (
        loged ?
    <>
    {
        JSON.parse(localStorage.getItem("user")).rol === "ROLE_ADMIN" ?
        <MenuAdmin/> : <Header></Header>
    }
    
    
    <main class="container-fluid h-100 mt-2 d-inline-block mt-5 pt-5 " >
      <div class="row justify-content-lg-start h-100">
      
        {explorer}
        
        <FileList files={files} actualPath={actualPath} viewFile={viewFile} setfiles={setfiles} modal={modal} setmodal={setmodal}
         seteditingFile={seteditingFile} seteditFile={seteditFile} editFile={editFile} editingFile={editingFile}
         setmetadatos={setmetadatos} metadatos={metadatos} setfolders={setfolders} setmetadatosBusqueda={setmetadatosBusqueda}
         metadatosBusqueda={metadatosBusqueda} ocrText={ocrText} showFileMenu={showFileMenu}  fileMenu={fileMenu} actualFile={actualFile}/>
        {//<FileViewer file = showedFile show = showFile actualPath=actualPath/>
        }
      </div>
    </main>
    </> :
    <Login setloged={setloged}/>
    )
}

export default MainApp
