import React,{useState, useEffect} from 'react';
import{BrowserRouter as Router,Routes, Switch,Route}from'react-router-dom';
import './App.css';
import Nav from './Nav';
import HomePage from './main'
import About from './About';
import Contact from './Contact';
import MainCard from './mainCard';
import CityPage from './CityPage'

function App() { 

  const [isActive,setActive] = useState({
    home: true,
    about: false,
    contact: false,
    city: false
  })
  const [cities, setCities] = useState([])
  const [tempCities, setTempCities] = useState([])
  const [citiesWeatherData, setCitiesWeatherData] = useState([])
  const [badRequest, setBadRequest] = useState(false)
  useEffect(()=>{
    async function getCities(){
      var res = await fetch('./data.json')
      var data = await res.json()
      setTempCities(data.Cities)
      console.log("Cities changed");
    }
    getCities();
  },[]);

  useEffect(()=>{
    async function getCityData(c){
      var req = c.zip === null ?c.name:c.zip
      var res = await fetch('https://websrapjs.vercel.app/dev/data/weather/'+ req )
      var data = await res.json()
      setCitiesWeatherData(prev => ([...prev,data]))
      console.log(data);
      var reqStatus = res.status=== 200? "good":"bad"
      console.log("reqStatus", reqStatus);
      return reqStatus;
    }
    async function forEach(){
      for( let c = 0; c < tempCities.length; c++){
        var city =tempCities[c]
        var gcd = await getCityData(city);
        console.log("gcd", await gcd);
        if(gcd === "bad"){
          setBadRequest(true)
        }
        else{
          setBadRequest(false)
          if(tempCities[c].zip == null || tempCities[c].name === null ){
            const cwd =citiesWeatherData[citiesWeatherData.length -1]
            const disCity = {
              "name": cwd.region.split(",")[0], 
              "info": 222, 
              "zip": cwd.region.split(",")[1].replace(/[^0-9]/g,''), 
              "country": "us"}
            setCities(prev => ([...prev,disCity]))  
          }
          else{
            setCities(prev => ([...prev,tempCities[c]]))  
          }

          if(c === tempCities.length - 1){
            setTempCities([])
          }  
        } 
      }
    }
    forEach();
    console.log(tempCities)
    console.log(citiesWeatherData)
  },[tempCities])

  function handelActive (e){
      if(e === "about"){
        setActive({
          home: false,
          about: true,
          contact: false,
          city:false
        })
      }
      else if(e === "contact"){
        setActive({
          home: false,
          about: false,
          contact: true,
          city: false
        })
      }
      else if(e != "home" && e != "" && e != " " && e != null){setActive({
        home: false,
        about: false,
        contact: false,
        city: true
      })}
      else(
        setActive({
          home: true,
          about: false,
          contact: false,
          city: false
        })
      )
  }
  function searchMe(c){
    function onlyNumbers(str) {
      return /^[0-9.,]+$/.test(str);
    }
    if(onlyNumbers(c)){
      setTempCities([{ "name": null, "info": 222, "zip": c, "country": "us"}])
    }
    else{
      setTempCities([{ "name": c, "info": 222, "zip": null, "country": "us"}])
    }
    
  }
  return (
    <>
      <Router>
        <Nav homeIsActive={isActive.home} 
            aboutIsActive={isActive.about} 
            contactIsActive={isActive.contact} 
            cityIsActive={isActive.city}
            ActivateMe={handelActive}/>
        <Routes>
          <Route path="/*"  element={<HomePage cities={cities} citiesWeatherData={citiesWeatherData} searchMe={searchMe} badRequest={badRequest}/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path='/c/:id' element={<CityPage ActivateMe={handelActive}/>} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
