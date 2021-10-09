import React, { useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";

import { AuthStyle } from "../assets/css/AuthStyle";
import AuthSidebar from "../components/AuthSidebar";
import { useHistory } from "react-router-dom";
import useApp from "../store/contexts/AppContext";

const useStyles = makeStyles((theme) => AuthStyle(theme));
const { REACT_APP_AFTER_LOGIN_REDIRECT_URL } = process.env;

export default function Login() {
  const {
    appState: { username },
    setupUser
  } = useApp();

  const classes = useStyles();
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;

    setupUser({username})
  };

  useEffect(() => {
    if (username) {
      return history.push(REACT_APP_AFTER_LOGIN_REDIRECT_URL);
    }
  }, [username, history]);

  return (
    <Grid container className={classes.homeScreen}>
      <AuthSidebar styles={classes} />

      <Box className={classes.rightSideContainer}>
        <Grid className={classes.formBox}>
          <Box>
            <Typography className={classes.formNotice}>Hello!</Typography>
          </Box>

          <Box>
            <form
              onSubmit={handleLogin}
              className={classes.root}
              noValidate
              autoComplete="off"
            >
              <Box className={classes.inputForm}>
                <FormControl margin="normal" className={classes.inputForm}>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
                <Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className={classes.authBtn}
                  >
                    Login
                  </Button>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
}
