import React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import firebase from '../../Firebase';
import { useStyles } from './styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const EditDeleteMessage = () => {
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

  const deleteMessage = (props) => {
    let bookName = props.message;

    firebase
      .firestore()
      .collection('messages')
      .where('text', '==', bookName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      });
  };
  const classes = useStyles();
  return (
    <>
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
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'center',
        // }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'center',
        // }}
      >
        <MenuItem onClick={() => openNotes()}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>
            <Button onClick={deleteMessage}>
              {' '}
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              Delete
            </Button>{' '}
          </ListItemText>
        </MenuItem>
      </Menu>
      {/* <Button
        className={classes.deleteButton}
        color={'secondary'}
        variant={'contained'}
        onClick={deleteMessage}
      >
        Delete
      </Button> */}
    </>
  );
};
