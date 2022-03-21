import React from 'react'
import { View } from 'react-native'
import {
  BookIcon,
  CheckboxIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  IllustrationSports,
} from '../Assets'

export type iconType =
  | 'book'
  | 'checkbox'
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'illustration-sports'

interface IconProps {
  icon: iconType
  width: string | number
  height: string | number
  fill?: string | number
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
      {props.icon == 'book' && <BookIcon width={props.width} height={props.height} fill={props.fill} />}
      {props.icon == 'checkbox' && <CheckboxIcon width={props.width} height={props.height} fill={props.fill} />}
      {props.icon == 'chevron-up' && <ChevronUpIcon width={props.width} height={props.height} fill={props.fill} />}
      {props.icon == 'chevron-down' && <ChevronDownIcon width={props.width} height={props.height} fill={props.fill} />}
      {props.icon == 'chevron-left' && <ChevronLeftIcon width={props.width} height={props.height} fill={props.fill} />}
      {props.icon == 'chevron-right' && (
        <ChevronRightIcon width={props.width} height={props.height} fill={props.fill} />
      )}
      {props.icon == 'illustration-sports' && (
        <IllustrationSports width={props.width} height={props.height} fill={props.fill} />
      )}
    </>
  )
}

Icon.defaultProps = defaultProps
