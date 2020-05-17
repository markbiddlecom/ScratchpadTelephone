import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { connect } from "react-redux";

type Props = {};

function GameInfo({}: Props) {
    return (
        <Grid container>
            <Grid item xs={10}>
                <TextField />
            </Grid>
            <Grid item xs={2}>
                <Button>Copy</Button>
            </Grid>
        </Grid>
    );
}

export default connect()(GameInfo);
