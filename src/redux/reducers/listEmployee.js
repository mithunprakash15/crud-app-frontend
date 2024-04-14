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
export const listEmployee = createAsyncThunk(
  "listEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.get("/", employeeData, {
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


const ListEmployee = createSlice({
    name: "listEmployee",
    initialState: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      response: {},
      errorMessage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(listEmployee.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(listEmployee.fulfilled, (state, action) => {
        const { payload } = action;
        state.isLoading = false;
        state.response = payload;
        state.errorMessage = "";
        state.isSuccess = true;
        SUCCESS(payload);
      });
      builder.addCase(listEmployee.rejected, (state, action) => {
        const { payload } = action;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = payload.data ? payload : payload;
        FAILED(state.errorMessage);
      });
    },
  });
  

export default ListEmployee.reducer;
