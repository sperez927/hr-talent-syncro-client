import { createContext, useEffect, useState } from "react";
import auth from "../../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, updateProfile } from "firebase/auth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const [currUser, setCurrUser] = useState(null);

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const githubSignIn = () => {
        return signInWithPopup(auth, githubProvider);
    };

    const userRegistration = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const userLogout = () => {
        return signOut(auth);
    };

    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl,
        }).then(() => {
            setUser((currentUser) => ({
                ...currentUser,
                displayName: name,
                photoURL: photoUrl,
                email: auth.currentUser.email,
            }));
            setLoading(false);
        }).catch((error) => {
            console.log("Error updating profile: ", error);
        });
    };

    const fetchUser = async (email) => {
        try {
            const response = await axiosPrivate.get(`/user/${email}`);
            setCurrUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser?.email) {
                fetchUser(currentUser.email);
            } else {
                setLoading(false);
            }
        });
        return () => {
            unSubscribe();
        };
    }, [axiosPrivate]);

    useEffect(() => {
        if (user?.email) {
            fetchUser(user.email);
        }
    }, [user, axiosPrivate]);

    const authInfo = {
        user,
        currUser,
        loading,
        updateUserProfile,
        setLoading,
        googleSignIn,
        githubSignIn,
        userRegistration,
        userLogin,
        userLogout,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
