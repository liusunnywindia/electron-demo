import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
const [data,setData] = useState([])
const [weather,setWeather] = useState({text:'',windDir:''})

useEffect(()=>{
    axios({url:'https://devapi.qweather.com/v7/weather/now?location=101010100&key=fe8bd0c7f6db40b4be6e9d7266bfd3b4',method:'get'}).then(res=>{
        console.log(res.data.now)
        setWeather(res.data.now)
    })
},[])
    return (
        <div>今天天气:{weather?.text} {weather?.windDir} </div>
    )
}

export default App;