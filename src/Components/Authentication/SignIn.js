import React from 'react';
import firebase from '../../Firebase';
import 'firebase/auth';
import { Button } from '@material-ui/core';

export const SignIn = () => {
  const auth = firebase.auth();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <Button
        variant={'contained'}
        className="sign-in"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </Button>
    </>
  );
};
