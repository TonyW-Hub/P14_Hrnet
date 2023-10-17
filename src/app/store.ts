import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import statesReducer from "../features/states/statesSlice"
import selectSlice from "../features/selects/selectSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    states: statesReducer,
    selects: selectSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
