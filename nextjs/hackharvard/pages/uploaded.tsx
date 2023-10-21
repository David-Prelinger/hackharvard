import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Uploaded = () => {
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent) => {
        return router.push("/uploadaudio")
      };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center" style={{ width: '30rem' }}>
        <div className="card-header">
          Upload Successful!
        </div>
        <div className="card-body">
          <p className="card-text">Please check your Chrome extension for updates.</p>
          <Link href="/">
            <button className="btn btn-primary" style={{backgroundColor: '#25A6D9', borderColor: '#25A6D9'}} onSubmit={handleSubmit}>Go back </button>
          </Link>
        </div>
        <div className="card-footer text-muted">
          Your data has been saved.
        </div>
      </div>
    </div>
  );
};

export default Uploaded;
