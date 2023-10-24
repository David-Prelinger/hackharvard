<h1>TeleSpeech (HackHarvard 2023 Best Overall Project 🏆)</h1>
<h2>A Chrome Extension that converts Telegram messages into custom AI-generated speech, mimicking the distinct voice of each sender. </h2>

![128](https://github.com/David-Prelinger/hackharvard/assets/71115970/ccef3cd6-6923-4c01-ad7b-a7444116154a)

Primera Hour, Kylie Bogar, Ronan Takizawa, David Prelinger

AI voices are stale and impersonal. Chrome extensions like <a href="https://chrome.google.com/webstore/detail/free-text-to-speech-onlin/npdkkcjlmhcnnaoobfdjndibfkkhhdfn">"Free Text To Speech Online"</a> use default voices to read text messages on the web out loud. While these default voices excel in cadence and clarity, they miss the nuance and emotion inherent in human speech. This emotional connection is important for a user, as it helps them feel engaged in online communication. Using personalized speech also helps users with special needs who rely on text-to-speech, as this feature assists them in identifying who is talking when vocalizing the messages.

Our project is an attempt to improve the <a href="https://chrome.google.com/webstore/detail/free-text-to-speech-onlin/npdkkcjlmhcnnaoobfdjndibfkkhhdfn">"Free Text To Speech Online"</a> chrome extension, which does text-to-speech with a default voice. We tried to improve the Chrome extension by allowing customizable voices and only having it read the content within a text message and not everything on a page. 

Usage:

1. Go to https://telespeech.vercel.app/
2. Sign up for an account, and upload audio files of voices you want to use for the text-to-speech. For each audio file, set the name as the username displayed on the Telegram chat
3. Download this repository as a zip, and upload the "ronanchromextension" directory to chrome://extensions/ (Make sure developer mode is On, and you upload it using "Load Unpacked"
4. Open the Telegram web app, sign into your account on the chrome extension, and press play for any group chat. The extension will then play each person's text out loud in that person's voice 👍

<a href="https://www.youtube.com/watch?v=FSYjliOjmUY&ab_channel=PrimeraHour">Tutorial</a>


https://github.com/David-Prelinger/hackharvard/assets/71115970/d23bfbe1-ff8b-44cc-a637-dc4238008404




Tech Stack: 
- Chrome Extension (Vanilla JS)
- Web App (NextJS, Bootstrap, Firebase)
- API (Eleven Labs text-speech AI API)
