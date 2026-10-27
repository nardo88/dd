import React from 'react'

import { IconComponent, IconProps } from './IconComponent'

export const SendIcon: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" width={24} height={24} viewBox="0 0 24 24">
    <path
      d="M22 12L3 21L6 12L3 3L22 12ZM6 12H22"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
)
