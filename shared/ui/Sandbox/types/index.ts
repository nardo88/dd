export interface IExecutorStrategy {
  init: () => void
  run: (code: string) => Promise<string>
}
