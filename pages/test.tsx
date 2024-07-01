'use client'

import { Editor } from '@shared/ui/EditorText'
import { Text } from '@shared/ui/Text/Text'
import { useState } from 'react'

const Test = () => {
  const [value, setValue] = useState('')

  return (
    <div>
      <Editor value={value} label="Текстовый редактор" />
      <Text>{value}</Text>
    </div>
  )
}

export default Test
