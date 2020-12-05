import React from 'react';
import { Container, Grid, Tooltip } from '@material-ui/core';
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
          {uid === auth.currentUser.uid ? (
            <div className={classes.currUser}>
              <Grid container spacing={3}>
                <Grid item xs={11}>
                  <div className={classes.currUserWrap}>
                    <Grid item xs={1} direction={'column-reverse'}>
                      <EditDeleteMessage text={text} />
                    </Grid>
                    <Grid item xs={11}>
                      {text}
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <div>
                    <Tooltip title={auth.currentUser.displayName}>
                      <Avatar
                        src={
                          photoURL ||
                          'https://api.adorable.io/avatars/23/abott@adorable.png'
                        }
                      />
                    </Tooltip>
                  </div>
                </Grid>
              </Grid>
            </div>
          ) : (
            <div className={classes.otherUser}>
              <Grid container spacing={3}>
                <Grid item xs={1}>
                  <div className={classes.avatar}>
                    <Tooltip title={auth.currentUser.displayName}>
                      <Avatar
                        src={
                          photoURL ||
                          'https://api.adorable.io/avatars/23/abott@adorable.png'
                        }
                      />
                    </Tooltip>
                  </div>
                </Grid>
                <Grid item xs={11}>
                  <div className={classes.nonCurrUserWrap}>
                    <div>
                      <p>{text}</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};
