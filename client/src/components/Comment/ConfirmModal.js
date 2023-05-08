import React from "react";
import "../../styles/ConfirmModal.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { fontSize } from "@mui/system";
import Button from "@mui/material/Button";

function ConfirmModal(props) {
  const { comment, closeModal, deleteComment } = props;
  console.log(comment);
  return (
    // <div className="ConfirmModal">
    //   <div className="modalContainer">

    // <div className="title">
    //   <h2 className="title-header"> Delete Comment </h2>
    //   <button onClick={() => closeModal(false)}>X</button>
    // </div>

    // <div className="body">
    //   <div className="body-message">Are you sure you want to delete this comment?</div>
    //   <div className="body-content">
    //     <div className='user'>{comment.userDisplayName}</div>
    //     <div className='createAt'>{new Date(comment.createAt).toLocaleString()}</div>
    //     <div className="comment-content">{comment.content}</div>
    //   </div>

    //     </div>

    // <div className="footer">
    //   <button id="cancel" onClick={() => closeModal(false)}>Cancel</button>
    //   <button id="delete" onClick={() => deleteComment(comment)}>Delete</button>
    // </div>

    //   </div>
    // </div>

    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>
        <div className="title">
          <h2 className="title-header"> Delete Comment </h2>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="body">
            <div className="body-message">
              Are you sure you want to delete this comment?
            </div>
            <div className="body-content">
              <div className="comment-content">{comment.content}</div>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="footer">
          <Button id="cancel" onClick={() => closeModal(false)}>
            Cancel
          </Button>
          <Button id="delete" onClick={() => deleteComment(comment)}>
            Delete
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
