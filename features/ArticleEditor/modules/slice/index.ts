import { ArticleEditorState, TabVariant } from '../../types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ArticleEditorState = {
  isLoading: false,
  activeTab: 'settings',
}

const ArticleEditorSlice = createSlice({
  name: 'articleEditorSlice',
  initialState,
  reducers: {
    changeActiveTab(state, action: PayloadAction<TabVariant>) {
      state.activeTab = action.payload
    },
  },
  //   extraReducers(builder) {
  //     builder
  //       .addCase(getArticles.pending, (state) => {
  //         state.isLoading = true
  //       })
  //       .addCase(getArticles.fulfilled, (state) => {
  //         state.isLoading = false
  //       })
  //       .addCase(getArticles.rejected, (state, action) => {
  //         state.isLoading = false
  //         state.error = action.payload as string
  //       })
  //   },
})

export const { actions: articleEditorAction } = ArticleEditorSlice
export const { reducer: articleEditorReducer } = ArticleEditorSlice
