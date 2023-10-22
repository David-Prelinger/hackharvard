import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
    // Ensure the request is a POST request
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed'); // Return a 405 Method Not Allowed if it's not a POST request
        return;
    }

    // Ensure the request has a JSON body
    if (!req.body) {
        res.status(400).send('Bad Request'); // Return a 400 Bad Request if there's no body
        return;
    }

    const { voiceId, text } = req.body; // Destructure the voiceName and text from the request body

    if (!voiceId || !text) {
        res.status(400).send('Bad Request'); // Return a 400 Bad Request if either voiceName or text are missing
        return;
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceSettings = { stability: 1, similarity_boost: 0 };

    const baseUrl = "https://api.elevenlabs.io/v1/text-to-speech";
    const headers = {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
    };

    const requestBody = {
        text,
        voice_settings: voiceSettings,
    };

    try {
        const response = await axios.post(`${baseUrl}/${voiceId}`, requestBody, {
            headers,
            responseType: "arraybuffer",  // Change to arraybuffer to handle binary data
        });

        if (response.status === 200) {
            res.setHeader('Content-Type', 'audio/wav');  // Assuming the audio is in wav format
            res.status(200).send(response.data);
        } else {
            res.status(500).send('External API request failed');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
}
