import firebase from 'firebase/app';

let config = {
  apiKey: 'AIzaSyBDFS9pE-JQ-40I69nKUcesvqoKnM3vFBw',
  authDomain: 'educhat-7d070.firebaseapp.com',
  databaseURL: 'https://educhat-7d070.firebaseio.com',
  projectId: 'educhat-7d070',
  storageBucket: 'educhat-7d070.appspot.com',
  messagingSenderId: '116732943229',
  appId: '1:116732943229:web:34d9831b4f0e4359088a14',
  measurementId: 'G-F3DCPYK0GV',
};
firebase.initializeApp(config);

export default firebase;
