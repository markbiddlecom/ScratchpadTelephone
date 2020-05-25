import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { connect } from 'react-redux';

import LandingPage from './pages/landing/LandingPage';
import { State, AppState } from './store/state';

import './App.scss';
import 'typeface-roboto';
import Lobby from './pages/lobby/Lobby';

type Props = { appState: AppState };

function App({ appState }: Props) {
  return (
    <React.Fragment>
      <CssBaseline />
      {(appState === AppState.Landing || appState === AppState.Connecting) && (<LandingPage />)}
      {appState === AppState.Lobby && (<Lobby />)}
    </React.Fragment>
  );
}

export default connect(
  (state: State): Props => ({ appState: state.ui.appState })
)(App);
