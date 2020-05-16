import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import './App.css';
import 'typeface-roboto';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container justify="center">
        <Grid item xs={8}>
          <Typography variant="h1">Scratchpad <span role="img" aria-label="phone">📞</span> Telephone</Typography>
          <Typography variant="body1">
            This is a fun game to play with a group of friends (the more the merrier)! I'll come up with some better
            copy much much later <span role="img" aria-label="grimacing">😬</span>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
