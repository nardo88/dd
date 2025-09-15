import { IconComponent, IconProps } from './IconComponent'

export const InfoIcon: React.FC<IconProps> = (props) => {
  return (
    <IconComponent viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="8.5" />
        <path strokeLinecap="round" d="M12 10.5v7M12 8V7" />
      </g>
    </IconComponent>
  )
}
