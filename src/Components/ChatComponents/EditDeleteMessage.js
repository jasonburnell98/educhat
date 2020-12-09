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
import firebase from '../../Firebase';
import { useStyles } from './styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const EditDeleteMessage = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const { text, major, createdAt } = props.category;

  // const auth = firebase.auth();

  // const { uid, photoURL, text } = auth.currentUser;
  // console.log(text);

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

  const classes = useStyles();
  return (
    <>
      <div></div>
      {/* <Button
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
      </Menu> */}
    </>
  );
};
