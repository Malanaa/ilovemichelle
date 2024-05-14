import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCGWGw_qB26yYjAqGaHaHXEkcdjthPVhg",
    authDomain: "ilovemichelle-bc1ee.firebaseapp.com",
    projectId: "ilovemichelle-bc1ee",
    storageBucket: "ilovemichelle-bc1ee.appspot.com",
    messagingSenderId: "580373247002",
    appId: "1:580373247002:web:21e49d4acb6743c6220da3",
    measurementId: "G-HW06JFL0YX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the database service
const database = firebase.database();
