import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../app/store"
import { Employee } from "../../types"
import { LOCAL_STORAGE_KEYS } from "../../utils/localStorageKeys"

export interface EmployeesStates {
  employees: Employee[]
}

const initialState: EmployeesStates = {
  employees: [],
}

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setNewEmployees: (state, action: PayloadAction<Employee>) => {
      addNewEmployee(action.payload)

      const newtState = [...state.employees, action.payload]

      state.employees = newtState
    },
  },
})

export const { setNewEmployees } = employeesSlice.actions

export const addNewEmployee =
  (employee: Employee): AppThunk =>
  (dispatch) => {
    const currentArray: [] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.employees) || "[]",
    )

    if (currentArray.length) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.employees,
        JSON.stringify([...currentArray, employee]),
      )
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.employees,
        JSON.stringify([employee]),
      )
    }
  }

export const selectEmployees = (state: RootState) => state.employees.employees

export default employeesSlice.reducer
