import React, { useRef, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  InputAdornment,
  Paper,
  Typography,
} from '@material-ui/core';
import Spacer from 'react-add-space';
import eduLogo from '../../Images/eduLogo.svg';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import ChatIcon from '@material-ui/icons/Chat';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ChatMessage } from './ChatMessage';
import { useStyles } from './styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const firestore = firebase.firestore();

// firebase.initializeApp({
//   apiKey: 'AIzaSyBDFS9pE-JQ-40I69nKUcesvqoKnM3vFBw',
//   authDomain: 'educhat-7d070.firebaseapp.com',
//   databaseURL: 'https://educhat-7d070.firebaseio.com',
//   projectId: 'educhat-7d070',
//   storageBucket: 'educhat-7d070.appspot.com',
//   messagingSenderId: '116732943229',
//   appId: '1:116732943229:web:34d9831b4f0e4359088a14',
//   measurementId: 'G-F3DCPYK0GV',
// });

export const ChatRoom = () => {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const classes = useStyles();
  const [messages] = useCollectionData(query, { idField: 'id' });
  const auth = firebase.auth();

  const [messageValue, setmessageValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: messageValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    console.log(query);
    setmessageValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {' '}
      <Container component="main" maxWidth="md">
        {/* <CssBaseline /> */}
        <div className={classes.border}>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography>Title</Typography>
              </Grid>

              <Grid item xs={12}>
                <div className={classes.notesContainer}>
                  {messages &&
                    messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg} />
                    ))}
                </div>
              </Grid>
              <span ref={dummy}></span>
            </Grid>
          </Box>
          <Grid item xs>
            <form onSubmit={sendMessage}>
              <div className={classes.noteInput}>
                <Spacer amount={2} />{' '}
                <TextField
                  fullWidth
                  value={messageValue}
                  onChange={(e) => setmessageValue(e.target.value)}
                  label={'Enter text here'}
                  variant={'outlined'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {' '}
                        <Button
                          variant={'contained'}
                          color={'primary'}
                          type="submit"
                          disabled={!messageValue}
                        >
                          <ChatIcon />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {/* <Grid item xs={4}>
            <div>
              <Button
                variant={'contained'}
                color={'primary'}
                type="submit"
                disabled={!messageValue}
              >
                <ChatIcon />
              </Button>
            </div>
          </Grid> */}
            </form>
          </Grid>
        </div>
      </Container>
      <div className={classes.logo}>
        <img src={eduLogo} />
      </div>
    </>
  );
};
