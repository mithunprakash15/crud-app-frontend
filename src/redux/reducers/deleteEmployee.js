import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "../api";
import { toast } from "react-toastify";


const FAILED = async (data) => {
    toast.error(data, {
    position: "top-right",
  });
};

const SUCCESS = async (data) => {
    toast.success(data, {
    position: "top-right",
  });
};

// API call
export const deleteEmployee = createAsyncThunk(
  "deleteEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/employee/?id=${employeeData}`, {
        withCredentials: true,
      });

      if (response) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const DeleteEmployee = createSlice({
    name: "deleteEmployee",
    initialState: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      response: {},
      errorMessage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(deleteEmployee.fulfilled, (state, action) => {
        const { payload } = action;
        state.isLoading = false;
        state.response = payload;
        state.errorMessage = "";
        state.isSuccess = true;
        SUCCESS(payload.message);
      });
      builder.addCase(deleteEmployee.rejected, (state, action) => {
        const { payload } = action;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = payload.data ? payload.message : payload.message;
        FAILED(state.errorMessage);
      });
    },
  });
  

export default DeleteEmployee.reducer;
