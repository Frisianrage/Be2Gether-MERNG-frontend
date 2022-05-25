import { initializeApp } from "firebase/app";
import { getStorage, getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export {getDownloadURL,storage, ref, uploadBytesResumable, deleteObject};
