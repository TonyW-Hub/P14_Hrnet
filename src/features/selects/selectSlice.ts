import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../app/store"
import { states } from "../../data/project/states"
import { departement } from "../../data/project/department"

export interface SelectsState {
  states: { value: string; label: string }[]
  department: { value: string; label: string }[]
}

const initialState: SelectsState = {
  states: [],
  department: [],
}

export const selectSlice = createSlice({
  name: "selects",
  initialState,
  reducers: {
    setStates: (
      state,
      action: PayloadAction<{ value: string; label: string }[]>,
    ) => {
      state.states = action.payload
    },
    setDepartements: (
      state,
      action: PayloadAction<{ value: string; label: string }[]>,
    ) => {
      state.department = action.payload
    },
  },
})

export const { setStates, setDepartements } = selectSlice.actions

export const setSelectStates = (): AppThunk => (dispatch) => {
  const mapper = states.map((el) => {
    const newObj = { label: el.name, value: el.abbreviation }
    return newObj
  })

  dispatch(setStates(mapper.length ? mapper : []))
}

export const setSelectDepartment = (): AppThunk => (dispatch) => {
  dispatch(setDepartements(departement))
}

export const selectStates = (state: RootState) => state.selects.states
export const selectDepartements = (state: RootState) => state.selects.department

export default selectSlice.reducer
