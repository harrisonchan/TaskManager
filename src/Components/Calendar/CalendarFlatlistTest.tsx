import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import MonthlyCalendar from './MonthlyCalendar'
import { SCREEN_WIDTH } from '../../utilities/Constants'
import { FlatList, RefreshControlBase, Text, View } from 'react-native'

interface CalendarProps {
  calendarDimensions?: number
  selectedMonth?: dayjs.Dayjs
}

const MONTHS_RENDER_AMOUNT = 24

const CalendarFlatlistTest: React.FC<CalendarProps> = (props) => {
  const [dimensions, setDimensions] = useState(props.calendarDimensions ? props.calendarDimensions : SCREEN_WIDTH)
  const [selectedMonth, setSelectedMonth] = useState(props.selectedMonth ? props.selectedMonth : dayjs())
  // const [currentPosition, setCurrentPosition] = useState(1)
  const [monthsToRender, setMonthsToRender] = useState<dayjs.Dayjs[]>([])
  // const pagerViewRef = useRef<PagerView>(null)
  const FlatListRef = useRef<FlatList>(null)

  useEffect(() => {
    setMonthsToRender([])
    setMonthsToRender([selectedMonth])
    for (let i = 1; i <= MONTHS_RENDER_AMOUNT / 2; i++) {
      setMonthsToRender((prevState) => [selectedMonth.add(-i, 'M'), ...prevState])
    }
    for (let i = 1; i <= MONTHS_RENDER_AMOUNT / 2; i++) {
      setMonthsToRender((prevState) => [...prevState, selectedMonth.add(i, 'M')])
    }
    // FlatListRef.current?.scrollToItem({ animated: false, item: 25 })
    // FlatListRef.current?.scrollToIndex({ animated: false, index: 1 })
  }, [selectedMonth])

  const changeCurrentMonthShown = (scrollX: number | undefined) => {
    if (props.calendarDimensions) {
      if (scrollX == 0 || scrollX == props.calendarDimensions * MONTHS_RENDER_AMOUNT) {
        scrollX == 0
          ? setSelectedMonth(selectedMonth.add(-MONTHS_RENDER_AMOUNT, 'M'))
          : setSelectedMonth(selectedMonth.add(24, 'M'))
        FlatListRef.current?.scrollToIndex({ animated: false, index: MONTHS_RENDER_AMOUNT / 2 })
      }
    } else {
      if (scrollX == 0 || scrollX == SCREEN_WIDTH * MONTHS_RENDER_AMOUNT) {
        scrollX == 0
          ? setSelectedMonth(selectedMonth.add(-MONTHS_RENDER_AMOUNT, 'M'))
          : setSelectedMonth(selectedMonth.add(24, 'M'))
        FlatListRef.current?.scrollToIndex({ animated: false, index: MONTHS_RENDER_AMOUNT / 2 })
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={FlatListRef}
        horizontal
        style={{
          width: dimensions,
          height: dimensions,
          // backgroundColor: 'red',
        }}
        bounces={false}
        data={monthsToRender}
        snapToInterval={dimensions}
        snapToAlignment="start"
        decelerationRate="fast"
        initialScrollIndex={MONTHS_RENDER_AMOUNT / 2}
        getItemLayout={(data, index) => ({
          length: dimensions,
          offset: props.calendarDimensions ? props.calendarDimensions * index : SCREEN_WIDTH * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {/* <MonthlyDateSlider selectedMonth={item} /> */}
            <MonthlyCalendar
              selectedMonth={item}
              width={dimensions}
              height={dimensions}
              onChangeMonth={(selectedMonth) => setSelectedMonth(selectedMonth)}
            />
            <Text>{item.toString()}</Text>
          </View>
        )}
        onScrollEndDrag={(event) => changeCurrentMonthShown(event.nativeEvent.targetContentOffset?.x)}
      />
    </View>
  )
}

export default CalendarFlatlistTest
