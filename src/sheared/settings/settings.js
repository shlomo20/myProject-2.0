import React,{useState,useEffect } from 'react'
import CitySettings from './CitySettings';
import {auth} from '../../firebase-config'
import Login from './login';
import {onAuthStateChanged,signOut} from 'firebase/auth'

export default function Settings (props){
    const [user,setUser] = useState(null)
    const [showPage, setShowPage] = useState('login')

    useEffect(()=>{
        onAuthStateChanged(auth,(currentUser)=>{
                setUser(currentUser)
                console.log( currentUser)
            }
        )
    },[auth] )

    function handelPage(page){
        console.log(page)
        setShowPage(page)
    }
    const Page = () => {
        if(showPage === 'login'){
            return <Login user={user}/>
        }else if(showPage === 'citySettings'){
            return <CitySettings SettingsHasChanges={props.settingHasChanges} setSettingsHasChanges={props.setSettingsHasChanges} user={user} />
        }
        else{
            return <div>404</div>
        }
    }
    return(
        <div className='settingsPage'>
            <div className='sittingsNav'>
                <button onClick={()=> handelPage('login')}>Login</button>
                <button onClick={()=> handelPage('citySettings')}>City Settings</button>
            </div>
            {Page()}
        </div>
    )
}