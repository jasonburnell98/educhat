import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import Spacer from 'react-add-space';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import ChatIcon from '@material-ui/icons/Chat';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ChatMessage } from './ChatMessage';
import { useStyles } from './styles';
import CloseIcon from '@material-ui/icons/Close';
const firestore = firebase.firestore();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ChatRoom = (props) => {
  // const dummy = useRef();
  // const [categoryValue, setCategoryValue] = useState('');

  // const categoryRef = firestore.collection('categories');

  // const addCategory = async (e) => {
  //   e.preventDefault();

  //   await categoryRef.add({
  //     text: categoryValue,
  //     createdAt: new Date(),
  //     uid,
  //   });
  //   // console.log(query);
  //   setCategoryValue('');

  //   // dummy.current.scrollIntoView({ behavior: 'smooth' });
  // };

  const auth = firebase.auth();
  // const uid = auth.currentUse
  const uid = auth.currentUser;
  const messagesRef = firestore
    .collection('categories')
    .doc(props.title)
    .collection('messages');
  const query = messagesRef.orderBy('createdAt');

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
    // dummy.current.scrollIntoView({ behavior: 'smooth' });
  };
  console.log(messageValue);

  // const deleteCategory = async (e) => {
  //   var jobskill_query = firebase
  //     .firestore()
  //     .collection('categories')
  //     .where('text', '==', props.title);
  //   jobskill_query.get().then(function (querySnapshot) {
  //     querySnapshot.forEach(function (doc) {
  //       doc.ref.delete();
  //     });
  //   });
  // };

  // const deleteMessage = async (e) => {
  //   var jobskill_kill = firebase
  //     .firestore()
  //     .colection('categories')
  //     .where('text', '==', props.title)
  //     .collecton(messages);
  // };
  // const deleteMessage = async (e) => {
  //   var jobskill_query = firebase
  //     .firestore()
  //     .collection('categories')
  //     .doc(props.title)
  //     .collection('messages')
  //     .where(
  //       'text',
  //       '==',
  //       messages.forEach((msg) => msg.idField),
  //     );
  //   jobskill_query.get().then(function (querySnapshot) {
  //     querySnapshot.forEach(function (doc) {
  //       doc.ref.delete();
  //     });
  //   });
  // };
  // const [categoryMenu, setCategoryMenu] = useState(null);
  // // const open = Boolean(categoryMenu);

  // const handleClick = (event) => {
  //   setCategoryMenu(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setCategoryMenu(null);
  // };

  const [openD, setOpenD] = React.useState(false);

  const handleClickOpenD = (props) => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };
  const categoryClass =
    uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div></div>{' '}
      <Container component="main" maxWidth="md">
        <div className={classes.border}>
          {' '}
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h2>
                  <div className={classes.categoryAv}>
                    <Avatar
                      src={
                        props.avatar ||
                        'https://api.adorable.io/avatars/23/abott@adorable.png'
                      }
                    />
                  </div>
                  {props.title}{' '}
                </h2>
              </Grid>
              <Grid item xs={12}></Grid>

              <Grid item xs={12}>
                <div className={classes.notesContainer}>
                  {messages &&
                    messages.map((msg) => (
                      <>
                        <ChatMessage key={msg.id} message={msg} />
                      </>
                    ))}
                </div>
              </Grid>
              {/* <span ref={dummy}></span> */}
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
