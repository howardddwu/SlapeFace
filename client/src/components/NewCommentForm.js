import { useEffect, useState } from 'react'
import '../styles/NewCommentForm.css'
function NewCommentForm (props) {

  const { submit, commentData, onClickSubmit, initText, setIsEditing, setAddReplyVisible } = props
  const [text, setText] = useState(initText)
  const [buttonDisable, setButtonDisable] = useState(true)
  const isEditing = Boolean(submit === "Update")

  function closeForm () {
    if (submit === "Update") {
      setIsEditing(false)
    }
    if (submit === "Reply") {
      setAddReplyVisible(false)
    }
  }

  // pass the data to function "onClickSubmit", and make the textarea to default
  function submitComment (e) {
    e.preventDefault()
    onClickSubmit(text, commentData)
    setText(" ")

    closeForm()
  }



  // Check if there if no comments in textarea. if no comment - disable the button
  useEffect(() => {
    if (text.length === 0 || text === " ") {
      setButtonDisable(true)
    } else {
      setButtonDisable(false)
    }
  }, [text])


  return (
    <div className="NewCommentForm">
      <form onSubmit={submitComment} action="/addComment">
        <textarea rows="1" cols="5" value={text} onChange={(e) => setText(e.target.value)} />
        <button disabled={buttonDisable}>{submit}</button>
        {isEditing && <button onClick={closeForm}>Cancel</button>}
      </form>
    </div>
  )
}

export default NewCommentForm