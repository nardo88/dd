import * as ts from 'typescript'

export const compileTS = (code: string) => {
  const result = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2017 },
  })
  return result.outputText
}
