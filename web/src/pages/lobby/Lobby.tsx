import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { connect } from "react-redux";

function Lobby() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
                <Paper>

                </Paper>
            </Grid>
        </Grid>
    );
}

export default connect()(Lobby);
