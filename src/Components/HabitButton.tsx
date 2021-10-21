import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from './Icon'

interface HabitButtonProps {
  title: String
}

export const HabitButton: React.FC<HabitButtonProps> = (props) => {
  return (
    <View>
      <TouchableOpacity style={{ borderWidth: 1, borderColor: 'red' }}>
        <Icon icon="book" width={60} height={60} />
      </TouchableOpacity>
      <Text>{props.title}</Text>
    </View>
  )
}
