import React from 'react'
import { ColorValue, View } from 'react-native'
import {
  BookIcon,
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  IllustrationSports,
} from '../Assets'

export type iconType =
  | 'book'
  | 'check'
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'plus'
  | 'illustration-sports'

interface IconProps {
  icon: iconType
  width: string | number
  height: string | number
  fill?: ColorValue
  stroke?: ColorValue
  strokeWidth?: number
}

const defaultProps: IconProps = {
  icon: 'book',
  width: 40,
  height: 40,
  fill: 'black',
}

export const Icon: React.FC<IconProps> = (props) => {
  return (
    <>
      {props.icon == 'book' && (
        <BookIcon
          width={props.width}
          height={props.height}
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
        />
      )}
      {props.icon == 'check' && (
        <CheckIcon
          width={props.width}
          height={props.height}
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
        />
      )}
      {props.icon == 'chevron-up' && (
        <ChevronUpIcon
          width={props.width}
          height={props.height}
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
        />
      )}
      {props.icon == 'chevron-down' && (
        <ChevronDownIcon
          width={props.width}
          height={props.height}
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
        />
      )}
      {props.icon == 'chevron-left' && (
        <ChevronLeftIcon
          width={props.width}
          height={props.height}
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
        />
      )}
      {props.icon == 'chevron-right' && (
        <ChevronRightIcon
          width={props.width}
          height={props.height}
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
        />
      )}
      {props.icon == 'plus' && (
        <PlusIcon
          width={props.width}
          height={props.height}
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
        />
      )}
      {props.icon == 'illustration-sports' && (
        <IllustrationSports
          width={props.width}
          height={props.height}
          fill={props.fill}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
        />
      )}
    </>
  )
}

Icon.defaultProps = defaultProps
