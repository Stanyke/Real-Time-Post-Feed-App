import React, { useEffect, useState } from "react";
import { Box, Typography, Button, FormControl } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import WaitForPageLoad from "../components/WaitForPageLoad";
import Header from "../components/Header";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import useApp from "../store/contexts/AppContext";
import { Modal } from "react-bootstrap";
import Comment from "../components/Comment";

const styles = {
  postContainer: {
    width: "100%",
    padding: "0px 20px 50px",
    margin: "50px 0px 100px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "30px",
    textAlign: "center",
  },
  description: {
    textAlign: "left",
  },
  highlight: {
    color: "tomato",
  },
  commentsContainer: {
    padding: "10px 20px",
    maxHeight: "250px",
    maxWidth: "100%",
    boxShadow: "5px 7px 8px tomato",
    overflow: "auto",
  },
};

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

export default function ViewPost(props) {
  const {
    appState: { username, isLoading },
    getPostById,
    submitComment,
    socket,
    editPostComment,
    deletePostComment,
  } = useApp();
  const history = useHistory();
  const postId = props.match.params.postId;
  const [postData, setPostData] = useState({});
  const [newComment, setNewComment] = useState("");
  const [newCommentToReply, setNewCommentToReply] = useState("");

  const [selectedComment, setSelectedComment] = useState({});
  const [newValueOfSelectedComment, setNewValueOfSelectedComment] =
    useState("");

  const [openEditCommentModel, setEditCommentModel] = useState(false);
  const [openReplyCommentModel, setReplyCommentModel] = useState(false);

  const handleCommentSubmission = async (event) => {
    event.preventDefault();

    const data = { username, message: newComment, postId };
    const postAndAllComments = await submitComment(data);
    setNewComment("");
    postAndAllComments && setPostData(postAndAllComments);
  };

  const submitEditedPostComment = async (event) => {
    event.preventDefault();
    const data = {
      postId,
      commentId: selectedComment._id,
      message: newValueOfSelectedComment,
    };
    const postAndAllComments = await editPostComment(data);
    postAndAllComments && setPostData(postAndAllComments);
    setSelectedComment({});
    setNewValueOfSelectedComment("");
    setEditCommentModel(false);
  };

  const submitRepliedPostComment = async (event) => {
    event.preventDefault();
    const data = {
      postId,
      username,
      parentId: selectedComment._id,
      message: newCommentToReply,
    };

    const postAndAllComments = await submitComment(data);
    postAndAllComments && setPostData(postAndAllComments);
    setSelectedComment({});
    setNewCommentToReply("");
    setReplyCommentModel(false);
  };

  const handleCommentDelete = async (comment) => {
    const data = { postId, commentId: comment._id };
    const postAndAllComments = await deletePostComment(data);
    postAndAllComments && setPostData(postAndAllComments);
  };

  const handleCommentEdit = async (comment, status) => {
    if (status) {
      setSelectedComment(comment);
      setNewValueOfSelectedComment(comment.message);
      setEditCommentModel(true);
    } else {
      setSelectedComment({});
      setNewValueOfSelectedComment("");
      setEditCommentModel(false);
    }
  };

  const handleCommentReply = async (comment, status) => {
    if (status) {
      setSelectedComment(comment);
      setReplyCommentModel(true);
    } else {
      setSelectedComment({});
      setReplyCommentModel(false);
    }
  };

  useEffect(() => {
    if (!username) {
      return history.push(process.env.REACT_APP_BEFORE_LOGIN_REDIRECT_URL);
    }

    async function fetchData() {
      const postInfo = await getPostById(postId);
      postInfo && setPostData(postInfo);
    }

    fetchData();

    return () => {
      fetchData = null;
    };
  }, []);

  useEffect(() => {
    socket.on("receivePostAndAllComments", async (data) => {
      if (data._id.toString() === postId.toString()) {
        setPostData(data);
      }
    });
  }, []);

  if (!isLoading) {
    return <WaitForPageLoad />;
  } else {
    return (
      <>
        <Header user={username} />
        <Box className="container">
          <Paper style={styles.postContainer}>
            <Typography style={styles.title}>{postData.subject}</Typography>

            <Typography style={styles.description}>
              <b style={styles.highlight}>Description:</b>{" "}
              {postData.description}
            </Typography>
            <br />
            <br />

            <Typography style={styles.description}>
              <span>
                <b style={styles.highlight}>
                  <u>Post Comments</u>
                </b>
              </span>
            </Typography>

            <Box style={styles.commentsContainer}>
              {postData?.comments?.length
                ? postData?.comments?.map((comment) => {
                    return (
                      <div
                        key={comment._id}
                        style={{
                          border: "1px solid #333",
                          marginBottom: "5px",
                          padding: "10px 5px",
                        }}
                      >
                        <Comment
                          comment={comment}
                          handleCommentEdit={handleCommentEdit}
                          handleCommentReply={handleCommentReply}
                          handleCommentDelete={handleCommentDelete}
                        />
                        {comment.comments?.length
                          ? comment.comments?.map((subComment1) => {
                              return (
                                <div
                                  key={subComment1._id}
                                  style={{
                                    border: "1px solid #333",
                                    marginBottom: "5px",
                                    padding: "10px 5px",
                                    background: "rgb(248 248 248)",
                                  }}
                                >
                                  <Comment
                                    comment={subComment1}
                                    handleCommentEdit={handleCommentEdit}
                                    handleCommentReply={handleCommentReply}
                                    handleCommentDelete={handleCommentDelete}
                                  />

                                  {subComment1.comments?.length
                                    ? subComment1.comments?.map(
                                        (subComment2) => {
                                          return (
                                            <div
                                              key={subComment2._id}
                                              style={{
                                                border: "1px solid #333",
                                                marginBottom: "5px",
                                                padding: "10px 5px",
                                                background: "#e6e6e6",
                                              }}
                                            >
                                              <Comment
                                                comment={subComment2}
                                                handleCommentEdit={
                                                  handleCommentEdit
                                                }
                                                handleCommentReply={
                                                  handleCommentReply
                                                }
                                                handleCommentDelete={
                                                  handleCommentDelete
                                                }
                                                noMoreComments={true}
                                              />
                                            </div>
                                          );
                                        }
                                      )
                                    : null}
                                </div>
                              );
                            })
                          : null}
                      </div>
                    );
                  })
                : "No comments available"}
            </Box>

            <Box id="modal-modal-description" style={{ width: "auto" }}>
              <form
                onSubmit={handleCommentSubmission}
                noValidate
                autoComplete="off"
              >
                <Box style={{ width: "400px", marginTop: "50px" }}>
                  <FormControl margin="normal" style={{ width: "400px" }}>
                    <TextareaAutosize
                      placeholder="Write your comment..."
                      name="comment"
                      style={{
                        width: 400,
                        borderBottom: "1px solid",
                        outline: "none",
                        fontSize: "15px",
                        fontWeight: "normal",
                        maxWidth: 400,
                        minWidth: 400,
                        minHeight: 15,
                        maxHeight: 150,
                        height: 80,
                        overflow: "auto",
                      }}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                    />
                  </FormControl>
                  <Grid>
                    <Button type="submit" variant="contained" size="large">
                      Submit
                    </Button>
                  </Grid>
                </Box>
              </form>
            </Box>
          </Paper>

          <Modal
            show={openEditCommentModel}
            onHide={() => handleCommentEdit({}, false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Comment
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Box id="modal-modal-description" style={{ width: "auto" }}>
                <form
                  onSubmit={submitEditedPostComment}
                  noValidate
                  autoComplete="off"
                >
                  <Box style={{ width: "100%" }}>
                    <FormControl margin="normal" style={{ width: "100%" }}>
                      <textarea
                        placeholder="Description"
                        name="description"
                        style={{
                          borderBottom: "1px solid",
                          outline: "none",
                          fontSize: "15px",
                          fontWeight: "normal",
                          minHeight: 15,
                          maxHeight: 150,
                          height: 80,
                          overflow: "auto",
                          padding: 10
                        }}
                        value={newValueOfSelectedComment}
                        onChange={(e) =>
                          setNewValueOfSelectedComment(e.target.value)
                        }
                        required
                      />
                    </FormControl>
                    <Grid>
                      <Button type="submit" variant="contained" size="large">
                        Save Comment
                      </Button>
                    </Grid>
                  </Box>
                </form>
              </Box>
            </Modal.Body>
          </Modal>


          <Modal
            show={openReplyCommentModel}
            onHide={() => handleCommentReply({}, false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
              Reply Comment
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Box id="modal-modal-description" style={{ width: "auto" }}>
                <form
                  onSubmit={submitRepliedPostComment}
                  noValidate
                  autoComplete="off"
                >
                  <Box style={{ width: "100%" }}>
                    <FormControl margin="normal" style={{ width: "100%" }}>
                      <textarea
                        placeholder="Reply comment..."
                        name="comment"
                        style={{
                          borderBottom: "1px solid",
                          outline: "none",
                          fontSize: "15px",
                          fontWeight: "normal",
                          minHeight: 15,
                          maxHeight: 150,
                          height: 80,
                          overflow: "auto",
                          padding: 10
                        }}
                        value={newCommentToReply}
                        onChange={(e) => setNewCommentToReply(e.target.value)}
                        required
                      />
                    </FormControl>
                    <Grid>
                      <Button type="submit" variant="contained" size="large">
                        Reply
                      </Button>
                    </Grid>
                  </Box>
                </form>
              </Box>
            </Modal.Body>
          </Modal>
          
        </Box>
      </>
    );
  }
}
