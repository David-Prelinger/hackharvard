// pages/api/private-endpoint.js
import * as admin from 'firebase-admin';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
const serviceAccountKeyPath = require('../../firebase-credentials');  // Adjust the path to match the location of credentials.js


// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  //const serviceAccountKey = JSON.parse(fs.readFileSync(serviceAccountKeyPath, 'utf8'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKeyPath),
  //  databaseURL: 'https://your-project.firebaseio.com',
  });
}

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  
  try {
    console.log(token)
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;  // Extract the user ID from the decoded token

    const db = getFirestore();  // Obtain a reference to the Firestore database
    const userDocRef = doc(db, 'voices', uid);  // Obtain a reference to the user's document
    const userDoc = await getDoc(userDocRef);  // Read the user's document from Firestore

    if (!userDoc.exists()) {
      res.status(404).send('No voices found for this user');
      return;
    }

    const voices = userDoc.data().voices;  // Extract the voices data from the document
    res.status(200).json(voices);  // Send the voices data to the client as JSON
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
