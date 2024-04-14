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
export const authLogin = createAsyncThunk(
  "authLogin",
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login", employeeData, {
        withCredentials: true,
      });
      // const { token } = await response.json();
      // localStorage.setItem('jwt', token);

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





const AuthLogin = createSlice({
    name: "authLogin",
    initialState: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      response: {},
      errorMessage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(authLogin.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(authLogin.fulfilled, (state, action) => {
        const { payload } = action;
        state.isLoading = false;
        state.response = payload;
        state.errorMessage = "";
        state.isSuccess = true;
        if (payload.token) {
          localStorage.setItem("jwt", payload.token);
        }
        SUCCESS(payload);
      });
      builder.addCase(authLogin.rejected, (state, action) => {
        const { payload } = action;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = payload.data ? payload : payload;
        FAILED(state.errorMessage);
      });
    },
  });
  

export default AuthLogin.reducer;
