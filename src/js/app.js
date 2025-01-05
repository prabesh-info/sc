// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getDatabase, ref, set, onValue, update, remove } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// User Authentication Functions

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

// Realtime Database Functions

// Write data to the database
function writeData(path, data) {
    set(ref(database, path), data)
        .then(() => {
            console.log('Data written successfully!');
        })
        .catch((error) => {
            console.error('Error writing data: ', error);
        });
}

// Read and listen for changes in the data
function readData(path) {
    const dataRef = ref(database, path);
    onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Data read: ', data);
        // Update your UI or perform other actions with the data
    });
}

// Update data in the database
function updateData(path, updates) {
    update(ref(database, path), updates)
        .then(() => {
            console.log('Data updated successfully!');
        })
        .catch((error) => {
            console.error('Error updating data: ', error);
        });
}

// Delete data from the database
function deleteData(path) {
    remove(ref(database, path))
        .then(() => {
            console.log('Data deleted successfully!');
        })
        .catch((error) => {
            console.error('Error deleting data: ', error);
        });
}

// Example usage (replace with actual form submissions or actions)
// User authentication actions
document.getElementById('signUpBtn').addEventListener('click', () => signUp('test@example.com', 'password123'));
document.getElementById('loginBtn').addEventListener('click', () => login('test@example.com', 'password123'));
document.getElementById('logoutBtn').addEventListener('click', () => logout());

// Realtime database actions
const exampleData = {
    title: "My Travel to Paris",
    description: "I had an amazing time visiting the Eiffel Tower.",
    date: "2024-12-25"
};

// Uncomment to test the functions
// writeData('posts/post1', exampleData);
// readData('posts/post1');
// updateData('posts/post1', { description: "Updated description" });
// deleteData('posts/post1');