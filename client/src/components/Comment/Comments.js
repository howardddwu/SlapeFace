import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm'
import pic1 from "../../DefaultProfile_1.jpg"
import '../../styles/Comments.css'

const secondBetweenUpdate = 10

function Comments (props) {

  const { user } = useContext(AuthContext)

  //getting lastLessonViewedId from lesson page.
  //whenever it update, means the lesson changed, then we getting the comments from new lesson
  const { ProphecyId } = props

  // use to store all comments 
  const [comments, setComment] = useState([])
  // Only stored top level comments
  const [TopLevelComments, setTopLevelComment] = useState([])
  // Used to assign number of comments that is display
  const [count, setCount] = useState({ prev: 0, next: 2 })
  // Check if there are more comments which is not showing
  const [hasMore, setHasMore] = useState(true)
  // Amount of Comments that will be display
  const [current, setCurrent] = useState([])
  // If sortByCreateTime = true, then comment is sorting based on the time posted
  // If sortByCreateTime = false, then comment is displaying based on the upvotes
  const [sortByCreateTime, setSortByCreateTime] = useState(true)
  // used for force rerender the component
  const [forceUpdate, setForceUpdate] = useState(0)
  // use to force update every 10 second
  //const [countDownSecond, setCountDownSecond] = useState(new Date().getSeconds()) !!!!
  //const [currentSecond, setCurrentSecond] = useState(new Date().getSeconds())    !!!!


  // !!!!
  // 一下code用于页面每十秒自动更新（用于其他用户发了新的评论时，当前用户更新页面） 可以用其他方法代替 需要时再添加
  // // force update every 10 second
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     let current = new Date().getSeconds()
  //     setCurrentSecond(current)
  //   }, 1000)
  //   return () => clearInterval(interval)
  // })
  // useEffect(() => {
  //   if ((currentSecond - countDownSecond + 60) % 60 === secondBetweenUpdate) {
  //     setForceUpdate(forceUpdate + 1)
  //     setCountDownSecond(currentSecond)
  //   }
  // }, [currentSecond])


  // Get All comments from DB
  useEffect(() => {
    async function getData () {
      await fetch(`${process.env.REACT_APP_API_URL}/comment/getAll?`).then(res => {
        if (res.ok) {
          return res.json()
        }
      })
        .then(jsondata => {
          // store all comments
          jsondata = jsondata.filter(item => item.prophecyId === ProphecyId)
          setComment(jsondata)
          let CommentList
          // Get top level comments from the data
          if (jsondata != null) {
            CommentList = jsondata.filter(item => item.reply === false)

            // if comment is currently display by posted time
            if (sortByCreateTime === true) {
              CommentList = CommentList.sort((objA, objB) => (Number(new Date(objA.createAt)) - Number(new Date(objB.createAt)))).reverse()
            }
            // if comment is currently display by number of upvotes
            else {
              CommentList = CommentList.sort((objA, objB) => {
                if (objA.upVotes.length > objB.upVotes.length) return -1
                if (objB.upVotes.length > objA.upVotes.length) return 1
                //if comments having same number of upvote, display it by time
                return (Number(new Date(objA.createAt)) - Number(new Date(objB.createAt))) * -1
              })
            }

            setTopLevelComment(CommentList)
            //limit amount of comment display
            setCurrent(CommentList.slice(0, count.next))
            CommentList.length <= 2 || count.next >= CommentList.length ? setHasMore(false) : setHasMore(true)
            console.log("Data recieved")
          }
        })
        .catch(error => console.log('error', error))
    }
    getData()
  }, [forceUpdate])

  // Add Comment
  async function addComment (content) {
    let userIcon = user.icon ? user.icon : pic1
    //!!!!! Call api request here !!!!//
    const type = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user._id, userDisplayName: user.displayname, userIcon: userIcon, prophecyId: ProphecyId, parentCommentId: "undefined", content: content, reply: false })

    }
    await fetch(`${process.env.REACT_APP_API_URL}/comment/add`, type)
      .then(
        console.log('success')
      )
      .catch(
        error => console.log('error', error)
      )

    setForceUpdate(forceUpdate + 1)
  }

  // Add Reply
  async function addReply (content, comment) {
    console.log("reply added")
    console.log(content)
    console.log(comment._id)
    let userIcon = user.icon ? user.icon : pic1

    //!!!!! Call api request here !!!!//
    const type = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user._id, userDisplayName: user.displayname, userIcon: userIcon, prophecyId: ProphecyId, parentCommentId: comment._id, content: content, reply: true })

    }
    await fetch(`${process.env.REACT_APP_API_URL}/comment/add`, type)
      .then(
        console.log('success')
      )
      .catch(
        error => console.log('error', error)
      )

    setForceUpdate(forceUpdate + 1)
  }

  // edit comment
  async function editComment (content, comment) {
    //!!!!! Call api request here !!!!//
    await fetch(`${process.env.REACT_APP_API_URL}/comment/edit/` + comment._id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content })
    })
      .then(
        console.log('success')
      )
      .catch(
        error => console.log('error', error)
      )
    setForceUpdate(forceUpdate + 1)
  }

  // delete comment
  async function deleteComment (comment) {
    console.log("deleting")
    console.log(comment)
    //!!!!! Call api request here !!!!//

    // delete comment
    await fetch(`${process.env.REACT_APP_API_URL}/comment/delete/` + comment._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() =>
        console.log('Delete successful')
      )
      .catch(
        error => console.log('error', error)
      )

    // delete replies under this comment
    await fetch(`${process.env.REACT_APP_API_URL}/comment/deleteReplies/` + comment._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() =>
        console.log('Delete successful')
      )
      .catch(
        error => console.log('error', error)
      )


    // Use to force update
    setForceUpdate(forceUpdate + 1)
  }

  async function updateVotes (updateInfo, comment) {
    //!!!!! Call api request here !!!!//
    await fetch(`${process.env.REACT_APP_API_URL}/comment/edit/` + comment._id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateInfo)
    })
      .then(
        console.log('success')
      )
      .catch(
        error => console.log('error', error)
      )
    setForceUpdate(forceUpdate + 1)
  }

  // 一次性拿出所有reply以及reply on reply 避免渲染时候套娃
  // Get replies of specific comment from the data
  function getReplies (topComment) {
    function getRepliesOnReply (data) {
      data.map(reply => {
        let replyOnReply = comments.filter(item => item.parentCommentId === reply._id)
        if (replyOnReply.length > 0) {
          replyOnReply = replyOnReply.map(item => Object.assign(item, { parent: reply }))
          replies = replies.concat(replyOnReply)
          getRepliesOnReply(replyOnReply)
        }
      })
    }

    let replies = comments.filter(item => item.parentCommentId === topComment._id)
    if (replies.length > 0) {
      replies = replies.map(item => Object.assign(item, { parent: topComment }))
      getRepliesOnReply(replies)

    }

    replies.sort((objA, objB) => (Number(new Date(objA.createAt)) - Number(new Date(objB.createAt))))
    return replies
  }

  // sort comment by posted time
  function sortByTime () {
    setSortByCreateTime(true)
    let commentlist = TopLevelComments.sort((objA, objB) => (Number(new Date(objA.createAt)) - Number(new Date(objB.createAt)))).reverse()
    setTopLevelComment(commentlist)
    setCurrent(TopLevelComments.slice(0, count.next))
    TopLevelComments.length <= 2 || count.next >= TopLevelComments.length ? setHasMore(false) : setHasMore(true)
  }

  // sort comment by upvote
  function sortByVote () {
    setSortByCreateTime(false)
    let commentlist = TopLevelComments.sort((objA, objB) => {
      if (objA.upVotes.length > objB.upVotes.length) return -1
      if (objB.upVotes.length > objA.upVotes.length) return 1
      //if comments having same number of upvote, display it by time
      return (Number(new Date(objA.createAt)) - Number(new Date(objB.createAt))) * -1
    })
    setTopLevelComment(commentlist)
    setCurrent(TopLevelComments.slice(0, count.next))
    TopLevelComments.length <= 2 || count.next >= TopLevelComments.length ? setHasMore(false) : setHasMore(true)
  }

  //load next 2 comments
  function onLoadMore () {
    // add next 2 comments into the "current"(comments that is showing)
    setCurrent(current.concat(TopLevelComments.slice(count.prev + 2, count.next + 2)))
    // move to the position of next 2 comments in list of all comments
    setCount((prevState) => ({ prev: prevState.prev + 2, next: prevState.next + 2 }))
    // when reach the end of list
    if (current.length >= TopLevelComments.length - 2) {
      setHasMore(false)
      return
    }
  }

  // load 7 comments at a time 限制comment显示数量时使用的html
  // {current.map(item => (
  // <Comment key={item._id} commentData={item} getReplies={getReplies(item)} forceUpdate={forceUpdate} setForceUpdate={setForceUpdate} />))}
  // 
  return (
    <div className="Comments">
      <h4>Comments</h4>
      <NewCommentForm submit="Comment" initText=" " onClickSubmit={addComment} />
      {sortByCreateTime && <div className='comments-display'>
        <button className='comments-display-bytime-active' onClick={sortByTime}>Display by time</button> | <button className='comments-display-byvote' onClick={sortByVote}>Display by vote</button>
      </div>}
      {!sortByCreateTime && <div className='comments-display'>
        <button className='comments-display-bytime' onClick={sortByTime}>Display by time</button> | <button className='comments-display-byvote-active' onClick={sortByVote}>Display by vote</button>
      </div>}
      <div className='comments-container'>
        {current.map(item => (
          <Comment
            key={item._id}
            commentData={item}
            getReplies={getReplies(item)}
            addReply={addReply}
            editComment={editComment}
            deleteComment={deleteComment}
            updateVote={updateVotes}
            bordercss={{ "borderBottom": '#eee 1px solid' }} />))}
        {hasMore && <h3 className="comments-loadMore" onClick={onLoadMore}>loading more ...</h3>}
      </div>

    </div>
  )
}

export default Comments
