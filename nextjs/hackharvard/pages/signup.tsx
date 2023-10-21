'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: any) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/admin")
    }
    //return (<div className="wrapper">
    //    <div className="form-wrapper">

    return (<div className="container">
<form onSubmit = {handleForm} className="mt-4">
  <h2 className="text-center mb-4">Create an Account</h2>
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
    <small className="text-muted">
      Password must be at least 8 characters.
    </small>
  </div>
  <button type="submit" className="btn btn-primary btn-block">
    Sign Up
  </button>
  <p className="mt-3 text-center">
    <small>
      Already have an account? <a href="/login">Log in</a>
    </small>
  </p>
</form>


</div>)
}

export default Page;