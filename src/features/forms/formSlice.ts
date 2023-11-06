import { AppThunk } from "../../app/store"
import { Employee } from "../../types"
import { LOCAL_STORAGE_KEYS } from "../../utils/localStorageKeys"

export const addNewEmployee =
  (employee: Employee): AppThunk =>
  (dispatch) => {
    console.log(employee)
    localStorage.setItem(LOCAL_STORAGE_KEYS.employees, JSON.stringify(employee))
  }
