import React from 'react'

import { IconProps, IconComponent } from './IconComponent'

export const Right: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" id="right">
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M9 5L16 12L9 19"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
)
