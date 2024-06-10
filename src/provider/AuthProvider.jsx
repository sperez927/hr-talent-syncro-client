import { createContext, useEffect, useState } from "react";
import auth from "../../firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, updateProfile } from "firebase/auth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currUser, setCurrUser] = useState(null);
    const [bannedUser, setBannedUser] = useState(null);

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
        localStorage.removeItem('token');
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
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                const userInfo = {
                    email: currentUser?.email
                };
                console.log("Sending user info to /jwt:", userInfo);
                try {
                    const res = await axiosPrivate.post('/jwt', userInfo);
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                    } else {
                        console.error("Token not received:", res.data);
                    }
                } catch (error) {
                    console.error("Error getting token:", error);
                }

                fetchUser(currentUser?.email);
            } else {
                setLoading(false);
            }
        });

        return () => {
            unSubscribe();
        };
    }, [axiosPublic]);

    useEffect(() => {
        if (user?.email) {
            fetchUser(user.email);
        }
    }, [user, axiosPrivate]);

    useEffect(() => {
        const fetchBannedEmployees = async () => {
            try {
                const response = await axiosPrivate.get('/banned-user');
                setBannedUser(response.data?.map(user => user.email));
            } catch (error) {
                console.error('Failed to get banned users', error);
            }
        };

        fetchBannedEmployees();
    }, [axiosPrivate]);

    const authInfo = {
        user,
        currUser,
        bannedUser,
        setBannedUser,
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
