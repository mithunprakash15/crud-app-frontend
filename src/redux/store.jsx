import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import AddEmployee from "./reducers/addEmployee";
import ListEmployee from "./reducers/listEmployee";
import ViewEmployee from "./reducers/viewEmployee";
import UpdateEmployee from "./reducers/updateEmployee";
import  AuthLogin  from "./reducers/login";
import DeleteEmployee from "./reducers/deleteEmployee";
import ChangePassword from "./reducers/changePassword";
export const store = configureStore({
  reducer: {
    AddEmployee: AddEmployee,
    ListEmployee: ListEmployee,
    ViewEmployee:ViewEmployee,
    UpdateEmployee: UpdateEmployee,
    AuthLogin: AuthLogin,
    DeleteEmployee:DeleteEmployee,
    ChangePassword: ChangePassword,
  },
 
});

export const { dispatch } = store;
