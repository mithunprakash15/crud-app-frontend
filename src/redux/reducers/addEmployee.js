import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axios} from "../api";
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
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/", employeeData, {
        withCredentials: true,
      });

      console.log("object",response)
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


const AddEmployee = createSlice({
  name: "employee",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addEmployee.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.response = payload;
      state.errorMessage = "";
      state.isSuccess = true;
      SUCCESS(payload);
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = payload.data ? payload : payload;
      FAILED(state.errorMessage);
    });
  },
});

export default AddEmployee.reducer;
