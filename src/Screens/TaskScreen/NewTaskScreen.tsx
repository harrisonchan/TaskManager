import React, { useState } from 'react'
import { Text, SafeAreaView, TextInput, ScrollView } from 'react-native'

const NewTaskScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardDismissMode="on-drag">
        <Text>Create a New Task</Text>
        <TextInput placeholder="Task Title" />
        <TextInput placeholder="Task Description" />
        <TextInput placeholder="Task Description" />
        <Text>Due Date</Text>
        <Text>Reminder</Text>
        <Text>Repeat</Text>
        <Text>Category/Tag</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NewTaskScreen
