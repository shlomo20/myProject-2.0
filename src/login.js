import React , {useState} from 'react'
import {auth,} from './firebase-config'
import{ createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithEmailLink,
  signInWithPopup, GoogleAuthProvider, GithubAuthProvider,} from 'firebase/auth'



export default function Login(props) {
  const [registerEmail,setRegisterEmail] = useState('');
  const [registerPassword,setRegisterPassword] = useState('');
  const [loginEmail,setLoginEmail] = useState('');
  const [loginPassword,setLoginPassword] = useState('');


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

  const signInWithLink = async ()=>{
    /*const actionCodeSettings = {
      url: 'https://www.example.com/?email=user@example.com',
      iOS: {
         bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      handleCodeInApp: true
    };
      await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
      // Obtain emailLink from the user.
      if(isSignInWithEmailLink(auth, emailLink)) {
        await signInWithEmailLink(auth, 'user@example.com', emailLink);
      }*/
    try{
      const user = await signInWithEmailLink(auth,'','actionCodeSettings');
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

  return (
    <div>
      <div>
        <h3>1 Click Sign In</h3>
        <button on onClick={signInWithGmail}>Sign With Gmail</button>
        <button on onClick={signInWithGitHub}>Sign With Github</button>
        <button on onClick={signInWithGitHub}>Get Email Link</button>
      </div>
      <div>
        <h3>Register User</h3>
        <input placeholder='Email...' value={registerEmail} onChange={(e)=> setRegisterEmail(e.target.value)}/>
        <input placeholder='Password...' value={registerPassword} onChange={(e)=> setRegisterPassword(e.target.value)}/>
        <button onClick={register}>Create User</button>
      </div>
      <div>
        <h3> Login</h3>
        <input placeholder='Email...' value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)}/>
        <input placeholder='Password... ' value={loginPassword} onChange={(e)=> setLoginPassword(e.target.value)}/>
        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}
