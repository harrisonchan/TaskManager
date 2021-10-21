import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Styles } from '../Assets'

interface GoalsCardInterface {}

export const GoalsCard: React.FC<GoalsCardInterface> = () => {
  return (
    <TouchableOpacity style={[Styles.cardContainer, Styles.cardRadius, { backgroundColor: 'red' }]}>
      <Text>Java Learning</Text>
      <Text>20/40 Missions</Text>
      <Text>50%</Text>
      <View style={{ backgroundColor: 'gray', height: 10, width: 300 }}>
        <View style={{ backgroundColor: 'green', height: 10, width: 150 }} />
      </View>
    </TouchableOpacity>
  )
}
