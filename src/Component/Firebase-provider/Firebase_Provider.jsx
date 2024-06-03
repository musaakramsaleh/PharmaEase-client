import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import app from '../Firebase-config/firebase-config';
export const AuthContext = createContext(null)
const Firebase_Provider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider()
    console.log(user)
    const auth = getAuth(app)
    const createUser = (email,password)=>{
        setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password)
    }
    useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth, (currentuser) => {
            if (currentuser) {
              setUser(currentuser)
              setLoading(false)
            } 
          });
          return ()=>{
            unSubscribe();
          }
    },[])
    const loginUser =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin =()=>{
        setLoading(true)
        
        return signInWithPopup(auth, googleProvider)
    }
    const updateuserProfile = (name,imageurl)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: imageurl
          });
    }
    const githubLogin =()=>{
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }
    const logout = ()=>{
        setUser(null)
        return signOut(auth)
    }
      const allvalues = {
        createUser,
        loading,
        loginUser,
        googleLogin,
        githubLogin,
        logout,
        updateuserProfile,
        user
      }
    return (
        <AuthContext.Provider value = {allvalues}>
              {children}
        </AuthContext.Provider>
    );
};


export default Firebase_Provider;