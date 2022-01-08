import { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()

    const signinUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logout = () => {
        signOut(auth)
        .then(res=>setUser({}))
    }

    useEffect(() => {
        onAuthStateChanged(auth, (result) => {
            if (result) {
                setUser({
                    uid:result.uid,
                    name:result.displayName,
                    email:result.email,
                    photo:result.photoURL,
                    phone:result.phoneNumber
                })
            }else{
                setUser({})
            }
            setLoading(false)
        })
    }, [])

    return {
        user,
        signinUsingGoogle,
        logout,
        loading
    }
};

export default useFirebase;