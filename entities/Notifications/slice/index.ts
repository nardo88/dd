import { INotification, NotificationSchema } from '../types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: NotificationSchema = {
  list: [],
}

const notificationSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    add(state, action: PayloadAction<INotification>) {
      state.list.push(action.payload)
    },
    remove(state, action: PayloadAction<string>) {
      state.list = state.list.filter((i) => i.id !== action.payload)
    },
  },
})

export const { actions: notificationAction } = notificationSlice
export const { reducer: notificationReducer } = notificationSlice
