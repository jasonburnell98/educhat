import React from 'react';
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
  ListItemText,
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
  const { text, uid } = props.category;
  const auth = firebase.auth();

  const messageClass =
    uid === auth.currentUser.uid ? 'sent' : 'received';
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
          (text, index) => (
            <ListItem button key={text}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ),
        )}
      </List>
      <Divider />
      {/* <List>
        <div className={`message ${messageClass}`}>
          {uid === auth.currentUser.uid ? <div>{text}</div> : null}
        </div>
      </List> */}
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );
  return (
    <>
      {/* <div> */}
      {/* {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>
              {anchor}
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div> */}

      <Spacer />
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
                  <Typography className={classes.heading}>
                    {text}
                  </Typography>
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
