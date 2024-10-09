
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYoEopUEd7ltImNOFkbmgvKQvBIe4GUaU",
    authDomain: "tkride-26796.firebaseapp.com",
    projectId: "tkride-26796",
    storageBucket: "tkride-26796.appspot.com",
    messagingSenderId: "798862558442",
    appId: "1:798862558442:web:b8ba92fa8690040d004393"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};

  
  
  