// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign up function
async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);
        // Redirect to home page or perform other actions
    } catch (error) {
        console.error('Error signing up:', error.message);
        alert(error.message);
    }
}

// Login function
async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        // Redirect to home page or perform other actions
    } catch (error) {
        console.error('Error logging in:', error.message);
        alert(error.message);
    }
}

// Logout function
async function logout() {
    try {
        await signOut(auth);
        console.log('User logged out');
        // Redirect to login page or perform other actions
    } catch (error) {
        console.error('Error logging out:', error.message);
        alert(error.message);
    }
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in:', user);
        // User is signed in, perform actions accordingly
    } else {
        console.log('No user signed in');
        // No user is signed in, redirect to login page or perform other actions
    }
});

// Example usage (replace with actual form submissions)
document.getElementById('signUpBtn').addEventListener('click', () => signUp('test@example.com', 'password123'));
document.getElementById('loginBtn').addEventListener('click', () => login('test@example.com', 'password123'));
document.getElementById('logoutBtn').addEventListener('click', () => logout());