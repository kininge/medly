import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADlI79SLsRihEOtFBm7Lc1T4uh-trNX_M",
  authDomain: "income-tax-bc966.firebaseapp.com",
  projectId: "income-tax-bc966",
  storageBucket: "income-tax-bc966.appspot.com",
  messagingSenderId: "571551259977",
  appId: "1:571551259977:web:093e3e5061189bf1f10e98",
  measurementId: "G-44JZY4HS45",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export default getFirestore();
