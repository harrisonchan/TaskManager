import React from 'react'
import { Text, View, FlatList, FlatListProps } from 'react-native'
import ListItem from './ListItem'

interface ListProps extends Omit<FlatListProps<any>, 'data' | 'renderItem'> {
  listData: { itemText: string; itemSecondaryText?: string; itemDestination: undefined }[]
}

const List: React.FC<ListProps> = (props) => {
  return (
    <>
      <FlatList
        data={props.listData}
        renderItem={({ item }) => (
          <ListItem itemText={item.itemText} itemSecondaryText={item.itemSecondaryText} itemIcon="checkbox" />
        )}
        {...props}
      />
    </>
  )
}

export default List
