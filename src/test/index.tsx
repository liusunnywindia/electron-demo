import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
require("./index.less");
// import style from './index.less'

const App = () => {
    const [data, setData] = useState([])
    const [weather, setWeather] = useState({ text: '', windDir: '' })
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        axios({ url: 'https://devapi.qweather.com/v7/weather/now?location=101010100&key=fe8bd0c7f6db40b4be6e9d7266bfd3b4', method: 'get' }).then(res => {
            console.log(res.data.now)
            setWeather(res.data.now)
        })

    }, [])

    const handleChange = (e: any) => {
        console.log(e.target.files[0])
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (result) {
            console.log(result)
            let base64Data = result.target.result
            drawToCanvas(base64Data)
        }
    }

    const drawToCanvas = (imgData: any) => {
        let cvs: HTMLCanvasElement = document.querySelector('#photo');
        if (cvs?.getContext) {
            let ctx = cvs?.getContext('2d');
            let img = new Image;
            img.src = imgData;
            img.onload = function () {//必须onload之后再画
                ctx.drawImage(img, 0, 0, 300, 400);
            }

        }

    }

    const handleSave = () => {
        sessionStorage.setItem('name', '999')
    }

    const handleGet = () => {
        let value = sessionStorage.getItem('name')
        console.log('取数据', value)
    }


    const handlePasete = (e: any) => {
        const { clipboardData } = e;
        const { items } = clipboardData;
        const { length } = items;
        const arr = Array.from(items);
        let blob: any;
        if (length > 0) {
            arr.forEach((itm:any) => {
                if (itm.type.startsWith("image")) {
                    blob = itm.getAsFile();
                }
            });

            if (blob) {
                console.log(blob, 'blob')
                if (blob.size / 1024 / 1024 >= 10) {
                    console.log('图片大小不能超过10M哦')
                    return
                }
                const formData = new FormData();
                formData.append("file", blob);
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function (e:any) {
                    console.log(e,'e')
                    setImageUrl(e?.target?.result||'');
                };
            }
        }
    };

    return (
        <div>今天天气:{weather?.text} {weather?.windDir}
            <input type="file" onChange={handleChange} />
            <canvas id="photo" width={300} height={300}></canvas>
            <button onClick={handleSave}>存数据</button>
            <button onClick={handleGet}>取数据</button>
            <div className="pasetBox">
                <input className="pasetInput" onPaste={handlePasete} />
                {imageUrl ? (
                    <div className="pic">
                        <img
                            src={imageUrl}
                            alt="pic"
                            className="imgs"
                        />
                    </div>
                ) : (
                    <div className="pasetButton">
                        <div style={{ marginTop: 4 }}>截图/复制到粘贴</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;