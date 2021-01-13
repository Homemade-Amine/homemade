import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCOJM2c71LhZJaLVAPbyb8JUw3gpR25XWM',
  authDomain: 'homemade-9ceea.firebaseapp.com',
  databaseURL: 'https://homemade-9ceea.firebaseio.com/',
  projectId: 'homemade-9ceea',
  storageBucket: 'homemade-9ceea.appspot.com',
  messagingSenderId: '504216573446',
  appId: '1:504216573446:ios:e511910a1de304c3f45587',
};

if (!firebase.apps.length) {

  firebase.initializeApp(firebaseConfig);
  //firebase.firestore().enablePersistence();

}

export { firebase };