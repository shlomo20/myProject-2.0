import React ,{useEffect}from 'react'
import { useParams, useLocation} from 'react-router-dom'
import './CityPage.css'

export default function CityPage(props)
{  
    const location = useLocation()
    var ls =location.state;
    
    useEffect(() => {props.ActivateMe(ls.name); }, []);

    var forecast = ls.next_days.map(el => {    
        const {day, comment, iconURL} = el;
        var max = el.max_temp.f;
        var min = el.min_temp.f;
        return(
            <div key={day+max} className='dayI'>
                <h3>{day}</h3>
                <p>{comment}</p>
                <p>Max: {max}</p>
                <p>Min: {min}</p>
                <img  src={iconURL} alt="" className="icon"/>
            </div>
        )
    })
    return(
        <div className='cityF'>   
            {forecast}
        </div>
    )
}