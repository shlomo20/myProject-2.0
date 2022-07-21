import React from 'react'
import { useParams, useLocation} from 'react-router-dom'
import './main.css'

export default function Card(props)
{  
    const location = useLocation()
     const p = useParams()
    console.log("l: "+ location + " p: "+ p);

    return(
     <button className="card">
            {props.info && (<div className="new">NEW</div>)}
            <div className="weather ">
                <h2 className="city">Weather in {props.cityName}</h2>
                <h1 className="temp"> {props.temp}°f</h1>
                <div className="flex">
                    <img  src={props.icon} alt="" className="icon"/>
                    <div className="description">{props.description}</div>
                </div>
                <div className="humidity">Humidity: {props.humidity}%</div>
                <div className="wind">Wind speed: {props.speed}</div>
            </div>
    </button>
    )
}