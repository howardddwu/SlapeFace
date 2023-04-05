import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { FaArrowUp } from 'react-icons/fa'
import NewCommentForm from './NewCommentForm'
import { v4 as uuid } from 'uuid' // getting unqiue id for comment
import '../../styles/Comment.css'
import ConfirmModal from './ConfirmModal'
import { useNavigate } from 'react-router-dom'
import * as UserAPI from "../../API/UserAPI.js"
import pic1 from "../../DefaultProfile_1.jpg"

function Comment (props) {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const { commentData, getReplies, addReply, editComment, deleteComment, updateVote, bordercss } = props

  const [showReplyVisible, setShowReplyVisible] = useState(false)
  //display the form for add reply
  const [addReplyVisible, setAddReplyVisible] = useState(false)
  //display the form for edit comment
  const [isEditing, setIsEditing] = useState(false)

  const [OpenModal, setOpenModal] = useState(false)

  const [userInfo, setUserInfo] = useState('')

  useEffect(() => {
    UserAPI.getUserInfo(commentData.userId, setUserInfo)
  }, [])



  // only defaultUser allow to edit and delete
  const EditDelete = user && Boolean(commentData.userId === user._id)

  function displayReply () {
    setShowReplyVisible(!showReplyVisible)
  }

  function createReply () {
    setAddReplyVisible(!addReplyVisible)
    setIsEditing(false)
  }
  function editingComment () {
    setIsEditing(!isEditing)
    setAddReplyVisible(false)
  }

  function sortCommentDate (comment_date_info) {

    function lastDayOfMonth (year, month) {
      return new Date(year, month + 1, 0).getDate()
    }
    const comment_date = new Date(comment_date_info)
    const current_date = new Date()

    const comment_date_year = comment_date.getFullYear()
    const current_date_year = current_date.getFullYear()

    const comment_date_month = comment_date.getMonth()
    const current_date_month = current_date.getMonth()

    const comment_date_day = comment_date.getDate()
    const current_date_day = current_date.getDate()

    const comment_date_hour = comment_date.getHours()
    const current_date_hour = current_date.getHours()

    const comment_date_min = comment_date.getMinutes()
    const current_date_min = current_date.getMinutes()

    const month_diff = (current_date_month - comment_date_month + 12) % 12
    const day_diff = current_date_day - comment_date_day >= 0 ? current_date_day - comment_date_day : current_date_day + (lastDayOfMonth(comment_date_year, comment_date_month) - comment_date_day)
    const hour_diff = (current_date_hour - comment_date_hour + 24) % 24
    const min_diff = (current_date_min - comment_date_min + 60) % 60
    const year_diff = current_date_year - comment_date_year
    // || means OR and && means AND
    if (year_diff === 0 || (year_diff === 1 && comment_date_month > current_date_month)) {
      if (month_diff === 0 || (month_diff === 1 && comment_date_day > current_date_day)) {
        if (day_diff === 0 || (day_diff === 1 && comment_date_hour > current_date_hour)) {
          if (hour_diff === 0 || (hour_diff === 1 && comment_date_min > current_date_min)) {
            if (comment_date_min === current_date_min) {
              return "now"
            }
            else {
              return min_diff === 1 ? min_diff + " min ago" : min_diff + " mins ago"
            }
          }
          else {
            return hour_diff === 1 ? hour_diff + " hour ago" : hour_diff + " hours ago"
          }
        }
        else {
          return day_diff === 1 ? day_diff + " day ago" : day_diff + " days ago"
        }
      }
      else {
        return month_diff === 1 ? month_diff + " month ago" : month_diff + " months ago"
        //if it hasnt been the same it will print out how many months ago has it been
      }
    }
    else
    //this will check if the year we are in now is bigger then the comment year.
    {
      return year_diff === 1 ? year_diff + " year ago" : year_diff + " years ago"
      //if the year difference is more then one it will print out that result
      //we use .toString to return a string

    }
  }

  function upVote () {
    if (user) {
      // if user did not upvote this comment, add upvote
      if (!commentData.upVotes.includes(user._id)) {
        commentData.upVotes.push(user._id)
        console.log("upvote add")
      }
      // if user already upvote this comment, then remove upvote(the second time user click on upvote, cancel it)
      else {
        commentData.upVotes = commentData.upVotes.filter(item => item !== user._id)
        console.log("upvote remove")
      }

      updateVote({ upVotes: commentData.upVotes }, commentData)
    }
    else {
      navigate("/login")
    }

  }
  //console.log("1" + userInfo)
  return (
    <div className="comment">
      <div className='comment-icon-container'>
        <img src={userInfo.icon ? userInfo.icon : pic1} alt="" className='comment-icon' />
      </div>
      <div className='comment-detail' style={bordercss}>
        <div className="comment-container">
          <div className="comment-infocontent-container">
            <div className="comment-info">
              <div className='comment-info-user'>{userInfo.displayname}</div>
              <div className='comment-info-createAt'>{sortCommentDate(commentData.createAt)}</div>
            </div>

            {(!isEditing && (commentData.parent === undefined || commentData.parent.reply === false)) && <div className="comment-content">{commentData.content}</div>}
            {(!isEditing && commentData.parent !== undefined && commentData.parent.reply === true) &&
              <div className="comment-content-reply">
                Reply
                <div className="comment-content-replyto">@{commentData.parent.userDisplayName}: </div>
                <div className="comment-content">
                  {commentData.content}
                </div>
              </div>}
          </div>

          <div className='comment-vote'>
            <button className="upvote-button" onClick={upVote}> <FaArrowUp /> </button>  {commentData.upVotes.length}
          </div>
        </div>





        {isEditing &&
          <NewCommentForm
            setIsEditing={setIsEditing}
            setAddReplyVisible={setAddReplyVisible}
            commentData={commentData}
            submit="Update"
            onClickSubmit={editComment}
            initText={commentData.content} />}

        {(!commentData.reply && getReplies.length !== 0 && !showReplyVisible) &&
          <div id="comment-button-showReply" onClick={displayReply}>View all replies</div>}
        {showReplyVisible && <div id="comment-button-hideReply" onClick={displayReply}>Hide all replies</div>}
        {showReplyVisible &&
          <div className="comment-reply">
            {getReplies.map(item => (
              <Comment
                key={item._id}
                commentData={item}
                getReplies={[]}
                addReply={addReply}
                editComment={editComment}
                deleteComment={deleteComment}
                updateVote={updateVote}
              />
            ))}
          </div>
        }
        {addReplyVisible &&
          <NewCommentForm
            setIsEditing={setIsEditing}
            setAddReplyVisible={setAddReplyVisible}
            commentData={commentData}
            submit="Reply"
            onClickSubmit={addReply}
            initText=" " />}
      </div>


      <div className='comment-menu'>
        <button className="comment-menu-button">...</button>
        <div className="comment-menu-container">
          <div id="comment-button-addReply" onClick={createReply}>Reply</div>
          {EditDelete && <div id="comment-button-edit" onClick={editingComment}> Edit</div>}
          {EditDelete && <div id="comment-button-delete" onClick={() => setOpenModal(true)}> Delete</div>}
        </div>
      </div>

      {OpenModal && <ConfirmModal comment={commentData} closeModal={setOpenModal} deleteComment={deleteComment} />}


    </div>
  )
}

export default Comment