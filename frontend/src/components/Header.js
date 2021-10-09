import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Modal from "@mui/material/Modal";

import { Grid, FormControl, TextField } from "@material-ui/core";

import useApp from "../store/contexts/AppContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: "12px",

    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontSize: "22px",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Header(props) {
  const { user } = props;
  const { appState: { username }, removeUsername, submitPost } = useApp();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [postSubject, setPostSubject] = React.useState('');
  const [postDescription, setPostDescription] = React.useState('');
  const { REACT_APP_AFTER_LOGIN_REDIRECT_URL, REACT_APP_PLATFORM_NAME } =
    process.env;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = async () => {
    await removeUsername();
  };

  const handlePostSubmission = async (event) => {
    event.preventDefault();
    const data = {subject: postSubject, description: postDescription, username};
    await submitPost(data);
    setPostSubject('');
    setPostDescription('');
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={REACT_APP_AFTER_LOGIN_REDIRECT_URL}
            >
              {REACT_APP_PLATFORM_NAME}
            </Link>
          </Typography>
          <div className={classes.grow} />
          <Button
            style={{
              marginRight: "20px",
              color: "#38d3d8",
              fontWeight: "bold",
            }}
            onClick={handleOpen}
          >
            Create Post
          </Button>
          <Typography>Hi, {user}</Typography>
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
            ></IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5">
            Add A New Post
          </Typography>

          <Box
            id="modal-modal-description"
            style={{ width: "auto" }}
          >
            <form
              onSubmit={handlePostSubmission}
              noValidate
              autoComplete="off"
            >
              <Box style={{ width: "400px" }}>
                <FormControl margin="normal" style={{ width: "400px" }}>
                  <TextField
                    aria-label="subject"
                    label="Subject"
                    name="subject"
                    type="text"
                    value={postSubject}
                    onChange={(e) => setPostSubject(e.target.value)}
                    required
                  />
                </FormControl>

                <FormControl margin="normal" style={{ width: "400px" }}>
                  <TextareaAutosize
                    placeholder="Description"
                    name="description"
                    style={{ width: 400, borderBottom: "1px solid", outline: "none", fontSize: "15px", fontWeight: "normal", maxWidth: 400, minWidth: 400, minHeight: 15, maxHeight: 150, height: 80}}
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                    required
                  />
                </FormControl>
                <Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                  >
                    Submit
                  </Button>
                </Grid>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
