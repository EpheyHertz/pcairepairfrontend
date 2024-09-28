// pages/email-verification.js
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // Import useSearchParams and useRouter
import axios from 'axios';

// Styles for the component
const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: 'auto',
        transition: 'transform 0.2s',
    },
    successMessage: {
        fontSize: '24px',
        color: '#4CAF50',
        marginBottom: '20px',
    },
    redirectMessage: {
        fontSize: '16px',
        color: '#333',
    },
    errorMessage: {
        fontSize: '24px',
        color: '#F44336',
        marginBottom: '20px',
    },
    errorDetails: {
        fontSize: '16px',
        color: '#555',
    },
};

// Fallback component to show while Suspense is loading
const FallbackComponent = () => (
    <div style={styles.container}>
        <h2 style={{ color: '#007BFF' }}>Loading...</h2>
        <p>Please wait while we verify your email.</p>
    </div>
);

const EmailVerification = () => {
    const searchParams = useSearchParams(); // Use useSearchParams to get the query params
    const router = useRouter(); // Use router for navigation
    const [verificationStatus, setVerificationStatus] = useState(null); // Track verification status
    const [loading, setLoading] = useState(true);

    // Extract email and token from the search params
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    useEffect(() => {
        if (email && token) {
            // Send email and token to the backend for verification
            axios.post('https://aipcrepair.onrender.com/apis/verify-email/', {
                token,    // Make sure the token is correctly passed
                email     // Ensure the correct email is being passed
            })
            .then((response) => {
                setVerificationStatus('success');
                setLoading(false);
            
                // Redirect to login after successful verification
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
                setVerificationStatus('error');
                setLoading(false);
            
                // Log the error to help with debugging
                console.error('Email verification failed:', error);
            });
        } else {
            setVerificationStatus('error'); // Set error if email or token is missing
            setLoading(false);
        }
    }, [email, token, router]);

    if (loading) {
        // Fallback during loading
        return <p>Verifying your email...</p>;
    }

    return (
        <div style={styles.container}>
            {verificationStatus === 'success' && (
                <>
                    <h2 style={styles.successMessage}>Email verified successfully!</h2>
                    <p style={styles.redirectMessage}>Redirecting you to the login page...</p>
                </>
            )}
            {verificationStatus === 'error' && (
                <>
                    <h2 style={styles.errorMessage}>Verification failed.</h2>
                    <p style={styles.errorDetails}>
                        The link is invalid or has expired. Please try signing up again or contact support.
                    </p>
                </>
            )}
        </div>
    );
};

// Main Component wrapped with Suspense
const EmailVerificationPage = () => {
    return (
        <Suspense fallback={<FallbackComponent />}>
            <EmailVerification />
        </Suspense>
    );
};

export default EmailVerificationPage;
