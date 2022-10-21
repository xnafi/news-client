import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';


const auth = getAuth(app)

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoding] = useState(true)


    // google signIn
    const googleSignIn = (provider) => {
        setLoding(true)
        return signInWithPopup(auth, provider)
    }
    // signInWithEmail
    const signInWithEmail = (email, password) => {
        setLoding(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // email varify
    const varifyEmail = () => {
        setLoding(true)
        return sendEmailVerification(auth.currentUser)
    }
    // set userName and photoURL
    const addInformation = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }
    // loginWithEmail
    const loginWithEmail = (email, password) => {
        setLoding(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // logOut user
    const logOut = () => {
        setLoding(true)
        signOut(auth)
    }


    // to get signIn user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser === null || currentUser.emailVerified) {
                setUser(currentUser)

            }
            setLoding(false)
        })
        return () => unsubscribe()
    }, [])

    const values = {
        googleSignIn,
        user,
        loading,
        setLoding,
        varifyEmail,
        addInformation,
        logOut,
        loginWithEmail,
        signInWithEmail
    }

    return (
        <AuthContext.Provider value={values} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider