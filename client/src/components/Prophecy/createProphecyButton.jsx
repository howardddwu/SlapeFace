import React from "react";
import { useState, useContext,useEffect } from "react";
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
import  "../../styles/createProphecy.css";
import {categoryList} from '../../Category';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

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
  const [category, setCategory] = useState([]);
  const [dateTime, setDateTime] = useState(dayjs());
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [submitButtonDisable, setSubmitButtonDisable] = useState(true)
  //category
  
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
  

  //main window
  
  const handldClickOpen = () => {
    setDateTime(dayjs())
    setOpen(true);
  };
  const handleClose = () => {
    setTitle('')
    setDescription('')
    setCategory([]);
    setDateTime(dayjs());
    setOptions([]);
    setOpen(false);
  };

  async function submitPost() {
    handleClose();
    

    // add prophecy to database
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

    setTitle('')
    setDescription('')
    setCategory([]);
    setDateTime(dayjs());
    setOptions([]);
  }
  
  //check empty for all fields
  useEffect(() => {
    function checkOptions(options){
      for(let i = 0; i<options.length;i++){
        if(options[i].option === ''){
            return false
        }
      }
      return true
    }
    if (title!=='' && Description!=='' && options.length!==0 && checkOptions(options) && category.length!==0) {
      setSubmitButtonDisable(false)
    } else {
      setSubmitButtonDisable(true)
    }
  }, [title, category, Description, dateTime, options])

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

        <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
          <DialogTitle>New Prophecy</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To start to a new Prophecy, please enter the information of the
              prophecy below.
            </DialogContentText>
            <FormControl className="box">
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
              <span className="hints">*Required</span>
            
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
              <span className="hints">*Required</span>
              <br />
              
              <FormControl>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  multiple
                  autoWidth
                  labelId="category-label"
                  label="Category"
                  value={category}
                  onChange={handleCategoryChange}
                  MenuProps={MenuProps}
                >
                  {categoryList.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                
              </FormControl>
              
              
              {options.map((items, index) => (
                <div key={index} className='options'>
                    <div>
                      Option {index + 1}:
                    </div>
                    <input
                      type="text"
                      value={items.option}
                      onChange={(event) => {
                        handleOptionChange(index, event.target.value);
                      }}
                    />
                  
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove
                  </button>
                  <span className="hints ">*Required</span>
                
                </div>
              ))}
              

              <Button type="button" onClick={handleAddOption}>
                add option
              </Button>
              <span className="hints">*Required</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Set End Time"
                    value={dateTime}
                    onChange={(newValue) => setDateTime(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={submitButtonDisable} onClick={submitPost}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default CreateProphecyButton;
