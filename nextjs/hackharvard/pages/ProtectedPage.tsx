// ProtectedPage.tsx
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../components/AuthContext';
import { useRouter } from 'next/router';
import { doc, getDoc, getFirestore } from "firebase/firestore";

const axios = require('axios');
const FormData = require('form-data');
const ProtectedPage: React.FC = () => {
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
    if (!mp3File) {
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
  } catch (error) {
      console.error('Error adding voice:', error);
  }

    /*
    if (user && mp3File) {
      const token = await user.getIdToken();

      const formData = new FormData();
      formData.append('file', mp3File);
      formData.append('text', text);

      try {
        const response = await fetch('/api/upload-voice', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const responseData = await response.json();
        console.log('File upload successful:', responseData);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }*/
  };

  if (user == null) {
    return null;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
        <input type="file" accept=".mp3" onChange={handleFileChange} />
        <input type="text" value={text} onChange={handleTextChange} placeholder="Enter some text" />
        <button type="submit">Submit</button>
      </form>
      <p>Only logged-in users can see this page.</p>
      {voices && (
        <div>
          <h2>Your Voices</h2>
          <table>
            <thead>
              <tr>
                {/* Assume each voice object has a 'name' and 'description' property */}
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

export default ProtectedPage;
