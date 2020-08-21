import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC60TciV4lzmJ5lzNCAkjzCsWjVu3CFxF0",
  authDomain: "my-react-games.firebaseapp.com",
  databaseURL: "https://my-react-games.firebaseio.com",
  projectId: "my-react-games",
  storageBucket: "my-react-games.appspot.com",
  messagingSenderId: "722040023847",
  appId: "1:722040023847:web:49f7db87375c0f38691702",
  measurementId: "G-CGY3PPQ71Z",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("app"));
