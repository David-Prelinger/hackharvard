import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
  <title>PVR - Title Page</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body {\n            font-family: Arial, sans-serif;\n            background-color: #f0f0f0;\n            text-align: center;\n            margin: 0;\n            padding: 0;\n        }\n\n        .container {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            height: 100vh;\n        }\n\n        h1 {\n            font-size: 48px;\n            margin-bottom: 20px;\n        }\n\n        .links {\n            display: flex;\n            justify-content: space-between;\n        }\n\n        .link {\n            text-decoration: none;\n            color: #007bff;\n            font-size: 24px;\n            cursor: pointer; /* Add a pointer cursor on hover */\n            transition: color 0.3s; /* Smooth color transition on hover */\n        }\n\n        .link:hover {\n            text-decoration: underline;\n            color: #0056b3; /* Change link color on hover */\n        }\n    "
    }}
  />
  <div className="container">
    <h1>PVR</h1>
    <div className="links">
      <a className="link" href="signin.html">
        Sign In  
      </a>
      <button type="button" className="btn btn-success"> <>style = "text-decoration:none"</><a href="./login">liogin</a>
 </button>
      <>&nbsp; &lt;</>

      <a className="link" href="signup.html">
        Sign Up
      </a>
    </div>
  </div>
</>

  
  
  
  )
}
