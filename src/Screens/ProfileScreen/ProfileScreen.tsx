import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { Styles } from '../../Assets'
import { TextStyles, ColorPalette } from '../../Assets/Styles'
import { Button, List } from '../../Components'
import { Button1 } from '../../Components/Button1'

const ProfileScreen = () => {
  const test = [
    { itemText: 'iCloud', itemSecondaryText: 'testing', itemDestination: undefined },
    { itemText: 'Apple Calendar', itemDestination: undefined },
    { itemText: 'General Settings', itemDestination: undefined },
    { itemText: 'Theme', itemDestination: undefined },
    { itemText: 'Rating', itemDestination: undefined },
    { itemText: 'Support', itemDestination: undefined },
    { itemText: 'About the Project', itemDestination: undefined },
  ]
  return (
    <SafeAreaView style={Styles.container}>
      <List
        contentContainerStyle={{ alignItems: 'center', flex: 1 }}
        ListHeaderComponentStyle={{ marginBottom: moderateScale(15) }}
        ListHeaderComponent={
          <View style={{ alignItems: 'center' }}>
            <Text>Profile</Text>
            <Button buttonType="wide" buttonText="Sign Up" />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Do you have an account? </Text>
              <TouchableOpacity>
                <Text style={TextStyles.subhead}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        listData={test}
        ListFooterComponentStyle={{ marginTop: moderateScale(15) }}
        ListFooterComponent={
          <View>
            <TouchableOpacity>
              <Text style={{ color: ColorPalette.steelGray }}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  )
}

export default ProfileScreen
