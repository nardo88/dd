import { StateSchema } from '@app/redux'

export const getFilter = (state: StateSchema) => state.sandboxList?.filter || ''
