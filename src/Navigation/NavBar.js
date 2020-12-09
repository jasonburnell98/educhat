import React from 'react';
import {
  Button,
  AppBar,
  MenuItem,
  ListItemIcon,
  Popper,
  Grow,
  Paper,
  MenuList,
  ClickAwayListener,
  Toolbar,
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  Slide,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { Link, useLocation } from 'react-router-dom';
import firebase from '../Firebase';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import eduLogoNavBar from '../Images/eduLogoNavBar.svg';
import { useStyles } from './styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import AddCommentIcon from '@material-ui/icons/AddComment';
import LockIcon from '@material-ui/icons/Lock';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const NavBar = (props) => {
  const classes = useStyles();

  const auth = firebase.auth();
  const { uid, photoURL } = auth.currentUser;
  let location = useLocation();
  console.log(location.pathname);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    auth.currentUser && (
      <>
        <div>
          <Dialog
            fullScreen
            open={openDialog}
            onClose={handleCloseDialog}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseDialog}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <List>
              <ListItem button>
                <ListItemText
                  primary="Phone ringtone"
                  secondary="Titania"
                />
              </ListItem>
              <ListItem>
                <h2>Release Notes</h2>
              </ListItem>
              <ListItem>
                <h3>Version 1.0</h3>
              </ListItem>
              <ListItem>
                <h4>What's new with this version?</h4>
              </ListItem>
              <ListItem>
                <ul>
                  <li>Oauth is enabled</li>
                  <li>
                    Access to site is granted only to udel students
                  </li>
                  <li>
                    Ability to create topics with major, discussion,
                    and problem{' '}
                  </li>
                  <li>Ability to delete created topic rooms</li>
                  <li>Change Theme to Dark Mode</li>
                  <li>
                    View Topic Rooms made by yourself and Others
                  </li>
                  <li>
                    Ability to comment on topic rooms and message
                    other users of the site
                  </li>
                </ul>
              </ListItem>
              <ListItem>
                <h4>What to expect with version 2.0</h4>
              </ListItem>
              <ListItem>
                <ul>
                  <li>
                    Alerts when user tries to login with an invalid
                    email address
                  </li>
                  <li>
                    Ability to attach files/images to topic rooms or
                    messages
                    <ul>
                      {' '}
                      <li>
                        Firebase does not explicitly allow files to be
                        added to documents
                      </li>
                      <li>
                        Files must first be added to storage cloud in
                        firebase{' '}
                      </li>
                      <li>file url gets added to document</li>
                    </ul>
                  </li>
                  <li>Fix Dark Mode to work on all components</li>
                  <li>
                    Ability to delete messages contained in a
                    collection
                  </li>
                  <li>
                    More user control and information availability
                    coming soon
                  </li>
                </ul>
              </ListItem>
            </List>
          </Dialog>
        </div>
        <div className={classes.rootS}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                className={classes.leftContent}
              >
                <Link className={classes.navStyle} to="/home">
                  <img alt={''} src={eduLogoNavBar} />
                </Link>
              </Typography>
              <div className={classes.centerContent}>
                <Tooltip title={'Ask Question'}>
                  <Link className={classes.navStyle} to="/home">
                    {location.pathname === '/home' ? (
                      <AddCommentIcon color={'secondary'} />
                    ) : (
                      <AddCommentIcon />
                    )}
                  </Link>
                </Tooltip>
                <Tooltip title={'Select Category'}>
                  <Link className={classes.navStyle} to="/categories">
                    {location.pathname === '/categories' ? (
                      <ListAltIcon color={'secondary'} />
                    ) : (
                      <ListAltIcon />
                    )}
                  </Link>
                </Tooltip>
                {/* 
              <Tooltip title={'Messages'}>
                <Link className={classes.navStyle} to="/messages">
                  <ChatBubbleIcon />
                </Link>
              </Tooltip>
              <Drawer /> */}
              </div>
              <div className={classes.rightContent}>
                <Button
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <Avatar
                    src={
                      photoURL ||
                      'https://api.adorable.io/avatars/23/abott@adorable.png'
                    }
                  />
                </Button>

                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom'
                            ? 'center top'
                            : 'center bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <div onClick={props.themeToggler}>
                              <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                  <Brightness4Icon />
                                </ListItemIcon>
                                <Typography variant={'inherit'}>
                                  {' '}
                                  Change Theme
                                </Typography>
                              </MenuItem>
                            </div>
                            <div onClick={handleClickOpen}>
                              <MenuItem onClick={handleCloseDialog}>
                                <ListItemIcon>
                                  <NewReleasesIcon />
                                </ListItemIcon>
                                <Typography variant={'inherit'}>
                                  {' '}
                                  Release Notes
                                </Typography>
                              </MenuItem>
                            </div>
                            <div onClick={() => auth.signOut()}>
                              <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                  <LockIcon />
                                </ListItemIcon>
                                <Typography variant={'inherit'}>
                                  {' '}
                                  Sign Out
                                </Typography>
                              </MenuItem>
                            </div>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </>
    )
  );
};
