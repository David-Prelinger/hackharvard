'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/admin")
    }
    return (<div className="container">
<form onSubmit = {handleForm} className="mt-4">
  <h2 className="text-center mb-4">Login to your Account</h2>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">
      Email Address
    </label>

    <input
      onChange={(e) => setEmail(e.target.value)}
      type="email"
      className="form-control"
      id="email"
      placeholder="Enter your email"
      required
      autoComplete="email"
    />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">
      Password
    </label>
    <div className="input-group">
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="form-control"
        id="password"
        placeholder="Enter your password"
        required
        minLength={8}
        autoComplete="new-password"
      />
    </div>
  </div>
  <button type="submit" className="btn btn-primary btn-block">
    Sign Up
  </button>
  <p className="mt-3 text-center">
    <small>
      Don't have an Account? <a href="/signup?">Create an Account</a>
    </small>
  </p>
</form>


</div>)
}

export default Page;