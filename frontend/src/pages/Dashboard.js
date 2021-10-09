import React, { useEffect } from "react";
import {
  Box,
  makeStyles,
} from "@material-ui/core";
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router-dom";
import WaitForPageLoad from "../components/WaitForPageLoad";
import Header from "../components/Header";
import CustomizedTables from "../components/CustomizedTable";

import { DashboardStyle } from "../assets/css/DashboardStyle";
import useApp from "../store/contexts/AppContext";

const useStyles = makeStyles((theme) => DashboardStyle(theme));

export default function Dashboard() {
  const {
    appState: { username, isLoading, posts },
  } = useApp();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!username) {
      return history.push(process.env.REACT_APP_BEFORE_LOGIN_REDIRECT_URL);
    }

  }, [username, posts, history]);

  if (!isLoading) {
    return <WaitForPageLoad />;
  } else {
    return (
      <>
        <Header user={username} />
        <Box className={classes.root}>
          <Box className="container">
            {Object.values(posts).length ? <CustomizedTables /> : 
            <Paper>
              <b>No Posts Available</b>
            </Paper>
            }
          </Box>
        </Box>
      </>
    );
  }
}
