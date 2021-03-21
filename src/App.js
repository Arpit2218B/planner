import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Toolbar from './components/Toolbar';
import Login from './components/Login';
import firebase from 'firebase';
import { firebaseApp } from './firebase';
import { useState } from 'react';

function App() {

  const loginHandler = () => {
    firebaseApp.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider)
    .then(res => {
        const userName = res.user.displayName;
        const userId = res.user.email;
        localStorage.setItem('userName', userName);
        localStorage.setItem('userId', userId);
        setLoggedIn(true);
    })
    .catch(err => console.log(err));
  }

  const logout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userId') ? true : false)

  return (
    <div className="App">
      {!loggedIn ? <Login loginHandler={loginHandler} /> : (
        <Layout logout={logout}>
          <Toolbar />
          <Dashboard />
        </Layout>
      )}
    </div>
  );
}

export default App;
