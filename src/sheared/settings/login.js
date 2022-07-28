import React , {useState} from 'react'
import {auth,} from '../../firebase-config'
import{ onAuthStateChanged,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithEmailLink,
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

  const logout = async ()=>{
    await signOut(auth);
  }
  const page = () => {
    if(props.user === null){
      return (<>
        <div className='pr'>Login</div>
        <div className='loginP'>
          
          <div>
            <h4>Signal Click Sign In Continue With </h4>
            <button className='buttonB'  onClick={signInWithGmail}><ion-icon id="ic"name="logo-google"></ion-icon></button>
            or
            <button className='buttonB'  onClick={signInWithGitHub}><ion-icon id="ic" name="logo-github"></ion-icon></button>
          </div>
          {isRegistered? 
            <div>
              <div>
                <h4> Login</h4>
                <input className='loginButton' placeholder='Email...' value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)}/>
                <input className='loginButton' placeholder='Password... ' value={loginPassword} onChange={(e)=> setLoginPassword(e.target.value)}/>
                <button className='buttonB' onClick={login}>Login</button>
              </div>
              <p>No account? <button className='changeR' onClick={changeIsRegistered}>Create One Here</button> </p>
            </div> : 
            <div>
              <div>
                  <h4>Register User</h4>
                  <input className='loginButton' placeholder='Email...' value={registerEmail} onChange={(e)=> setRegisterEmail(e.target.value)}/>
                  <input className='loginButton' placeholder='Password...' value={registerPassword} onChange={(e)=> setRegisterPassword(e.target.value)}/>
                  <button className='buttonB'  onClick={register}>Create User</button>
                </div>
              <p> Do you have a login Sign In <button className='changeR' onClick={changeIsRegistered}>Here</button> </p>
            </div>
          }
        </div></>
      )
    }
    else{
      return (<>
      <div className='pr'>Profile</div>
        <div className='loginP'>
          <div className='profileSec'>
            <img className='proPho' src={props.user.photoURL ?props.user.photoURL : 'https://png.pngitem.com/pimgs/s/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png' } alt='user'/>
            <h4 className='proInf'>Welcome <br/>{props.user.displayName}</h4>
            <h4> {props.user.loginEmail}</h4>
          </div>
          <button className='buttonB' onClick={logout}>Sign Out</button>
        </div>
      </>
      )
    }
  }
  return ( 
    <div>
      
      {page()}
    </div>
  ) 
}
