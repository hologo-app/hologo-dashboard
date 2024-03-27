import axios from "./../../utils/axiosPrivate";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useState,useEffect } from "react";
import { useGlobal } from "context/GlobalContext";

export const useCreateLens = () => {
  const axiosPrivate = useAxiosPrivate();
  const createLens = async (data) => {
    try {
      const response = await axiosPrivate.post("/lens", data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { createLens }; // Return createLens function
};

export const useGetLenses = () => {
  const axiosPrivate = useAxiosPrivate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const { fetch} = useGlobal();

  useEffect(() => {
    const getLenses = async () => {
      try {
        const response = await axiosPrivate.get("/lens");
        setResponse(response);
      } catch (error) {
        setError(error);
      }
    };

    getLenses();
  }, [axiosPrivate,fetch]);

  return { response, error };
};



export const useDeleteLens = () => {
  const axiosPrivate = useAxiosPrivate();
  const { fetch ,setFetch } = useGlobal();
  const deleteLens = async (lensID) => {
    try {
      const response = await axiosPrivate.delete("/lens", { data: { lensID } });
      setFetch(fetch+1);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { deleteLens }; // Return delete function
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
