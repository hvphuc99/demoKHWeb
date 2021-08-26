import "./App.css";
import "antd/dist/antd.css";
import { Button } from "antd";
import { useEffect, useState } from "react";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedInLocalStorage = localStorage.getItem("loggedIn");
    setLoggedIn(loggedInLocalStorage);

    const userDataLocalStorage = localStorage.getItem("userData");
    const userDataParse = userDataLocalStorage
      ? JSON.parse(userDataLocalStorage)
      : null;
    setUserData(userDataParse);
  }, []);

  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { user } = result;
        setLoggedIn(true);
        setUserData(user);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userData", JSON.stringify(user));
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setUserData(null);
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userData");
      })
      .catch((error) => console.log({ error }));
  };

  return (
    <div className="app-container">
      {!loggedIn && (
        <Button onClick={handleSignIn} type="primary">
          Sign in with Google
        </Button>
      )}
      {loggedIn && (
        <div className="user-info">
          <p>{`Name: ${userData?.displayName || ""}`}</p>
          <p>{`Email: ${userData?.email || ""}`}</p>
          <Button onClick={handleSignOut} type="primary" danger>
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
