import React from "react"
import '../../styles/ConfirmModal.css'

function ConfirmModal (props) {
  const { comment, closeModal, deleteComment } = props

  //当前显示userid 需要改掉
  return (
    <div className="ConfirmModal">
      <div className="modalContainer">

        <div className="title">
          <h2 className="title-header"> Delete Comment </h2>
          <button onClick={() => closeModal(false)}>X</button>
        </div>

        <div className="body">
          <div className="body-message">Are you sure you want to delete this comment?</div>
          <div className="body-content">
            <div className='user'>{comment.userDisplayName}</div>
            <div className='createAt'>{new Date(comment.createAt).toLocaleString()}</div>
            <div className="comment-content">{comment.content}</div>
          </div>

        </div>

        <div className="footer">
          <button id="cancel" onClick={() => closeModal(false)}>Cancel</button>
          <button id="delete" onClick={() => deleteComment(comment)}>Delete</button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmModal