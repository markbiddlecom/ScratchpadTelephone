import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import StartGameForm from './pages/landing/StartGameForm';

import './App.scss';
import 'typeface-roboto';

type Spread = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
const BREAK_POINTS: { xs: Spread, sm: Spread, md: Spread } = { xs: 12, sm: 8, md: 7 };

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container justify="center" className="App" spacing={2}>
        <Grid item {...BREAK_POINTS}>
          <Paper variant="outlined">
            <Typography variant="h4" className="hero">
              <span
                className="logo"
                role="img"
                aria-label="Hand with thumb and pinkie splayed imitating a telephone receiver"
              >🤙🏼</span>
              <span>Scratchpad Telephone</span>
            </Typography>
            <Typography variant="body1">
              This is a fun game to play with a group of friends (the more the merrier)! I'll come up with some better
              copy much much later <span role="img" aria-label="grimacing">😬</span>
            </Typography>
          </Paper>
        </Grid>
        <Grid item {...BREAK_POINTS}>
          <Paper elevation={5}>
            <StartGameForm gridSpacing={1} />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
