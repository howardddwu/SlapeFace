import React from "react";
import { useState, useContext } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { AuthContext } from "../../context/AuthProvider";
const CreateProphecyButton = () => {
  // title
  // description
  // author
  // endTime: { type: Date, default: Date.now }, //require: true }, //要改！
  // verifiedTime: { type: Date, default: Date.now }, //require: true }, //要改！！
  // options: {
  //   type: mongoose.SchemaTypes.Mixed,
  //   option: String,
  //   VoterId: {
  //     type: mongoose.SchemaType.ObjectId,
  //     ref: 'users'
  //   },
  //   required: true
  // },
  // category:

  //data variable
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  //category
  const [category, setCategory] = useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const categorySample = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
  ];
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //options
  const [options, setOptions] = useState([]);
  const handleAddOption = () => {
    setOptions([...options, { option: "", VoterId: [] }]);
    console.log(options);
  };
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].option = value;
    setOptions(updatedOptions);
  };
  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };
  // time date
  const [dateTime, setDateTime] = useState(dayjs("2022-04-17T15:30"));

  //main window
  const [open, setOpen] = useState(false);
  const handldClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  async function submitPost() {
    handleClose();
    // Needs modification here

    //time
    // setDateTime(new Date());
    //test code
    console.log("Title: " + title);
    console.log("category: " + category);
    console.log("Description:" + Description);
    console.log("dateTime: " + new Date(dateTime));
    console.log("options:", options);
    //test code
    console.log("submit post");

    console.log("added");

    //!!!!! Call api request !!!!//
    const type = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: Description,
        author: user._id,
        options: options,
        category: category,
        endTime: new Date(dateTime),
      }),
    };
    await fetch(`${process.env.REACT_APP_API_URL}/prophecy/add`, type)
      .then(console.log("success"))
      .catch((error) => console.log("error", error));
  }
  console.log(user);
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
            <FormControl sx={{ width: 300 }}>
              <TextField
                autoFocus
                margin="dense"
                id="prophecy_title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="prophecy_description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <Select
                multiple
                autoWidth
                label="niasdn"
                value={category}
                onChange={handleCategoryChange}
                MenuProps={MenuProps}
              >
                {categorySample.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>

              {options.map((items, index) => (
                <div key={index}>
                  <label>
                    Option {index + 1}:
                    <input
                      type="text"
                      value={items.option}
                      onChange={(event) => {
                        handleOptionChange(index, event.target.value);
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <Button type="button" onClick={handleAddOption}>
                add option
              </Button>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Basic date time picker"
                    value={dateTime}
                    onChange={(newValue) => setDateTime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
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
