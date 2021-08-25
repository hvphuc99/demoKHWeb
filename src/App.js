import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDu6sHt-St8UQDvWYTtZR6qTyi7YSmxKJA",
  authDomain: "demokhweb.firebaseapp.com",
  projectId: "demokhweb",
  storageBucket: "demokhweb.appspot.com",
  messagingSenderId: "131478536589",
  appId: "1:131478536589:web:b33bfd66bf16039d523dc4",
  measurementId: "G-478Y9ZG94H",
};

firebase.initializeApp(firebaseConfig);

function App() {
  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log({ result });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default App;
