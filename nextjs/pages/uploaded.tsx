import React from 'react';
import { useRouter } from 'next/router';

const Uploaded = () => {
    const router = useRouter();

    const handleButtonClick = async () => {
        // Navigates to /uploadaudio route when the button is clicked
        await router.push("/uploadaudio");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card text-center" style={{ width: '30rem' }}>
                <div className="card-header">
                    Upload Successful!
                </div>
                <div className="card-body">
                    <p className="card-text">Please check your Chrome extension for updates.</p>
                    <button
                        className="btn btn-primary"
                        style={{backgroundColor: '#25A6D9', borderColor: '#25A6D9'}}
                        onClick={handleButtonClick}
                    >
                        Go back 
                    </button>
                </div>
                <div className="card-footer text-muted">
                    Your data has been saved.
                </div>
            </div>
        </div>
    );
};

export default Uploaded;
