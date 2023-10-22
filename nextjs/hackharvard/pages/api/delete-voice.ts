// pages/api/private-endpoint.js
import axios from 'axios';
import * as admin from 'firebase-admin';
import { DocumentData } from 'firebase-admin/firestore';
import { FieldValue, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
const serviceAccountKeyPath = require('../../firebase-credentials');  // Adjust the path to match the location of credentials.js


// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKeyPath),
  });
}

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  const name: string = req.query.name as string;
  console.log('Name:', name);
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

    const voices: DocumentData[string] = userDoc.data().voices;  // Extract the voices data from the document
    if (voices.hasOwnProperty(name)) {
        console.log("voice found!");

        let voiceId = voices[name];
        console.log('voiceid', voiceId)
        // Send a DELETE request to the ElevenLabs endpoint
        await axios.delete(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
            headers: {
                "xi-api-key": process.env.ELEVENLABS_API_KEY!
            }
          });
  

        // Obtain a reference to the Firestore Admin SDK database
        const dbAdmin = admin.firestore();

        // Prepare the update to remove the voice associated with the name
        const updateData = {
          [`voices.${name}`]: admin.firestore.FieldValue.delete()
        };

        // Update the document to remove the voice using the Admin SDK
        await dbAdmin.doc(userDocRef.path).update(updateData);

        res.status(200).json('Removed voice');  // Send the updated voices data to the client as JSON

    } else {
        res.status(404).json('Did not find voice name');  // Send the updated voices data to the client as JSON

    }
  
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
