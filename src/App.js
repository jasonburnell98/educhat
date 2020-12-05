import React, { useState } from 'react';
import Spacer from 'react-add-space';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { useDarkMode } from './Components/useDarkMode';
import Toggle from './Components/Toggler';
import { Container, Grid } from '@material-ui/core';
import { SignIn } from './Components/Authentication/SignIn';
import { SignOut } from './Components/Authentication/SignOut';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavBar } from './Navigation/NavBar';
import { ChatRoom } from './Components/ChatComponents/ChatRoom';
import { Rnd } from 'react-rnd';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './Components/globalStyles';
import { lightTheme, darkTheme } from './Components/Themes';
import { CategoryPage } from './Pages/CategoryPage';
import { Messages } from './Pages/Messages';
import { ShowCategories } from './Pages/ShowCategoriesPage';

const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    // <ThemeProvider
    //   // theme={{ themeToggler }}
    //   theme={theme === 'light' ? lightTheme : darkTheme}
    //   //  theme={theme === 'light' ? lightTheme : darkTheme}
    // >
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={themeToggler} />
        {/* <Rnd
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
      >
        Rnd
      </Rnd> */}
        <div className="App">
          <div>
            {user ? (
              <Router>
                <NavBar
                  themeToggler={themeToggler}
                  signOut={<SignOut />}
                />
                <Spacer amount={2} />{' '}
                <Switch>
                  <Route
                    path="/categories"
                    component={CategoryPage}
                  />
                  <Route path="/messages" component={Messages} />
                </Switch>
              </Router>
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
