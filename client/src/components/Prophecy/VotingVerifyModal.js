import React, { useState } from "react"
import '../../styles/VotingModal.css'
import { Input, Radio, Space } from 'antd'

function VotingModal (props) {
  const { Prophecy, type, closeModal, submit } = props

  const [value, setValue] = useState(-1)

  function onChangeVote (e) {
    setValue(e.target.value)
  }
  return (
    <div className="VotingModal">
      <div className="modalContainer">

        <div className="title">
          {type === 'Voting' ?
            <h2 className="title-header"> Make Your Choice </h2> :
            <h2 className="title-header"> Verify the Result </h2>
          }

          <button onClick={() => closeModal(false)}>X</button>
        </div>

        <div className="body">
          <h3 className="body-prophecytitle">{Prophecy.title}</h3>
          <Radio.Group onChange={onChangeVote} value={value}>
            <Space direction="vertical">
              {Prophecy.options.map((item, index) =>
                <Radio key={index} value={index}>{item.option}</Radio>
              )}
            </Space>
          </Radio.Group>
        </div>

        <div className="footer">
          <button id="cancel" onClick={() => closeModal(false)}>Cancel</button>
          <button id="submit" onClick={() => submit(value)}>Vote</button>
        </div>

      </div>
    </div>
  )
}

export default VotingModal