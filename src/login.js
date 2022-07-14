import React , {useState} from 'react'
import {auth,} from './firebase-config'
import{ createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithEmailLink,
  signInWithPopup, GoogleAuthProvider, GithubAuthProvider,} from 'firebase/auth'
import "./login.css"


export default function Login(props) {
  const [registerEmail,setRegisterEmail] = useState('');
  const [registerPassword,setRegisterPassword] = useState('');
  const [loginEmail,setLoginEmail] = useState('');
  const [loginPassword,setLoginPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true)

  const signInWithGmail = async ()=>{
    const provider = new GoogleAuthProvider();
    try{
      const user = await signInWithPopup(auth,provider);
      console.log(user)

    }catch(error){
      console.log(error)
      console.log(error.message)
    }
  }

  const signInWithGitHub = async ()=>{
    const provider = new GithubAuthProvider();
    try{
      const user = await signInWithPopup(auth,provider);
      console.log(user)

    }catch(error){
      console.log(error)
      console.log(error.message)
    }
  }
  const register = async ()=>{
    try{
      const user = await createUserWithEmailAndPassword(auth,registerEmail, registerPassword);
      console.log(user)
      setRegisterEmail('')
      setRegisterPassword('')
    }
    catch(error){
      console.log(error)
      console.log(error.message)
    }
  }
  
  const login = async ()=>{
    try{
      const user = await signInWithEmailAndPassword(auth,loginEmail, loginPassword);
      console.log(user)
      setLoginEmail('')
      setLoginPassword('')
    }
    catch(error){
      console.log(error)
      console.log(error.message)
    }
    
  }


  const changeIsRegistered = ()=>{
    setIsRegistered(!isRegistered)
  }

  return (
    <div>
      <div>
        <h3>1 Click Sign In</h3>
        <button className='buttonB'  onClick={signInWithGmail}><ion-icon id="ic"name="logo-google"></ion-icon></button>
        <button className='buttonB'  onClick={signInWithGitHub}><ion-icon id="ic" name="logo-github"></ion-icon></button>
      </div>
      {isRegistered? 
        <div>
          <div>
            <h3> Login</h3>
            <input className='loginButton' placeholder='Email...' value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)}/>
            <input className='loginButton' placeholder='Password... ' value={loginPassword} onChange={(e)=> setLoginPassword(e.target.value)}/>
            <button className='loginButton' onClick={login}>Login</button>
          </div>
          <p>Don't have a login register <button className='changeR' onClick={changeIsRegistered}>Here</button> </p>
        </div> : 
        <div>
           <div>
              <h3>Register User</h3>
              <input className='loginButton' placeholder='Email...' value={registerEmail} onChange={(e)=> setRegisterEmail(e.target.value)}/>
              <input className='loginButton' placeholder='Password...' value={registerPassword} onChange={(e)=> setRegisterPassword(e.target.value)}/>
              <button className='loginButton'  onClick={register}>Create User</button>
            </div>
          <p> Do you have a login Sign In  <button className='changeR' onClick={changeIsRegistered}>Here</button> </p>
        </div>
      }
    </div>
  )
}
