import React from 'react'

import { IconProps, IconComponent } from './IconComponent'

export const ArrowBottom: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent
    {...props}
    id="arrow-bottom"
    fill="none"
    size={16}
    viewBox="0 0 16 16">
    <path
      d="M13 6L8 11L3 6"
      stroke="#331C20"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
)
