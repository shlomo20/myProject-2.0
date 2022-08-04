import React,{useState, useEffect} from 'react';
import{BrowserRouter as Router,Routes,Route}from'react-router-dom';
import './App.css';
import Nav from './sheared/Nav';
import HomePage from './main'
import About from './sheared/About';
import Contact from './sheared/Contact';
import LogIn from './sheared/settings/login';
import CityPage from './CityPage'
import Settings from  './sheared/settings/settings'
import {onAuthStateChanged,signOut,} from 'firebase/auth'
import {auth} from './firebase-config'
import Loading from './animations/Loading';

const URL = process.env.REACT_APP_BE_URL
const devURL = process.env.REACT_APP_BE_DEV_URL

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
  const [settingHasChanges,setSettingsHasChanges] = useState(false)
  const [searchAmount, setSearchAmount] = useState(0)

  async function getCitiesData(uid){
    var res = await fetch( devURL +'/data/weather/foruser?uid='+ uid)
    var data = await res.json()
    var cities = await fetch( URL +'/data/users/user/?uid='+uid)
    var citiesData = await cities.json()
    var extCitiesData = []
    citiesData[0].cityPref.forEach(e => {
        extCitiesData.push(e.cityRef)
    });
    setCities(extCitiesData)  
    setCitiesWeatherData(data)
    setIsLoading(false)
    console.log(`Loaded ${auth.currentUser.email} Cities`);
  }
  async function getDefaultCitiesData(){
    var res = await fetch( devURL +'/data/weather/foruser?uid=1')
    var data = await res.json()
    var cities = await fetch( URL +'/data/users/user/?uid=1')
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
    

  },[auth])

  useEffect(()=>{
    async function getCityData(c){
      var req = c.zip === null ?c.name:c.zip
      try{
        var res = await fetch( devURL +'/data/weather/'+ req )
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
          "info": true, 
          "zip": d.region.split(",")[1].replace(/[^0-9]/g,''), 
          "country": "us"}
        setCities(prev => ([disCity,...prev]))  
        setSearchAmount(prev => prev + 1)
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
        if(settingHasChanges){
          alert("You have unsaved changes! ether save your changes or press the disregard button so we can be sure you don't wanna save them:)")
        }
        else{
          setShowSettings(!showSettings)
        }
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
  function handelSettings(e){
    setSettingsHasChanges(e)
    console.log(e)
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
              { showSettings ?<Settings ActivateMe={handelActive} SettingsHasChanges={settingHasChanges} setSettingsHasChanges={handelSettings} CloseSettings={handelActive} />:""}
            </div>
      </Router>
    </>
  );
}

export default App;
