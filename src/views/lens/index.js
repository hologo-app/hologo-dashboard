import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import MainCard from "components/ui-component/cards/MainCard";
import { useTheme } from "@mui/material/styles";
import "./lens.custom.css";
import LensesTable from "components/ui-component/tables/LensesTable";
import { useCreateLens } from "api/lenses/lensAPI";
import { useGlobal } from "context/GlobalContext";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import BackDropNotification from "components/alerts/BackDropNotification";
import AlertNotification from "components/alerts/AlertNotification";

const Lenses = () => {

  const {createLens} = useCreateLens()

  const [formData, setFormData] = useState({
    lensCategory: "",
    lensName: "",
    lensGroupID: "",
    lensImage: "", // We will store base64 image here
  });

  const { fetch, setFetch,showBackdrop , setShowBackDrop ,showError,setShowError,showSuccess,setShowSuccess ,errorMessage,setErrorMessage } = useGlobal();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        lensImage: reader.result, // Set base64 encoded image
      });
    };
    reader.readAsDataURL(file); // Read file as data URL (base64 encoded)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createLens(formData);
      console.log(response.status);
      setShowBackDrop(true)
      if (response.status == 201){
        setShowSuccess(true)
         setShowBackDrop(false)
      }


      setFetch(fetch + 1);
    } catch (error) {
      setShowError(true)
      setErrorMessage(error.response.data)
      console.log(error.response.data);
    }

    // Reset form data
    setFormData({
      lensCategory: "",
      lensName: "",
      lensGroupID: "",
      lensImage: "",
    });
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = ""; // Reset the value to clear the file input field
    }
  };

  const theme = useTheme();
  return (
    <>
    { showBackdrop &&
      <BackDropNotification/>
    }
      <MainCard title="Add Lenses">
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
          encType="multipart/form-data"
        >
          {/* Set a fixed width for all FormControls and the Button */}
          <FormControl
            sx={{
              width: 250,
              [theme.breakpoints.down("sm")]: { width: "100%" },
            }}
          >
            <InputLabel>Select Lens Category</InputLabel>
            <Select
              name="lensCategory"
              label="Select Lens Category"
              value={formData.lensCategory}
              onChange={handleChange}
              required
            >
              <MenuItem value="">Select Lens Category</MenuItem>
              <MenuItem value="Humans">Humans</MenuItem>
              <MenuItem value="Plants">Plants</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              width: 250,
              [theme.breakpoints.down("sm")]: { width: "100%" },
            }}
          >
            <TextField
              label="Lens Name"
              name="lensName"
              value={formData.lensName}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl
            sx={{
              width: 250,
              [theme.breakpoints.down("sm")]: { width: "100%" },
            }}
          >
            <TextField
              label="Lens Group ID"
              name="lensGroupID"
              value={formData.lensGroupID}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl
            sx={{
              width: 250,
              [theme.breakpoints.down("sm")]: { width: "100%" },
            }}
          >
            {/* <InputLabel>Lens Image</InputLabel> */}
            <input
              type="file"
              name="lensImage"
              onChange={handleImageChange}
              className="custom-file-input"
              
              required
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 250, justifyContent: "center" }}
          >
            Submit
          </Button>
        </form>
      </MainCard>
      <div className="m-top"></div>
      <MainCard title="Lenses">
        <LensesTable  />
      </MainCard>
      {showSuccess &&
                    <AlertNotification message="Lens added successfully." severity="success" />
    
    }
    {
      showError &&
      <AlertNotification message={errorMessage} severity="error" />
    }
    </>
  );
};

export default Lenses;
