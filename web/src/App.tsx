import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { connect } from 'react-redux';

import LandingPage from './pages/landing/LandingPage';
import { joinGame } from "./store/appActions";
import { State, AppState, GameId } from './store/state';

import './App.scss';
import 'typeface-roboto';
import Lobby from './pages/lobby/Lobby';

type StateProps = {
  appState: AppState,
  gameToken: GameId | undefined ,
};

type ActionProps = {
  joinGame: (token: GameId) => void,
};

type Props = StateProps & ActionProps;

class App extends React.Component<Props> {
  componentDidMount() {
    if (this.props.appState === AppState.Landing && window.location.search) {
      this.props.joinGame(window.location.search.replace(/^\?/, ""));
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.gameToken !== prevProps.gameToken) {
      if (this.props.gameToken) {
        window.history.pushState(null, "Scratchpad Telephone: Play!", `?${this.props.gameToken}`);
      } else {
        window.history.pushState(null, "Scratchpad Telephone", "/");
      }
    }
  }

  render() {
    return (<React.Fragment>
      <CssBaseline />
      {(this.props.appState === AppState.Landing
          || this.props.appState === AppState.Connecting) && (<LandingPage />)}
      {(this.props.appState === AppState.Lobby
          || this.props.appState === AppState.LobbyDrawing) && (<Lobby />)}
    </React.Fragment>);
  }
}

export default connect(
  (state: State): StateProps => ({
    appState: state.ui.appState,
    gameToken: state.game?.data.token,
  }),
  { joinGame }
)(App);
