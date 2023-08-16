import React,{useEffect} from 'react'
const paintPanel = () =>{

    const handleClick = () =>{
        // const win = new BrowserWindow();
        // win.loadURL('https://github.com');
        window.electron.ipcRenderer.send("screenshot:capture",{})
        window.electron.ipcRenderer.on("screenshot:capture",(e,imageData)=>{
            document.getElementById("placeholder").src = imageData
        })
    }

    return (
        <> 
            <img width="100%" id="placeholder"/>
            <button id="btn" onClick={handleClick}>截屏</button>
        </>
    )
}

export default paintPanel