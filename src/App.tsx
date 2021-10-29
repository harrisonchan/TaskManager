import React, { useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from './Screens'
import { store } from './redux'
import { NewTask } from './Screens/Task'
import { Calendar, MonthlyCalendar } from './Components/Calendar'
import dayjs from 'dayjs'

function SettingsScreen() {
  const [selectedMonth, setSelectedMonth] = useState(dayjs('2021-03-10'))
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Calendar calendarDimensions={350} />
      </View>
    </SafeAreaView>
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
