import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from './Screens'
import { store } from './redux'
import { NewTask } from './Screens/Task'
import { DateSlider, MonthlyCalendar } from './Components/Calendar'
import dayjs from 'dayjs'

function SettingsScreen() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs('2021-03-10'))
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <DateSlider selectedMonth={selectedMonth} />
      <MonthlyCalendar width={350} height={350} selectedMonth={selectedMonth} />
    </View>
  )
}

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Testing" component={SettingsScreen} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="New Task" component={NewTask} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
