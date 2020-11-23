import React from 'react';
import {
  Button,
  Paper,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import firebase from '../../Firebase';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useStyles } from './styles';
import { EditDeleteMessage } from './EditDeleteMessage';

import Avatar from '@material-ui/core/Avatar';

export const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;
  const auth = firebase.auth();

  const messageClass =
    uid === auth.currentUser.uid ? 'sent' : 'received';
  const classes = useStyles();
  return (
    <>
      <div className={`message ${messageClass}`}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs>
              <div className={classes.noteWrap}>
                <div>
                  <Avatar
                    className={classes.avatar}
                    src={
                      photoURL ||
                      'https://api.adorable.io/avatars/23/abott@adorable.png'
                    }
                  />
                  {uid === auth.currentUser.uid ? (
                    <div>
                      <EditDeleteMessage />
                    </div>
                  ) : null}
                </div>
                <div>
                  <p>{text}</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};
