// pages/email-verification.js
'use client'

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // Import useSearchParams and useRouter
import axios from 'axios';

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
            axios.post('https://aipcrepair.onrender.com/verify-email/', {
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
                setVerificationStatus('error');
                setLoading(false);
            
                // Log the error to help with debugging
                console.error('Email verification failed:', error);
            });
            
        }
    }, [email, token, router]);

    if (loading) {
        // Fallback during loading
        return <p>Verifying your email...</p>;
    }

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            {verificationStatus === 'success' && (
                <>
                    <h2>Email verified successfully!</h2>
                    <p>Redirecting you to the login page...</p>
                </>
            )}
            {verificationStatus === 'error' && (
                <>
                    <h2>Verification failed.</h2>
                    <p>
                        The link is invalid or has expired. Please try signing
                        up again or contact support.
                    </p>
                </>
            )}
        </div>
    );
};

// Fallback component to show while Suspense is loading
const FallbackComponent = () => (
    <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading...</h2>
        <p>Please wait while we verify your email.</p>
    </div>
);

// Main Component wrapped with Suspense
const EmailVerificationPage = () => {
    return (
        <Suspense fallback={<FallbackComponent />}>
            <EmailVerification />
        </Suspense>
    );
};

export default EmailVerificationPage;
