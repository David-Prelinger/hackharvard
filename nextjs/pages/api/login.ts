// pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase_app from '../../config';

const auth = getAuth(firebase_app);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    res.status(200).json({ user: token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
