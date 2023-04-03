
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBE59KgkQz5PbwLaJjhY3XcOhokhr1vgMc",
  authDomain: "trendding-app.firebaseapp.com",
  projectId: "trendding-app",
  storageBucket: "trendding-app.appspot.com",
  messagingSenderId: "419376350565",
  appId: "1:419376350565:web:45a3d0050d9e1843b88d8c",
  measurementId: "G-Y3RNDMBP47"
};

const app = initializeApp(firebaseConfig);
export const initFirebase = () =>{
    return app;
}
// const analytics = getAnalytics(app);