import { useEffect, useState } from 'react'
import '../../styles/NewCommentForm.css'
function NewCommentForm(props) {

  const { submit, commentData, onClickSubmit, initText, setIsEditing, setAddReplyVisible } = props
  const [text, setText] = useState(initText)
  const [buttonDisable, setButtonDisable] = useState(true)
  const isEditing = Boolean(submit === "Update")

  function closeForm() {
    if (submit === "Update") {
      setIsEditing(false)
    }
    if (submit === "Reply") {
      setAddReplyVisible(false)
    }
  }

  // pass the data to function "onClickSubmit", and make the textarea to default
  function submitComment(e) {
    e.preventDefault()
    onClickSubmit(text, commentData)
    setText(" ")

    closeForm()
  }

  // const [inputHeight, setInputHeight] =  
  // export class foo extends React.Component {
  //   handleKeyDown(e) {
  //     e.target.style.height = 'inherit';
  //     e.target.style.height = `${e.target.scrollHeight}px`; 
  //     // In case you have a limitation
  //     // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  //   }
  
  //   render() {
  //     return <textarea onKeyDown={this.handleKeyDown} />;
  //   }
  // }

  const handleKeyDown = (e)=>{
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`; 
    setText(e.target.value)
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
      <form onSubmit={submitComment} className='NewCommentFormContainer' action="/addComment">
        <div className='NewCommentForm-textInputWrapper'>
          <textarea  className='NewCommentForm-textInput' placeholder='Add comment...' rows="1" cols="5" value={text} onChange={handleKeyDown} />
        </div>
        <button className='btn btn-outline-secondary ' disabled={buttonDisable}>{submit}</button>
        {isEditing && <button onClick={closeForm}>Cancel</button>}
      </form>
    </div>
  )
}

export default NewCommentForm