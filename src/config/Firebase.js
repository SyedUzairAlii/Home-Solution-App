import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBqM-2mB52Iu8PZAAgPV3WV0bORrEJjuzo",
  authDomain: "reactnative-redux-auth.firebaseapp.com",
  databaseURL: "https://reactnative-redux-auth.firebaseio.com",
  projectId: "reactnative-redux-auth",
  storageBucket: "reactnative-redux-auth.appspot.com",
  messagingSenderId: "603901528269"
};
  firebase.initializeApp(config);
  export default firebase