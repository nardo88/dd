import { IconComponent, IconProps } from './IconComponent'

export const Left: React.FC<IconProps> = (props): JSX.Element => (
  <IconComponent {...props} fill="none" id="left">
    <path
      d="M15 5L8 12L15 19"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconComponent>
)
