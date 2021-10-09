import React from "react";
import { Box } from "@material-ui/core";

export default function Comment({comment, handleCommentEdit, handleCommentReply, handleCommentDelete, noMoreComments}) {
  return (
    <>
      <Box>
        <Box style={{ fontSize: "12px" }}>{comment.username}</Box>
        <Box
          style={{
            fontFamily: "Helvetica Arial",
            fontSize: "15px",
            marginLeft: "5px",
            paddingTop: "10px",
          }}
        >
          {comment.message}{" "}
        </Box>
        <Box
          style={{
            fontSize: "10px",
            fontWeight: "bold",
            padding: "10px",
          }}
        >
          <span
            style={{
              marginRight: "5px",
              cursor: "pointer",
              color: "#999",
            }}
            onClick={() => handleCommentEdit(comment, true)}
          >
            Edit    
          </span>
          {!noMoreComments &&
          <span
            style={{
              marginLeft: "5px",
              cursor: "pointer",
              color: "#999",
            }}
            onClick={() => handleCommentReply(comment, true)}
          >
            Reply
          </span>}
          <span
            style={{
              marginLeft: "20px",
              cursor: "pointer",
              color: "#999",
            }}
            onClick={() => handleCommentDelete(comment)}
          >
            Delete
          </span>
        </Box>
      </Box>
      <Box></Box>
    </>
  );
}
