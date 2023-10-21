// pages/api/private-endpoint.ts
import * as admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import Busboy from 'busboy';
import busboy from 'busboy';
const serviceAccountKeyPath = require('../../firebase-credentials');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
// ... rest of your code

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            /*const bb = busboy({ headers: req.headers });
            let fileBuffer: Buffer | null = null;
            let text: string | null = null;
      
            bb.on('file', (name, file, info) => {
              
              const chunks: any[] = [];
              file.on('data', chunk => chunks.push(chunk));
              file.on('end', () => {
                fileBuffer = Buffer.concat(chunks);
                res.status(200).send('early finish')
              });
              res.status(200).send('early finish2')
      
            });
      
            /*bb.on('field', (fieldname, value) => {
              if (fieldname === 'text') {
                text = value;
              }
            });*/

            /*bb.on('finish', async () => {
              // ... rest of your code
              res.status(200).send('Uploaded voice');
            });
      
            req.pipe(bb);
            */


            // Create a new instance of FormData
            let form = new FormData();

            // Append the necessary data
            form.append('name', 'Sample Voice');
            form.append('files', fs.createReadStream('sample.mp3'));
            form.append('description', 'This is a sample voice description.');
            form.append('labels', JSON.stringify({ label1: 'value1', label2: 'value2' }));  // Serialized labels dictionary

            // Make the POST request
            axios.post('api.elevenlabs.io/v1/voices/add', form, {
                headers: {
                    ...form.getHeaders(),
                    'xi-api-key': 'c9a4a0e489737ef5f7f7f12b2c1d6df4'
                }
            })
                .then((response: { data: any; }) => {
                    console.log('Voice added successfully:', response.data)
                    res.status(200).send('Voice added')
                })
                .catch((error: any) => {
                    console.error('Error adding voice:', error);
                    res.status(500).send( error)

                });


        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
