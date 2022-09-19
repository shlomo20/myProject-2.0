import React ,{useEffect, useState, useRef}from 'react'
import { useParams, useLocation} from 'react-router-dom'
import './CityPage.css'
import ZmanimCard from './zmanimCard'

export default function CityPage(props)
{  
    let ref = useRef(null);

    //const [zmanimData, setZmanimData] = useState([])
    const [scrollEnd, setScrollEnd] = useState(false);
    const [scrollX, setScrollX] = useState(0);
    const location = useLocation(null)
    var ls =location.state;
    

    useEffect(() => {props.ActivateMe(ls.name); }, []);

    // useEffect(() => {
    //     async function getZmanimData(c){
    //         console.log(c);
    //         var res = await fetch('https://websrapjs.vercel.app/data/zmanim/'+c)
    //         var data = await res.json()
    //         setZmanimData(prev => ([...prev,data]))
    //     }
    //     getZmanimData(ls.zip);
    // }, []);

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
                <img  src={iconURL} alt="" className="iconI"/>
            </div>
        )
    })

    var scroll =(shift) => {
        ref.current.scrollLeft += shift;
        setScrollX(scrollX + shift);
    
        if (
          Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
          ref.current.offsetWidth
        ) {
          setScrollEnd(true);
        } else {
          setScrollEnd(false);
        }
    };    
    const scrollCheck = () => {
        setScrollX(ref.current.scrollLeft);
        if (
          Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <=
          ref.current.offsetWidth
        ) {
          setScrollEnd(true);
        } else {
          setScrollEnd(false);
        }
      };
    return(
        <section id="ba">
            <div className='box'>
                {scrollX !=0 && <div className='arrow' onClick={() => scroll(-50)}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </div >}
                <div className='cityF'ref={ref} onScroll={scrollCheck} >   
                    {forecast}
                </div>
                {!scrollEnd  && (<div className='arrow'  onClick={() => scroll(50)}>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </div >)}
            </div>
            <div className='zmanimBox'>
                <ZmanimCard cityData={ls}/>
            </div>
            <div class="map"><iframe className='ifm' id="gmap_canvas" src={ `https://maps.google.com/maps?q=${ls.lat},%20${ls.lng}.&t=&z=13&ie=UTF8&iwloc=&output=embed`}
             frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div>
            <div className='footer'>    
                <p>zmanim from :</p> <a src="https://github.com/hebcal/hebcal-es6#Zmanim">hebcal</a> <p></p>
            </div>
        </section>

        
    )
}