// Import Firebase SDKs
import { firebaseConfig } from '../firebase_credentials.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword ,
    signInWithPopup, GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = "en";

const provider = new GoogleAuthProvider();

// Ensure the script runs after DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const googleLogin = document.getElementById("google_btn");

  if (googleLogin) {
    googleLogin.addEventListener("click", function () {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log("User signed in:", user);

          // Save user details to localStorage
          localStorage.setItem("user", JSON.stringify({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
          }));

          // Redirect to logged page after successful login
          window.location.href = "/logged.html";
        })
        .catch((error) => {
          console.error("Error signing in:", error.message);
        });
    });
  } else {
    console.error("getStarted button not found.");
  }
});

// Ensure DOM is loaded before accessing elements
document.addEventListener("DOMContentLoaded", function () {
    
    // **SIGNUP FUNCTIONALITY**
    const signup_btn = document.getElementById("signup_btn");
    if (signup_btn) {
        signup_btn.addEventListener("click", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Account Created Successfully!");
                    console.log("User created:", userCredential.user);
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                    console.error("Signup Error Code:", error.code);
                });
        });
    }

    // **LOGIN FUNCTIONALITY**
    const login_btn = document.getElementById("login_btn");
    if (login_btn) {
        login_btn.addEventListener("click", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    alert("Login Successful!");
                    console.log("Logged in user:", userCredential.user);
                    // Redirect user to dashboard or homepage
                    window.location.href = "/home.html"; 
                })
                .catch((error) => {
                    alert("Login Failed: " + error.message);
                    console.error("Login Error Code:", error.code);
                });
        });
    }

});
