import { IBody } from '@shared/ui/Body'
import { ArticleEditorState, IArticleData, IValidateErrors, TabVariant } from '../../types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { create } from '../asyncThunks/create'
import { update } from '../asyncThunks/update'

const initialState: ArticleEditorState = {
  isLoading: false,
  activeTab: 'settings',
  article: {
    body: [],
    category: null,
    description: '',
    image: null,
    title: '',
    order: '',
  },
  validate: null,
  error: null,
}

const ArticleEditorSlice = createSlice({
  name: 'articleEditorSlice',
  initialState,
  reducers: {
    changeActiveTab(state, action: PayloadAction<TabVariant>) {
      state.activeTab = action.payload
    },
    setArticleData(state, action: PayloadAction<IArticleData>) {
      state.article = action.payload
    },
    setCategory(state, action: PayloadAction<string>) {
      state.article.category = action.payload
    },
    setTitle(state, action: PayloadAction<string>) {
      state.article.title = action.payload
    },
    setDescription(state, action: PayloadAction<string>) {
      state.article.description = action.payload
    },
    setImage(state, action: PayloadAction<string | null>) {
      state.article.image = action.payload
    },
    setBody(state, action: PayloadAction<IBody[]>) {
      state.article.body = action.payload
    },
    setValidate(state, action: PayloadAction<IValidateErrors | null>) {
      state.validate = action.payload
    },
    setOrder(state, action: PayloadAction<string>) {
      state.article.order = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true
      })
      .addCase(create.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    builder
      .addCase(update.pending, (state) => {
        state.isLoading = true
      })
      .addCase(update.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { actions: articleEditorAction } = ArticleEditorSlice
export const { reducer: articleEditorReducer } = ArticleEditorSlice
