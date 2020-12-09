import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {
  Button,
  MenuItem,
  ListItemIcon,
  Popper,
  Grow,
  Paper,
  MenuList,
  ClickAwayListener,
  Toolbar,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import { Link, useLocation } from 'react-router-dom';
import firebase from '../Firebase';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import eduLogo from '../Images/eduLogo.svg';
import { useStyles } from './styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import AddCommentIcon from '@material-ui/icons/AddComment';
import LockIcon from '@material-ui/icons/Lock';

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

  return (
    auth.currentUser && (
      <div className={classes.rootS}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.leftContent}>
              <Link className={classes.navStyle} to="/home">
                <img alt={''} src={eduLogo} />
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
    )
  );
};
