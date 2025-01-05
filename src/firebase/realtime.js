// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
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
const database = getDatabase(app);

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
    }, {
        onlyOnce: true
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

// Example usage
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