import React, { useRef, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  InputAdornment,
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

export const ChatRoom = (props) => {
  const dummy = useRef();
  // const messagesRef = firestore.collection('messages');
  const [categoryValue, setCategoryValue] = useState('');

  const categoryRef = firestore.collection('categories');
  // console.log(categoryValue);

  const addCategory = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;

    await categoryRef.add({
      text: categoryValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });
    // console.log(query);
    setCategoryValue('');

    // dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  const auth = firebase.auth();

  const messagesRef = firestore
    .collection('categories')
    .doc(props.title)
    .collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const classes = useStyles();
  const [messages] = useCollectionData(query, { idField: 'id' });

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
                <h3>{props.title}</h3>
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
            </form>
            {/* <form onSubmit={addCategory}>
              <div className={classes.noteInput}>
                <Spacer amount={2} />{' '}
                <TextField
                  fullWidth
                  value={categoryValue}
                  onChange={(e) => setCategoryValue(e.target.value)}
                  label={'Enter Category'}
                  variant={'outlined'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {' '}
                        <Button
                          variant={'contained'}
                          color={'primary'}
                          type="submit"
                          disabled={!categoryValue}
                        >
                          <ChatIcon />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </form> */}
          </Grid>
        </div>
      </Container>
      <Spacer />
    </>
  );
};
