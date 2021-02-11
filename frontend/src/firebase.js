import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyA7XgH7-sCErTfFwPL4yy8HhpnMTm6WFfA",
	authDomain: "study-time-tracker-21b35.firebaseapp.com",
	projectId: "study-time-tracker-21b35",
	storageBucket: "study-time-tracker-21b35.appspot.com",
	messagingSenderId: "598393802794",
	appId: "1:598393802794:web:181963a086150979e0b353",
	measurementId: "G-WR1KHJYL18",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
