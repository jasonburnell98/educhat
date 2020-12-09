import React from 'react';
import CategoryIcon from '@material-ui/icons/Category';
import CloseIcon from '@material-ui/icons/Close';
import {
  Container,
  Grid,
  Typography,
  List,
  Divider,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import firebase from '../../Firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useStyles } from './styles';
import { ChatRoom } from '../ChatComponents/ChatRoom';

import Spacer from 'react-add-space';

export const ShowCategories = (props) => {
  const { text, major, title, uid } = props.category;
  const auth = firebase.auth();

  const messageClass =
    uid === auth.currentUser.uid ? 'sent' : 'received';
  const classes = useStyles();
  const [openD, setOpenD] = React.useState(false);

  const handleClickOpenD = (props) => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };
  const deleteCategory = async (e) => {
    var jobskill_query = firebase
      .firestore()
      .collection('categories')
      .where('text', '==', text);
    jobskill_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  };

  return (
    <>
      <div>
        {' '}
        <Dialog
          open={openD}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseD}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'Confirm Changes'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete this collection? You
              will not be able to recover any of the contents.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseD} color="primary">
              No, Cancel
            </Button>
            <Button onClick={deleteCategory} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Spacer />{' '}
      <Container>
        <div className={`message ${messageClass}`}>
          <>
            <div className={classes.root}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Grid item xs={6}>
                        <CategoryIcon />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={classes.heading}>
                          <strong> {major}</strong> major with
                          question: <i>{title}</i>{' '}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      {uid === auth.currentUser.uid ? (
                        <div className={classes.closeIcon}>
                          <IconButton
                            color={'primary'}
                            className={classes.closeIcon}
                            // onClick={handleClickOpenD}
                          >
                            {' '}
                            <Tooltip title={'Delete'}>
                              <CloseIcon onClick={handleClickOpenD} />
                            </Tooltip>
                          </IconButton>
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <ChatRoom title={text} />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
          </>
        </div>
      </Container>
    </>
  );
};
