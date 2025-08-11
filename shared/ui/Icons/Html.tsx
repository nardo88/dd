import React from 'react'

import { IconComponent, IconProps } from './IconComponent'

export const HTML: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" width={24} height={24} viewBox="0 0 24 24">
    <rect width="24" height="24" />
    <path d="M4.77344 19.9688L3.17188 2H20.7891L19.1875 19.9688L11.9609 22" fill="#E34F26" />
    <path d="M12 20.4375L17.8203 18.8359L19.1875 3.44531H12" fill="#EF652A" />
    <path
      d="M12 10.125H9.07031L8.875 7.85938H12V5.67188H6.45312L7.03906 12.3516H12V10.125ZM11.9609 15.8672L9.5 15.2031L9.34375 13.4453H7.15625L7.42969 16.9219L11.9609 18.1719V15.8672Z"
      fill="#EBEBEB"
    />
    <path
      d="M11.9609 10.125V12.3516H14.6953L14.4219 15.2031L11.9609 15.8672V18.1719L16.4922 16.9219L17.1172 10.125H11.9609ZM11.9609 5.67188V7.85938H17.3125L17.5078 5.67188H11.9609Z"
      fill="white"
    />
  </IconComponent>
)
