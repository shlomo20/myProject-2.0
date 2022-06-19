import React ,{useEffect, useState}from 'react'
import { useParams, useLocation} from 'react-router-dom'
import './CityPage.css'
import ZmanimCard from './zmanimCard'

export default function CityPage(props)
{  

    const [zmanimData, setZmanimData] = useState([])

    const location = useLocation()
    var ls =location.state;
    

    useEffect(() => {props.ActivateMe(ls.name); }, []);

    useEffect(() => {
        async function getZmanimData(c){
            console.log(c);
            var res = await fetch('https://websrapjs.vercel.app/data/zmanim/'+c)
            var data = await res.json()
            setZmanimData(prev => ([...prev,data]))
        }
        getZmanimData(ls.zip);
    }, []);

    var forecast = ls.next_days.map(el => {    
        const {day, comment, iconURL} = el;
        var max = el.max_temp.f;
        var min = el.min_temp.f;
        return(
            <div key={day+max} className='dayI'>
                <h3>{day}</h3>
                <p className='com'>{comment}</p>
                <p>Max: {max}</p>
                <p>Min: {min}</p>
                <img  src={iconURL} alt="" className="icon"/>
            </div>
        )
    })
    var z = () => {
        if(zmanimData.length > 0){
        return(
            <ZmanimCard zmanimData={zmanimData[0]}/>
        )}
    }

    return(
        <section>
            <div className='box'>
                <div className='cityF'>   
                    {forecast}
                </div>
            </div>
            <div className='zmanimBox'>
                {z()}
            </div>
        </section>

        
    )
}