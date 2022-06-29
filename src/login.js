import React , {useState} from 'react'
import {auth,} from './firebase-config'
import{ createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, 
  signInWithPopup, GoogleAuthProvider, GithubAuthProvider,onAuthStateChanged} from 'firebase/auth'
import { async } from '@firebase/util';


export default function Login() {
  const [registerEmail,setRegisterEmail] = useState('');
  const [registerPassword,setRegisterPassword] = useState('');
  const [loginEmail,setLoginEmail] = useState('');
  const [loginPassword,setLoginPassword] = useState('');
  const [user,setUser] = useState('')
  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser)
  }
  )

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
  const logout = async ()=>{
      await signOut(auth);
  }

  return (
    <div>
      <div>
        <h3>Register User</h3>
        <input placeholder='Email...' value={registerEmail} onChange={(e)=> setRegisterEmail(e.target.value)}/>
        <input placeholder='Password...' value={registerPassword} onChange={(e)=> setRegisterPassword(e.target.value)}/>
        <button onClick={register}>Create User</button>
      </div>
      <div>
        <button on onClick={signInWithGmail}>Sign With Gmail</button>
        <button on onClick={signInWithGitHub}>Sign With Github</button>
      </div>
      <div>
        <h3> Login</h3>
        
        <input placeholder='Email...' value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)}/>
        <input placeholder='Password... ' value={loginPassword} onChange={(e)=> setLoginPassword(e.target.value)}/>
        <button onClick={login}>Login</button>
      </div>
      <h4>
        User Logged In: 
        {user? user.email:""}
      </h4>
      <button onClick={logout}>Sign Out</button>
      
    </div>
  )
}
