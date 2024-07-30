import { StateSchema } from '@app/redux/types'

export const getArticleBody = (state: StateSchema) => state.article?.body || []
