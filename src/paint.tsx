// @ts-nocheck
import React,{useEffect, useState} from 'react'
const paintPanel = () =>{
    const [urlList,setUrlList] = useState([])

    const handleClick = () =>{
        // const win = new BrowserWindow();
        // win.loadURL('https://github.com');
        window.electron.ipcRenderer.send("screenshot:capture",{})
        window.electron.ipcRenderer.on("screenshot:capture",(e,imageData)=>{
            setUrlList(imageData)
            // document.getElementById("placeholder").src = imageData
        })
    }

    return (
        <>   
        {
            urlList.map((item,index)=><img width="100%" id="placeholder" src={item} key={index}/>)
        }
            
            <button id="btn" onClick={handleClick}>截屏</button>
        </>
    )
}

export default paintPanel