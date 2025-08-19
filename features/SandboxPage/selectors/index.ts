import { StateSchema } from '@app/redux'

import { defaultCode } from '../consts'

export const getCode = (state: StateSchema) => state.sandbox?.code || defaultCode
