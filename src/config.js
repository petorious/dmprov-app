import firebase from 'firebase';

const config= {
  firebase_config: {
    apiKey: "AIzaSyDWHwb236t0NzjIN3QOLhQMj346uw9d0gw",
    authDomain: "dmprov-app.firebaseapp.com",
    databaseURL: "https://dmprov-app.firebaseio.com",
    projectId: "dmprov-app",
    storageBucket: "dmprov-app.appspot.com",
    messagingSenderId: "634669046793"
  },
  firebase_providers: [
    firebase.auth.GoogleAuthProvider,
    firebase.auth.FacebookAuthProvider,
    firebase.auth.TwitterAuthProvider,
    firebase.auth.GithubAuthProvider,
    firebase.auth.EmailAuthProvider,
    firebase.auth.PhoneAuthProvider
  ],
  initial_state: {
    theme: 'dark',
    locale: 'en'
  },
  drawer_width: 256
}

export default config;
