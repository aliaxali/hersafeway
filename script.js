import { firebaseConfig } from './firebase_credentials.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

// Ensure the script runs after DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const googleLogin = document.getElementById("getStarted");

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
