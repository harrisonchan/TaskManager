import React from 'react'
import { StyleSheet } from 'react-native'
import { ScaledSheet, verticalScale } from 'react-native-size-matters'

const Styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8),
    marginLeft: verticalScale(8),
    marginRight: verticalScale(8),
  },
  cardRadius: {
    borderRadius: 10,
  },
})

export default Styles
