import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  db 
} from '../firebase/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc 
} from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign Up function
  async function signup(email, password, role = 'user') {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save additional user info including role in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const profile = {
      uid: user.uid,
      email: user.email,
      role: role,
      createdAt: new Date().toISOString()
    };
    
    await setDoc(userDocRef, profile);
    setUserData(profile);
    return user;
  }

  // Log In function
  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Fetch user role/data from Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      setUserData(userDoc.data());
    } else {
      // Fallback: If no document exists in Firestore, create one with default role
      const defaultRole = email.toLowerCase().includes('admin') ? 'admin' : 'user';
      const profile = {
        uid: user.uid,
        email: user.email,
        role: defaultRole,
        createdAt: new Date().toISOString()
      };
      await setDoc(userDocRef, profile);
      setUserData(profile);
    }
    return user;
  }

  // Log Out function
  function logout() {
    setUserData(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            // Auto create profile if it doesn't exist
            const defaultRole = user.email.toLowerCase().includes('admin') ? 'admin' : 'user';
            const profile = {
              uid: user.uid,
              email: user.email,
              role: defaultRole,
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, profile);
            setUserData(profile);
          }
        } catch (error) {
          console.error("Error loading user profile from Firestore:", error);
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
