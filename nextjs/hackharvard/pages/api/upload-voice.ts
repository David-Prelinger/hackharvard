// pages/api/uploadAudio.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import formidable from 'formidable';
import FormData from 'form-data';  // Import form-data
import fs from 'fs';  // Import the fs module

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();  // Method Not Allowed
  }

  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const file = files.files;  // Assuming the file input field name is "files"
    if (!file) {
      console.error('No file provided in form data');
      return res.status(400).json({ error: 'No file provided' });
    }

    const formData = new FormData();
    formData.append('name', 'Sample Voice');
    formData.append('files', fs.createReadStream(file[0].filepath), file[0].originalFilename ?? 'ABC');  // Include the file name

    try {
      const response = await axios.post('https://api.elevenlabs.io/v1/voices/add', formData, {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          ...formData.getHeaders(),
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error uploading audio:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};
