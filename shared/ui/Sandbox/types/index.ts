import { EditorStacks } from '@shared/types/codeEditor'

export type SandboxStacks = Exclude<EditorStacks, 'html' | 'css'>

export interface IExecutorStrategy {
  init: () => void
  run: (code: string) => Promise<string>
}

export interface IMainProps {
  className?: string
  language: SandboxStacks
  canRun?: boolean
  code: string
}
