import React from 'react';

import './App.css';
import firebase from './Firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { SignIn } from './Components/Authentication/SignIn';
import { SignOut } from './Components/Authentication/SignOut';

import { useAuthState } from 'react-firebase-hooks/auth';
import { NavBar } from './Navigation/NavBar';
import { ChatRoom } from './Components/ChatComponents/ChatRoom';

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <NavBar signOut={<SignOut />} />
      <div className="App">
        <section>{user ? <ChatRoom /> : <SignIn />}</section>
      </div>
    </>
  );
}

export default App;
