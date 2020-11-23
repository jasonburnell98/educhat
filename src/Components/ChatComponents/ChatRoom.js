import React, { useRef, useState } from 'react';
import { Button, TextField, Grid, Box } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ChatMessage } from './ChatMessage';
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

  const [messages] = useCollectionData(query, { idField: 'id' });
  const auth = firebase.auth();

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    console.log(query);
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Box>
        <Grid>
          <Grid item>
            {messages &&
              messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
          </Grid>
          <span ref={dummy}></span>
        </Grid>
      </Box>
      <form onSubmit={sendMessage}>
        <Grid item>
          <TextField
            fullWidth
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            label={'Enter text here'}
            variant={'outlined'}
          />
        </Grid>
        <Button
          variant={'contained'}
          color={'primary'}
          type="submit"
          disabled={!formValue}
        >
          Send Message
        </Button>
      </form>
    </>
  );
};
