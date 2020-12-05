import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {
  Button,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Popper,
  Grow,
  Paper,
  MenuList,
  ClickAwayListener,
  Toolbar,
} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import eduLogo from '../Images/eduLogo.svg';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Drawer } from '../Components/Drawer';
import AddCommentIcon from '@material-ui/icons/AddComment';
// import logo from '../logo.svg';

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     },
//   }),
// );

export const NavBar = (props) => {
  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;
  // const openNotes = () => {
  //   handleClose();
  // };
  const auth = firebase.auth();

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
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.leftContent}>
              <img alt={''} src={eduLogo} />
            </Typography>
            <div className={classes.centerContent}>
              <Tooltip title={'Add New'}>
                <Link className={classes.navStyle} to="/addNew">
                  <AddCommentIcon />
                </Link>
              </Tooltip>
              <Tooltip title={'Select Category'}>
                <Link className={classes.navStyle} to="/categories">
                  <ListAltIcon />
                </Link>
              </Tooltip>

              <Tooltip title={'Messages'}>
                <Link className={classes.navStyle} to="/messages">
                  <ChatBubbleIcon />
                </Link>
              </Tooltip>
              <Drawer />
            </div>
            <div className={classes.rightContent}>
              <Tooltip title={'Menu'}>
                <Button
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <MenuIcon />
                </Button>
              </Tooltip>
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
                          <MenuItem onClick={handleClose}>
                            <Tooltip title={'Change Theme'}>
                              <ListItemIcon
                                onClick={props.themeToggler}
                              >
                                <Brightness4Icon />
                              </ListItemIcon>
                            </Tooltip>
                          </MenuItem>

                          <MenuItem onClick={handleClose}>
                            <Tooltip title={'Sign Out'}>
                              <ListItemText>
                                {props.signOut}
                              </ListItemText>
                            </Tooltip>
                          </MenuItem>
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
