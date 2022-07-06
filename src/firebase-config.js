import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'

const fireApp = initializeApp({
    
    apiKey: process.env.REACT_APP_FIREBASE_apiKey,
    authDomain:  process.env.REACT_APP_FIREBASE_authDomain,
    projectId: process.env.REACT_APP_FIREBASE_projectId,
    storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
    appId:  process.env.REACT_APP_FIREBASE_appId,
    measurementId: process.env.REACT_APP_FIREBASE_measurementId
})


export const auth = getAuth(fireApp);