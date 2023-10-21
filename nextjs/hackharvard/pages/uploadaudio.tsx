import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../components/AuthContext';
import { useRouter } from 'next/router';
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import Explanation from '../public/explanation.svg'
import Image from 'next/image'

import axios from 'axios';
import FormData from 'form-data';
const UploadAudio: React.FC = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const [voices, setVoices] = useState<Map<String, String> | null>(null);
  const [mp3File, setMp3File] = useState<File | null>(null);
  const [text, setText] = useState('');

  // Existing useEffect...

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setMp3File(file);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!mp3File && !user) {
      alert('No file selected');
      console.error('No file selected');
      return;
    }

    try {
      // Create a new instance of FormData
      let form = new FormData();

      // Append the necessary data
      form.append('name', 'Sample Voice');
      form.append('files', mp3File);  // Append the file object directly

      // Make the POST request
      const postResponse = await axios.post('https://api.elevenlabs.io/v1/voices/add', form, {
        headers: {
          'xi-api-key': 'c9a4a0e489737ef5f7f7f12b2c1d6df4',
        },
      });
      console.log('Voice added successfully:', postResponse.data);
       // Assume postResponse.data.voiceId contains the voiceId from the ElevenLabs API response
       const voiceId = postResponse.data.voice_id;

       // Initialize Firestore
       const db = getFirestore();
 
       // Create or update the document in Firestore
       const userDocRef = doc(db, 'voices', user!.uid);
       const newVoice = { [text]: voiceId };  // Use the text as the voice name
       await setDoc(userDocRef, { voices: newVoice }, { merge: true });
    } catch (error) {
      console.error('Error adding voice:', error);
    }
    return router.push("/uploaded")
  };

  if (user == null) {
    return null;
  }

  return (
    <div className="container mt-5">
        <Image src={Explanation} alt="Telegram Pic" width={1100} height={500}/>
        <h1 className=" mb-4  fw-bold" style={{color:'#25A6D9'}}>Upload Your Voice</h1>

      <form encType="multipart/form-data" onSubmit={handleFormSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">Upload MP3 (Max 1 min)</label>
          <input type="file" accept=".mp3" onChange={handleFileChange} className="form-control" id="fileInput" />
        </div>
        <div className="mb-3">
          <label htmlFor="textInput" className="form-label">Enter Name of Speaker</label>
          <textarea 
            onChange={handleTextChange}
            value={text}  
            placeholder="Enter Name" 
            className="form-control" 
            id="textInput" 
            rows={1}  // Set the number of rows
></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#25A6D9', borderColor: '#25A6D9'}}>Submit</button>
      </form>
      {voices && (
        <div>
          <h2 className="text-primary mb-3">Your Voices</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {voices != null && Array.from(Object.keys(voices)).map((key, index) => {
                const voice = key;
                return (
                  <tr key={index}>
                    <td>{voice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadAudio;

