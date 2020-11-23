import React from 'react';
import { Button } from '@material-ui/core';
import firebase from '../../Firebase';

export const SignOut = () => {
  const auth = firebase.auth();

  return (
    auth.currentUser && (
      <Button variant={'contained'} onClick={() => auth.signOut()}>
        Sign Out{' '}
      </Button>
    )
  );
};
