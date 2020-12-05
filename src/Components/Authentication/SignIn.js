import React from 'react';
import firebase from '../../Firebase';
import 'firebase/auth';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import eduLogo from '../../Images/eduLogo.svg';
import { useStyles } from './styles';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        EduChat
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const SignIn = () => {
  const classes = useStyles();
  const auth = firebase.auth();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    console.log(provider);
  };
  const [checked, setChecked] = React.useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Slide
            direction="up"
            in={!checked}
            mountOnEnter
            unmountOnExit
          >
            <Paper elevation={4} className={classes.paper}>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  <img alt={''} src={eduLogo} />
                  <p>Together We Can.</p>
                </Typography>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={signInWithGoogle}
                >
                  Sign in with Google
                </Button>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Paper>
          </Slide>
        </div>
      </div>
    </Container>
  );
};
