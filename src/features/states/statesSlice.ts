import { createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
import { states } from "../../data/project/states"

export interface StatesState {
  obj: {}
}

const initialState: StatesState = {
  obj: {},
}

export const statesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {},
})

export const setStates = (): AppThunk => (dispatch) => {
  const mapper = states.map((el) => {
    const newObj = { label: el.name, value: el.abbreviation }
    return newObj
  })

  return mapper.length ? mapper : []
}

export default statesSlice.reducer
