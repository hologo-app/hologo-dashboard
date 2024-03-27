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

const Lenses = () => {

  const {createLens} = useCreateLens()

  const [formData, setFormData] = useState({
    lensCategory: "",
    lensName: "",
    lensGroupID: "",
    lensImage: "", // We will store base64 image here
  });

  const { fetch, setFetch } = useGlobal();

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
      console.log(response);
      setFetch(fetch + 1);
    } catch (error) {
      console.log(error);
    }

    // Reset form data
    setFormData({
      lensCategory: "",
      lensName: "",
      lensGroupID: "",
      lensImage: "",
    });
  };

  const theme = useTheme();
  return (
    <>
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
    </>
  );
};

export default Lenses;
