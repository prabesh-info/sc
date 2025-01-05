// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

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
const db = getFirestore(app);

// Add a new document to a collection
async function addPost(collectionName, postData) {
    try {
        const docRef = await addDoc(collection(db, collectionName), postData);
        console.log('Document written with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
}

// Get all documents from a collection
async function getPosts(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
}

// Update a document in a collection
async function updatePost(collectionName, docId, updatedData) {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, updatedData);
        console.log('Document updated with ID: ', docId);
    } catch (error) {
        console.error('Error updating document: ', error);
    }
}

// Delete a document from a collection
async function deletePost(collectionName, docId) {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        console.log('Document deleted with ID: ', docId);
    } catch (error) {
        console.error('Error deleting document: ', error);
    }
}

// Example usage
const examplePost = {
    title: "My Travel to Paris",
    description: "I had an amazing time visiting the Eiffel Tower.",
    date: "2024-12-25"
};

// Uncomment to test the functions
// addPost('posts', examplePost);
// getPosts('posts');
// updatePost('posts', 'DOCUMENT_ID', { description: "Updated description" });
// deletePost('posts', 'DOCUMENT_ID');