import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';

export interface AppUser {
  uid: string;
  displayName: string;
  email: string;
  role: 'student' | 'admin';
  photoURL?: string;
  isAdminLogin?: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginAsAdmin: (username: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  loginAsStudentGuest: (name: string, nis?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'al_arabiyyah_admin_session';
const LOCAL_STUDENT_KEY = 'al_arabiyyah_student_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if an admin or guest student session was saved locally
    const savedAdmin = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (savedAdmin) {
      try {
        const parsed = JSON.parse(savedAdmin);
        setUser(parsed);
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem(LOCAL_ADMIN_KEY);
      }
    }

    const savedStudent = localStorage.getItem(LOCAL_STUDENT_KEY);
    if (savedStudent) {
      try {
        const parsed = JSON.parse(savedStudent);
        setUser(parsed);
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem(LOCAL_STUDENT_KEY);
      }
    }

    // 2. Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        // Determine role: developer email is auto-admin
        const isAdmin = fbUser.email === 'yayang.pramana.2402316@students.um.ac.id';
        const userRole: 'student' | 'admin' = isAdmin ? 'admin' : 'student';

        const appUserData: AppUser = {
          uid: fbUser.uid,
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Siswa Kelas IX',
          email: fbUser.email || '',
          photoURL: fbUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${fbUser.uid}`,
          role: userRole,
        };

        // Try syncing or creating profile in Firestore
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);
          if (!snap.exists()) {
            await setDoc(userDocRef, {
              uid: fbUser.uid,
              displayName: appUserData.displayName,
              email: appUserData.email,
              role: userRole,
              photoURL: appUserData.photoURL,
              createdAt: new Date().toISOString(),
              lastActive: new Date().toISOString(),
            });
          }
        } catch (err) {
          // Non-blocking catch for offline/first connect
          console.warn('Could not sync user profile to firestore:', err);
        }

        setUser(appUserData);
      } else {
        // If not logged in via Firebase, check if local storage had user
        if (!localStorage.getItem(LOCAL_ADMIN_KEY) && !localStorage.getItem(LOCAL_STUDENT_KEY)) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      localStorage.removeItem(LOCAL_ADMIN_KEY);
      localStorage.removeItem(LOCAL_STUDENT_KEY);
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };

  const loginAsAdmin = async (username: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: pass }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, message: data.error || 'Login admin gagal' };
      }

      const adminUser: AppUser = {
        uid: data.user.uid,
        displayName: data.user.displayName,
        email: data.user.email,
        role: 'admin',
        photoURL: data.user.photoURL,
        isAdminLogin: true,
      };

      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
      localStorage.removeItem(LOCAL_STUDENT_KEY);
      setUser(adminUser);
      return { success: true };
    } catch (err: any) {
      // Local fallback in case network has issues
      const cleanU = username.trim().toLowerCase();
      const cleanP = pass.trim();
      if (cleanU === 'admin' && cleanP === 'admin123') {
        const adminUser: AppUser = {
          uid: 'admin_master_001',
          displayName: 'Ustadz Admin (Guru Bahasa Arab)',
          email: 'admin@madrasah.sch.id',
          role: 'admin',
          photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=AdminUstaz',
          isAdminLogin: true,
        };
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
        localStorage.removeItem(LOCAL_STUDENT_KEY);
        setUser(adminUser);
        return { success: true };
      }
      return { success: false, message: 'Username atau password salah (Gunakan: admin / admin123)' };
    }
  };

  const loginAsStudentGuest = async (name: string, nis?: string) => {
    const studentUser: AppUser = {
      uid: 'guest_student_' + Date.now(),
      displayName: name.trim() || 'Siswa Kelas IX',
      email: nis ? `nis-${nis}@siswa.mts.id` : 'siswa9@madrasah.sch.id',
      role: 'student',
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${name || 'SiswaIX'}`,
    };
    localStorage.setItem(LOCAL_STUDENT_KEY, JSON.stringify(studentUser));
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(studentUser);
  };

  const logout = async () => {
    try {
      localStorage.removeItem(LOCAL_ADMIN_KEY);
      localStorage.removeItem(LOCAL_STUDENT_KEY);
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Sign out error:', e);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginAsAdmin,
        loginAsStudentGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
