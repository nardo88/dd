import React from 'react'

import { IconComponent, IconProps } from './IconComponent'

export const CopyIcon: React.FC<IconProps> = (props): JSX.Element => {
  return (
    <IconComponent fill="none" {...props} viewBox="0 0 13 16">
      <path
        d="M8.25 1.25V4.25C8.25 4.44891 8.32902 4.63968 8.46967 4.78033C8.61032 4.92098 8.80109 5 9 5H12"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 11.75H5.25C4.85218 11.75 4.47064 11.592 4.18934 11.3107C3.90804 11.0294 3.75 10.6478 3.75 10.25V2.75C3.75 2.35218 3.90804 1.97064 4.18934 1.68934C4.47064 1.40804 4.85218 1.25 5.25 1.25H8.25L12 5V10.25C12 10.6478 11.842 11.0294 11.5607 11.3107C11.2794 11.592 10.8978 11.75 10.5 11.75Z"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11.75V13.25C9 13.6478 8.84196 14.0294 8.56066 14.3107C8.27936 14.592 7.89782 14.75 7.5 14.75H2.25C1.85218 14.75 1.47064 14.592 1.18934 14.3107C0.908035 14.0294 0.75 13.6478 0.75 13.25V5.75C0.75 5.35218 0.908035 4.97064 1.18934 4.68934C1.47064 4.40804 1.85218 4.25 2.25 4.25H3.75"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconComponent>
  )
}
