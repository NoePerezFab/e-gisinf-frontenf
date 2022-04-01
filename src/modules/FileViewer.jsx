import React from 'react'

const FileViewer = ({file,show,actualPath}) => {
    return (
        <div class="col" >
            {show ? <embed type='application/pdf'
    src={JSON.parse(localStorage.getItem("user")).rol !== 'ROLE_ADMIN' ? 
    JSON.parse(localStorage.getItem("user")).permisos.find(permiso => permiso.path === actualPath).descarga ?
    file : file+'#toolbar=0' : file}
   height="100%"
   width="100%"
   class="h-100" >
</embed>: <p></p>}
        </div>
    )
    
}

export default FileViewer
