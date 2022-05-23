import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COMPONENT_WIDTH1, COMPONENT_WIDTH2, Styles } from '../../Assets'
import { Calendar } from '../../Components/Calendar'
// import CalendarFlatlistTest from '../../Components/CalendarOld/CalendarFlatlistTest'

const TestScreen = () => {
  const insets = useSafeAreaInsets()

  const [calendarDate, setCalendarDate] = useState(dayjs())
  return (
    <View style={[Styles.screenContainer, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
      {/* <Calendar calendarDimensions={COMPONENT_WIDTH1} /> */}
      {/* <CalendarFlatlistTest calendarDimensions={COMPONENT_WIDTH1} /> */}
      <Text>{calendarDate.format('MM/YYYY')}</Text>
      <Calendar
        calendarMode="monthly"
        dimensions={COMPONENT_WIDTH1}
        monthlyCalendarDimensions={COMPONENT_WIDTH2}
        initialDate={calendarDate}
        // style={{ backgroundColor: 'beige' }}
        monthlyCalendarDateSelectionViewMonthStyle={{ backgroundColor: '#B4BACC' }}
        onChangeDate={(date) => setCalendarDate(date)}
      />
    </View>
  )
}

export default TestScreen
