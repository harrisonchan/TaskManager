import dayjs from 'dayjs'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DEFAULT_WIDTH, SCREEN_WIDTH, Styles } from '../../Assets'
import { Calendar } from '../../Components/Calendar'
import CalendarFlatlistTest from '../../Components/CalendarOld/CalendarFlatlistTest'

const TestScreen = () => {
  const insets = useSafeAreaInsets()
  return (
    <View style={[Styles.screenContainer, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
      {/* <Calendar calendarDimensions={DEFAULT_WIDTH} /> */}
      {/* <CalendarFlatlistTest calendarDimensions={DEFAULT_WIDTH} /> */}
      <Calendar calendarMode="monthly" dimensions={DEFAULT_WIDTH * 0.9} initialDate={dayjs()} />
    </View>
  )
}

export default TestScreen
