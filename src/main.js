import React from 'react'
import { Link} from 'react-router-dom'
import './main.css'
import MainCard from './mainCard'
import merge from "lodash/merge"
import Search from './components/search'


 function Main(props){
 
  const [searchData, setSearchData] = React.useState({
      search:"",
  })
  const [error, setError] = React.useState(false)
  React.useEffect(()=>{
    if(props.badRequest=== true){
      setError(true)
    }

  },[props.badRequest])
  
  // var arr3 = [];
  // for (var i=0; i<props.cities.length; i++) {
  //     arr3.push(merge(props.cities[i], props.citiesWeatherData[i]));
  // }

  //console.log(arr3);
  console.log("props Cities: " + JSON.stringify(props.cities));
  const weatherDataEl = props.cities.map(el => {
    if(el.currentConditions  !== undefined){
      const { humidity,precip,comment,iconURL } = el.currentConditions;
      const { f } = el.currentConditions.temp;
      const { mile } = el.currentConditions.wind;
      return(
        <Link key={el.geonameId} to={`/c/${el.name}`} state={el}><MainCard key={el.geonameId} info={el.info} cityName={el.label} temp={f} icon={iconURL} humidity={humidity} speed={mile} description={comment}/></Link> 
       )
    }
  })  

  function submitSearch (value){
    function a (){ props.searchMe(value)};
     a();
    console.log("hit submitSearch" + "  " + JSON.stringify(value.value));
  }

  return(
    <div className='main'>  
    {/* <div className="search">
      <form className='form' onSubmit={submitSearch}>
      <input type="text" className="search-bar" name="search"  value={searchData.search} placeholder="Search" onChange={handelSearchData} />
            <button className="button"  type="submit" ><i className="fa fa-search" aria-hidden="true"></i>
            </button>
      </form>
      {error?<div className='error'>We are sorry! but we currently only support search by zipcode, 
        we are working on adding search by city, please change your search 
        to a zipcode or double check your zipcode has  5 digits </div>:""}       
    </div> */}
    <div className="searchMain">
      <Search submitSearch={submitSearch}/>
    </div>
    <div className='mainContent'>
      {weatherDataEl}
    </div>

    </div>
  );
}

export default Main;