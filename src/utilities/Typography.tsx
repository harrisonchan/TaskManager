import React from 'react'
import { Text } from 'react-native'
import { TextStyles } from '../Assets/Styles'

const Typography = () => {
  return (
    <>
      <Text style={TextStyles.largeTitle}>Large Title</Text>
      <Text style={TextStyles.title1}>Title 1</Text>
      <Text style={TextStyles.title2}>Title 2</Text>
      <Text style={TextStyles.title3}>Title 3</Text>
      <Text style={TextStyles.headline}>Headline</Text>
      <Text style={TextStyles.body}>Body</Text>
      <Text style={TextStyles.callout}>Callout</Text>
      <Text style={TextStyles.subhead}>Subhead</Text>
      <Text style={TextStyles.footnote}>Footnote</Text>
      <Text style={TextStyles.caption1}>Caption 1</Text>
      <Text style={TextStyles.caption2}>Caption 2</Text>
    </>
  )
}

export default Typography
