import firebase from 'firebase';

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyCsBgxvvN9KhfyaIxt25kHE8dcrn1-FGyw",
    authDomain: "demosignature-bea97.firebaseapp.com",
    databaseURL: "https://demosignature-bea97.firebaseio.com",
    projectId: "demosignature-bea97",
    storageBucket: "demosignature-bea97.appspot.com",
    messagingSenderId: "540261634959",
    appId: "1:540261634959:web:cea9a7abd4dc175a5071fa",
    measurementId: "G-BH6DV0M4DF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;