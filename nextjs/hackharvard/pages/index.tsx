import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import TelegramLogo from '../public/telespeech.png'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <title>TeleSpeech </title>
      <style
  dangerouslySetInnerHTML={{
    __html:
      `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .fade-in {
        animation: fadeIn 1.5s ease-out;
      }

      body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          text-align: center;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
      }

      .header {
          display: flex;
          align-items: center;
          margin: 0 20px; 
      }

      h1 {
          font-size: 48px;
          margin: 0; 
      }

      .links {
          display: flex;
          align-items: center;
          flex-direction: column; 
      }

      .link {
          text-decoration: none;
          color: #007bff;
          font-size: 24px;
          cursor: pointer; 
          transition: color 0.3s; 
          margin: 10px 0; 
          font-size: 32px;
      }

      .link:hover {
          text-decoration: underline;
          color: #0056b3;
      }
      `
  }}
/>
      <div className="container">
        <div className="header" style={{position:"relative",left:"40px"}}>
          <h1>TeleSpeech</h1>
          <Image src={TelegramLogo} alt="Telegram Pic" width={80} height={80}/>
          
        </div>
        <h4 style={{paddingTop:"30px",paddingBottom:"30px"}}>Custom AI text-to-speech on Telegram</h4>

        <div className="links fade-in" style={{ display: "inline-block"}}>
          <br></br>
        <a className="link" href="login" style={{ marginRight: "50px", color:'#25A6D9'}}>
        Sign In
        </a>
        <a className="link" href="signup" style={{color:'#25A6D9'}}>
        Sign Up
        </a>
      </div>
      </div>
    </>
  )
}
