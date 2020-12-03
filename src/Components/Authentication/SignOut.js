import React from 'react';
import firebase from '../../Firebase';
import LockIcon from '@material-ui/icons/Lock';
import {
  Button,
  Menu,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
export const SignOut = () => {
  const auth = firebase.auth();

  return (
    auth.currentUser && (
      <>
        <div onClick={() => auth.signOut()}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
        </div>
      </>
    )
  );
};
