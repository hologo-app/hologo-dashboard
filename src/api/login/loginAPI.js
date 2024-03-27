
import axios from "./../../utils/axiosPrivate"


export const loginUser = async (data) => {
  try {
    const response = await axios.post("/auth", data);
    return response;
  } catch (error) {
    throw error;
  }
};