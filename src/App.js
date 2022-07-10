import React,{useState, useEffect} from 'react';
import{BrowserRouter as Router,Routes,Route}from'react-router-dom';
import './App.css';
import Nav from './Nav';
import HomePage from './main'
import About from './About';
import Contact from './Contact';
import LogIn from './login';
import CityPage from './CityPage'
import Settings from  './settings'
import {onAuthStateChanged,signOut,} from 'firebase/auth'
import {auth} from './firebase-config'
import Loading from './animations/Loading';

const URL = process.env.REACT_APP_BE_URL
const URLDEV = process.env.REACT_APP_BE_DEV_URL

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
  const [showSettings, setShowSettings] =useState(false)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(()=>{
      onAuthStateChanged(auth,(currentUser)=>{
          console.log( currentUser)
          if( auth.currentUser!= null){
            let uid = auth.currentUser.uid
            getCitiesData(uid)
          }
          else{
            getDefaultCitiesData()
          }
      }
    )
    async function getCitiesData(uid){
      var res = await fetch( URL+'/data/weather/foruser?uid='+ uid)
      var data = await res.json()
      var cities = await fetch( URL+'/data/users/user/?uid='+uid)
      var citiesData = await cities.json()
      var extCitiesData = []
      citiesData[0].cityPref.forEach(e => {
          extCitiesData.push(e.cityRef)
      });
      setCities(extCitiesData)  
      setCitiesWeatherData(data)
      console.log(`Loaded ${auth.currentUser.email} Cities`);
    }
    async function getDefaultCitiesData(){
      var res = await fetch( URL+'/data/weather/foruser?uid=1')
      var data = await res.json()
      var cities = await fetch( URL+'/data/users/user/?uid=1')
      var citiesData = await cities.json()
      var extCitiesData = []
      citiesData[0].cityPref.forEach(e => {
          extCitiesData.push(e.cityRef)
      });
      setCities(extCitiesData)  
      setCitiesWeatherData(data)
        setIsLoading(false)

      console.log("Loaded default Cities");
    }

  },[auth])

  useEffect(()=>{
    async function getCityData(c){
      var req = c.zip === null ?c.name:c.zip
      try{
        var res = await fetch( URL+'/data/weather/'+ req )
        var rData = await res.json()
        setCitiesWeatherData(prev => ([...prev,rData]))
        var reqStatus ="good" ;
        return [reqStatus,rData];
      }
      catch{
        var reqStatus = "bad";
        return reqStatus;
      }
    }
    function setCity(c,d){
      if(tempCities[c].zip == null || tempCities[c].name === null ){
       
        const disCity = {
          "name": d.region, 
          "info": 222, 
          "zip": d.region.split(",")[1].replace(/[^0-9]/g,''), 
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
          setCity(c,gcd[1]);
        } 
      }
    }
    forEach();
    console.log(tempCities)
    console.log(citiesWeatherData)
  },[tempCities])

  useEffect (()=>{
    if(showSettings== true){document.body.classList.add('oH');}
    else{document.body.classList.remove('oH')}
  },[showSettings])

  function handelActive (e){
      if(e === "about"){
        setActive({
          home: false,
          about: true,
          contact: false,
          city:false
        })
      }
      else if(e === "settings"){
        setShowSettings(!showSettings)
        return
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
            <div className='maWtSe'>
              <Routes>
                <Route path="/*"  element={isLoading ?<Loading/>: <HomePage cities={cities} citiesWeatherData={citiesWeatherData} searchMe={searchMe} badRequest={badRequest}/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path='/c/:id' element={<CityPage ActivateMe={handelActive}/>} /> 
              </Routes>
              { showSettings ?<Settings/>:""}
            </div>
      </Router>
    </>
  );
}

export default App;
