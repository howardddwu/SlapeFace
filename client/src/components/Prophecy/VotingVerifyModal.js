import React, { useState, useContext, useEffect } from "react";
import "../../styles/VotingVerifyModal.css";
import { AuthContext } from "../../context/AuthProvider";
import { Input, Radio, Space } from "antd";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { fontSize } from "@mui/system";

function VotingVerifyModal(props) {
  const { Prophecy, type, closeModal, submit } = props;

  const { user } = useContext(AuthContext);
  const [value, setValue] = useState(-1);
  const [voteButtonDisable, setVoteButtonDisable] = useState(true);
  const [verifyButtonDisable, setVerifyButtonDisable] = useState(true);

  function onChangeVote(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    if (value !== -1) {
      setVoteButtonDisable(false);
      setVerifyButtonDisable(false);
    } else {
      setVoteButtonDisable(true);
      setVerifyButtonDisable(true);
    }
  }, [value]);

  return (
    // <div className="VotingVerifyModal">
    //   <div className="modalContainer">

    //     <div className="title">
    //       {type === 'Voting' ?
    //         <h2 className="title-header"> Make Your Choice </h2> :
    //         <h2 className="title-header"> Verify the Result </h2>
    //       }

    //       <button onClick={() => closeModal(false)}>X</button>
    //     </div>

    // <div className="body">
    //   <h3 className="body-prophecytitle">{Prophecy.title}</h3>
    //   <Radio.Group onChange={onChangeVote} value={value}>
    //     <Space direction="vertical">
    //       {Prophecy.options.map((item, index) =>
    //         <Radio key={index} value={index}>{item.option}</Radio>
    //       )}
    //     </Space>
    //   </Radio.Group>
    // </div>

    // {type === 'Voting' &&
    //   <div>
    //     <div>Tips: Each Vote will cost 10 points </div>
    //     <div>Your current points : {user.points}</div>
    //     {notEnoughPoints && <div>YOUR POINTS IS NOT ENOUGH !</div>}
    //   </div>
    // }

    // <div className="footer">
    //   <button id="cancel" onClick={() => closeModal(false)}>Cancel</button>
    //   {type === 'Voting' ?
    //     <button id="submit" disabled={voteButtonDisable} onClick={() => submit(value)}>Vote</button> :
    //     <button id="submit" disabled={verifyButtonDisable} onClick={() => submit(value)}>Verify</button>}
    // </div>

    //   </div>
    // </div>
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>
        <div className="title">
          {type === "Voting" ? (
            <h2 className="title-header"> Make Your Choice </h2>
          ) : (
            <h2 className="title-header"> Verify the Result </h2>
          )}
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="body">
            <h3 className="body-prophecytitle">{Prophecy.title}</h3>
            <Radio.Group onChange={onChangeVote} value={value}>
              <Space direction="vertical">
                {Prophecy.options.map((item, index) => (
                  <Radio key={index} value={index}>
                    {item.option}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
          {type === "Voting" && (
            <div>
              <div>Tips: Each Vote will cost 10 points </div>
              <div>Your current points : {user.points}</div>
            </div>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="footer">
          <Button size="small" onClick={() => closeModal(false)}>
            Cancel
          </Button>
          {type === "Voting" ? (
            <Button disabled={voteButtonDisable} onClick={() => submit(value)}>
              Vote
            </Button>
          ) : (
            <Button
              disabled={verifyButtonDisable}
              onClick={() => submit(value)}
            >
              Verify
            </Button>
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default VotingVerifyModal;
