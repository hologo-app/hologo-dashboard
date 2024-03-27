import axios from "utils/axiosPrivate";

export const logoutUser = async () => {
  try {
    const response = await axios.get("/logout");
    console.log(response)
    return response;
  } catch (error) {
    throw error;
  }
};