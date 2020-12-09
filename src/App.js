import React from 'react';
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
import { useDarkMode } from './Components/utils/useDarkMode';
import Toggle from './Components/utils/Toggler';
import { SignIn } from './Components/Authentication/SignIn';
import { SignOut } from './Components/Authentication/SignOut';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavBar } from './Navigation/NavBar';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './Components/globalStyles';
import { lightTheme, darkTheme } from './Components/utils/Themes';
import { CategoryPage } from './Pages/CategoryPage';
import { Messages } from './Pages/Messages';
import AddNewTopic from './Pages/AddNewTopic';
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={themeToggler} />

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
                  <Route path="/home" component={AddNewTopic} />
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
