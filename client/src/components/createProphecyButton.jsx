import React from "react";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import Select from "react-select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const CreateProphecyButton = () => {
  //data variable
  const author = "abc123";
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  //category
  const Options = [
    { value: "sports", label: "Sports" },
    { value: "entertainment", label: "Entertainment" },
    { value: "hot", label: "Hot" },
  ];

  const [category, setCategory] = useState([]);
  const handleChange = (options) => {
    setCategory(options);
  };
  // time date
  const [dateTime, setDateTime] = React.useState(dayjs("2022-04-07"));
  // async const createProphecy = ()=> {
  //   console.log("added")

  //   //!!!!! Call api request !!!!//
  //   const type = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(
  //       { title:title,
  //         description: description,
  //         author: author,
  //         options:options,
  //         category:category
  //       })

  //   }
  //   await fetch(${process.env.REACT_APP_SWC_API_URL}/prophecy/add, type)
  //     .then(
  //       console.log('success')
  //     )
  //     .catch(
  //       error => console.log('error', error)
  //     )
  // }

  //main window
  const [open, setOpen] = useState(false);
  const handldClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const submitPost = () => {
    handleClose();
    // Needs modification here

    //test code
    console.log("category: " + category);
    console.log("dateTime: " + dateTime);

    //test code
    console.log("submit post");
  };

  return (
    <>
      <div>
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          onClick={handldClickOpen}
        >
          <AddIcon sx={{ mr: 1 }} />
          Create
        </Fab>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Prophecy</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To start to a new Prophecy, please enter the information of the
              prophecy below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="prophecy_title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="prophecy_description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />

            {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={10}>Sport</MenuItem>
                <MenuItem value={20}>Politics</MenuItem>
                <MenuItem value={30}>Entertainment</MenuItem>
              </Select>
            </FormControl> */}
            <br />

            <br />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={dateTime}
                onChange={(newValue) => {
                  setDateTime(newValue);
                }}
              />
            </LocalizationProvider> */}
            <br />

            <br />
            <Select
              isMulti
              name="categories"
              options={Options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitPost}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default CreateProphecyButton;
