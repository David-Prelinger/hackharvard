// ProtectedPage.tsx
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../components/AuthContext';  // Adjust the import path to match your file structure
import { useRouter } from 'next/router';
import { doc, getDoc, getFirestore } from "firebase/firestore";  // Import Firestore functions



const ProtectedPage: React.FC = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [voices, setVoices] = useState(null);

  useEffect(() => {
    if (user == null) {
      // Redirect to login page if user is not authenticated
      router.push('/login');
    } else {
      // Get user's voices document from Firestore
      const fetchVoices = async () => {
        const db = getFirestore();
        const docRef = doc(db, "voices", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setVoices(docSnap.data().voices);
        } else {
          console.log("No such document!");
        }
      };

      fetchVoices();
    }
  }, [user, router]);

  if (user == null) {
    // Optionally render a loading state or nothing while waiting for user data
    return null;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Only logged-in users can see this page.</p>
      {voices && (
        <div>
          <h2>Your Voices</h2>
          <pre>{JSON.stringify(voices, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
