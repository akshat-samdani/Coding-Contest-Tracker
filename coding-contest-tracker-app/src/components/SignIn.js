import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from 'react-toastify';

function SignIn({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Sign in successful
                toast.success('Successfully signed in!', {
                    autoClose: 2000,
                });
            })
            .catch((error) => {
                console.error('Error signing in:', error);
                let errorMessage = 'An error occurred during sign in.';

                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email address.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password. Please try again.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address format.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage = 'This account has been disabled.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many failed attempts. Please try again later.';
                        break;
                    default:
                        errorMessage = error.message;
                }

                toast.error(errorMessage, {
                    autoClose: 4000,
                });
            });
    };

    const handleForgotPassword = () => {
        if (!email) {
            toast.error('Please enter your email address first.', {
                autoClose: 3000,
            });
            return;
        }

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('Password reset email sent! Check your inbox (and spam folder).', {
                    autoClose: 5000,
                });
            })
            .catch((error) => {
                console.error('Error sending password reset email:', error);
                let errorMessage = 'Failed to send password reset email.';

                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email address.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address format.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many requests. Please try again later.';
                        break;
                    default:
                        errorMessage = error.message;
                }

                toast.error(errorMessage, {
                    autoClose: 4000,
                });
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // The user is signed in, update the state
                setUser(user);
                // Redirect to contests page
                navigate('/contests');
            } else {
                // User is signed out, handle the state accordingly
                setUser(null);
            }
        });

        // Clean up the subscription on component unmount
        return () => unsubscribe();
    }, [setUser, navigate]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
            <form className="p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Password:
                    </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
                </div>
                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign In
                </button>
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        Forgot your password?
                    </button>
                </div>
                <div className="mt-2 text-center">
                    <span className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            Register here
                        </button>
                    </span>
                </div>

            </form>
        </div>
    );
}

export default SignIn;
