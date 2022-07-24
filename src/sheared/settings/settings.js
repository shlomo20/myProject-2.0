import React,{useState,useEffect } from 'react'
import CitySettings from './CitySettings';
import {auth} from '../../firebase-config'
import {onAuthStateChanged,signOut} from 'firebase/auth'

export default function Settings (){
    const [user,setUser] = useState('')
    const userId = auth.currentUser? auth.currentUser.uid: "1"
    const [showPage, setShowPage] = useState('login')
    return(
        <div className='settingsPage'>
            <div className='sittingsNav'>
                <button>Login</button>
                <button>City Settings</button>
            </div>
            <CitySettings user={user} userId={userId}/>
        </div>
    )

}