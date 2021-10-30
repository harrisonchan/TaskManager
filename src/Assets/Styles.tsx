import React from 'react'
import { StyleSheet } from 'react-native'
import { ScaledSheet, verticalScale } from 'react-native-size-matters'

export const ColorPalette = {
  lightGreen: '#C9E4CA',
  black: '#0B2027',
  fireOpal: '#DD614A',
  darkGreen: '#6A7B76',
  lightBlue: '#4A85DD',
  transparentGray: '#E9EBF3',
  lightGray: '#B9B9B9',
  steelGray: '#AAB6C7',
}

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
