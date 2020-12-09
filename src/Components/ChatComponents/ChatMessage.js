import React from 'react';
import {
  Button,
  Container,
  Grid,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openNotes = () => {
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const deleteMessage = async (e) => {
    var jobskill_query = firebase
      .firestore()
      .collection('categories')
      .where('text', '==', 'text');
    jobskill_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  };
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
                      {/* <EditDeleteMessage text={text} /> */}
                      <Button
                        size={'small'}
                        onClick={handleClick}
                        // className={classes.avatar}
                      >
                        <MoreHorizIcon />
                      </Button>
                      <Menu
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        className={classes.deleteButton}
                      >
                        <MenuItem onClick={() => openNotes()}>
                          <ListItemIcon>
                            <EditIcon />
                          </ListItemIcon>
                          <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={deleteMessage}>
                          {' '}
                          <ListItemIcon>
                            <DeleteIcon />
                          </ListItemIcon>
                          <ListItemText>Delete</ListItemText>
                        </MenuItem>
                      </Menu>
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
