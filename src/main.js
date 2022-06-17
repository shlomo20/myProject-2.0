import React from 'react'
import { Link} from 'react-router-dom'
import './main.css'
import MainCard from './mainCard'
import merge from "lodash/merge"


 function Main(props){
  var arr3 = [];

  for (var i=0; i<props.cities.length; i++) {
      arr3.push(merge(props.cities[i], props.citiesWeatherData[i]));
      
  }

  //console.log(arr3);

  const weatherDataEl = props.cities.map(el => {
    if(el.currentConditions  !== undefined){
      const { humidity,precip,comment,iconURL } = el.currentConditions;
      const { f } = el.currentConditions.temp;
      const { mile } = el.currentConditions.wind;
      return(
        <Link key={el.zip} to={`/c/${el.name}`} state={el}><MainCard key={el.zip} cityName={el.name} temp={f} icon={iconURL} humidity={humidity} speed={mile} description={comment}/></Link> 
       )
    }
  })  

  return(
    <div>  
     {weatherDataEl}
    </div>
  );
}

export default Main;