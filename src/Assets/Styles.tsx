import React from 'react'
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { moderateScale, ScaledSheet, verticalScale } from 'react-native-size-matters'

export const SCREEN_WIDTH = Dimensions.get('screen').width
export const SCREEN_HEIGHT = Dimensions.get('screen').height
export const COMPONENT_WIDTH1 = Dimensions.get('screen').width * 0.9
export const COMPONENT_WIDTH2 = Dimensions.get('screen').width * 0.8

export const ICON_DIMENSIONS = {
  SMALL: moderateScale(20),
  MEDIUM: moderateScale(45),
  LARGE: moderateScale(60),
}

export const ColorPalette = {
  black: '#0B2027',
  transparentGray: '#F3F3F3',
  lightGray: '#E8E8E8',
  darkGray: '#616161',
  steelGray: '#AAB6C7',
  primaryColor: '#9FB8AD', //Most dominant
  secondaryColor: '#F49097', //Backgrounds
  tertiaryColor: '#73648A', //Niche cases
  screenColor: '#FFFFFF',
  // lightGreen: '#C9E4CA',
  // fireOpal: '#DD614A',
  // darkGreen: '#6A7B76',
  // lightBlue: '#4A85DD',
}

const Styles = ScaledSheet.create({
  marginTop5: { marginTop: moderateScale(5) },
  marginBottom5: { marginBottom: moderateScale(5) },
  marginLeft5: { marginLeft: moderateScale(5) },
  marginRight5: { marginRight: moderateScale(5) },
  marginTop10: { marginTop: moderateScale(10) },
  marginBottom10: { marginBottom: moderateScale(10) },
  marginLeft10: { marginLeft: moderateScale(10) },
  marginRight10: { marginRight: moderateScale(10) },
  marginTop20: { marginTop: moderateScale(20) },
  marginBottom20: { marginBottom: moderateScale(20) },
  marginLeft20: { marginLeft: moderateScale(20) },
  marginRight20: { marginRight: moderateScale(20) },
  padding5: { padding: moderateScale(5) },
  padding10: { padding: moderateScale(10) },
  padding20: { padding: moderateScale(20) },
  flexRow: { flexDirection: 'row' },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: ColorPalette.screenColor,
  },
  cardContainer: {
    // marginTop: verticalScale(8),
    // marginBottom: verticalScale(8),
    // marginLeft: verticalScale(8),
    // marginRight: verticalScale(8),
    width: COMPONENT_WIDTH1,
    height: verticalScale(100),
    borderRadius: 10,
    padding: moderateScale(10),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
    flexDirection: 'row',
  },
  button: {
    marginTop: verticalScale(4),
    marginBottom: verticalScale(4),
    marginLeft: verticalScale(4),
    marginRight: verticalScale(4),
    backgroundColor: ColorPalette.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
  },
  wideButton: {
    width: COMPONENT_WIDTH1,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: 10,
  },
  defaultButton: {
    width: SCREEN_WIDTH * 0.55,
    height: SCREEN_HEIGHT * 0.05,
    borderRadius: 8,
  },
})

export const TextStyles = ScaledSheet.create({
  largeTitle: { fontSize: 33 },
  title1: { fontSize: 27, fontWeight: 'bold' },
  title2: { fontSize: 21, fontWeight: 'bold' },
  title3: { fontSize: 19, fontWeight: 'bold' },
  headline: { fontSize: 16, fontWeight: 'bold' },
  body: { fontSize: 14 },
  callout: { fontSize: 15 },
  subhead: { fontSize: 14, fontWeight: 'bold' },
  footnote: { fontSize: 12 },
  caption1: { fontSize: 11 },
  caption2: { fontSize: 11 },
  white: { color: 'white' },
  black: { color: 'black' },
  gray: { color: ColorPalette.lightGray },
  darkGray: { color: ColorPalette.darkGray },
  transparentGray: { color: ColorPalette.transparentGray },
})

export default Styles
