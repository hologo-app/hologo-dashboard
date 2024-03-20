import axios from "utils/axios";

export const CreateLens = async (data) => {
  try {
    const response = await axios.post("/lens", data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const GetLenses = async () => {
  try {
    const response = await axios.get("/lens");
    return response;
  } catch (error) {
    throw error;
  }
};

export const DeleteLens = async (lensID) => {
  try {
    console.log(lensID)
    const response = await axios.delete('/lens', { data: { lensID } });
    console.log(response)
    return response;
  } catch (error) {
    throw error;
  }
};

export const EditLens = async (lensID, updatedData) => {
  try {
    const response = await axios.put(`/lens/${lensID}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "0",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
