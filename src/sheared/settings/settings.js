import React,{useState,useEffect } from 'react'
import CitySettings from './CitySettings';
import {auth} from '../../firebase-config'
import Login from './login';
import {onAuthStateChanged,signOut} from 'firebase/auth'
import "./settings.css"

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
            return <div className='pages' ><Login user={user}/></div>
        }else if(showPage === 'citySettings'){
            return (
            <div className='pages' >
                <CitySettings  SettingsHasChanges={props.settingHasChanges} setSettingsHasChanges={props.setSettingsHasChanges} user={user} />
            </div>)
        }
        else{
            return <div>404</div>
        }
    }
    return(
        <div className='settingsMP'>
            <div className='settings-header'>
                <div className='settings-header-title'>
                    Settings
                </div>
                <button className='ex'  onClick={()=> props.ActivateMe("settings")}><ion-icon name="close-circle-outline"></ion-icon></button>
            </div>
            <div className='settingsPage'>
                <div className='sittingsNav'>
                    <button className={showPage==="login" ? 'sittingsB SA' :'sittingsB' } onClick={()=> handelPage('login')}>
                        <div className="ic"><ion-icon className="ic" name="people-circle-outline"></ion-icon></div>
                        <p>Login</p>
                    </button>
                    <button className={showPage==="citySettings" ? 'sittingsB SA' :'sittingsB' } onClick={()=> handelPage('citySettings')}>
                        <div className="ic"><ion-icon   name="earth-outline"></ion-icon></div>
                        <p>Cities Settings</p>
                    </button>
                </div>
                {Page()}
            </div>
        </div>
    )
}