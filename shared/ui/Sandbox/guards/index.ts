import { sandBoxLanguages } from '../consts'
import type { SandboxStacks } from '../types'

export const isSandboxStacks = (value: string): value is SandboxStacks => {
  return sandBoxLanguages.includes(value as SandboxStacks)
}
