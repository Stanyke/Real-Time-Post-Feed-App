import React from "react";
import { Box, Card } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";

export default function AuthSidebar(props) {
  const { styles } = props;
  const classes = styles;

  return (
    <Card className={classes.leftSideContainer}>
      <Box className={classes.imageBoxText}>
        <ChatIcon className={classes.chatIcon} />
        <Box>Converse with anyone with any language</Box>
      </Box>
    </Card>
  );
}
