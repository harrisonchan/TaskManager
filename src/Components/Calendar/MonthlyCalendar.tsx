import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import React, { useEffect, useRef, useState, memo, RefObject } from 'react'
import { TouchableOpacity, View, Text, FlatList, ViewStyle, RegisteredStyle } from 'react-native'
import { ColorPalette, Styles, TextStyles } from '../../Assets'
import { MonthlyDateSlider } from './DateSlider'

dayjs.extend(localeData)

interface MonthlyCalendarItemProps {
  title?: string | number
  itemWidth?: number
  itemHeight?: number
  itemValue?: dayjs.Dayjs
  testProp?: boolean
  selectable: boolean
}

const MonthlyCalendarItem: React.FC<MonthlyCalendarItemProps> = (props) => {
  const [isSelected, setIsSelected] = useState(false)
  return (
    <TouchableOpacity
      style={{
        height: props.itemHeight && props.itemHeight,
        width: props.itemWidth && props.itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected && props.selectable ? ColorPalette.primaryColor : 'transparent',
      }}
      onPress={() => {
        if (props.selectable) {
          setIsSelected(!isSelected)
        }
      }}
      // onPressIn={() => setIsSelected(true)}
      // onPressOut={() => setIsSelected(false)}
      activeOpacity={1}>
      <Text style={[TextStyles.body, props.testProp && { color: 'red' }]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

interface WeekdaysHeaderProps {
  dimensions: number
}

const WeekdaysHeader = memo((props: WeekdaysHeaderProps) => {
  const weekdays = Array.from(dayjs.weekdaysMin(), (weekday) => weekday[0])
  return (
    <View style={{ width: props.dimensions }}>
      <FlatList
        horizontal
        scrollEnabled={false}
        style={{ width: props.dimensions }}
        data={weekdays}
        keyExtractor={(weekday, index) => weekday + index.toString()}
        renderItem={({ item, index }) => (
          <MonthlyCalendarItem itemWidth={props.dimensions / 7} title={item} selectable={false} />
        )}
      />
    </View>
  )
})

interface MonthlyViewProps {
  dimensions: number
  date: dayjs.Dayjs
}

const MonthlyView = memo((props: MonthlyViewProps) => {
  // This is for the key extractor
  const [monthAndYear, setMonthAndYear] = useState(props.date.format('MM-YYYY'))
  const [daysOfMonth, setDaysOfMonth] = useState<string[]>([])
  const updateDaysOfMonth = () => {
    // Get the day of week at which the month starts so we can prepend empties to array
    const month1stDayOfWeek = props.date.startOf('month').day()
    const daysInMonth = props.date.daysInMonth()
    // Get remaining to we can append to fill array to length of 35
    const remainingEmptyDaysOfWeekInMonth = 42 - month1stDayOfWeek - daysInMonth
    let updatedDaysOfMonth: string[] = []
    if (month1stDayOfWeek >= 1) {
      updatedDaysOfMonth = updatedDaysOfMonth.concat(Array(month1stDayOfWeek).fill(''))
    }
    // We use +1 because arrays start at 0 unfortunately.
    updatedDaysOfMonth = updatedDaysOfMonth.concat(Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()))
    if (remainingEmptyDaysOfWeekInMonth >= 1) {
      updatedDaysOfMonth = updatedDaysOfMonth.concat(Array(remainingEmptyDaysOfWeekInMonth).fill(''))
    }
    setDaysOfMonth(updatedDaysOfMonth)
  }
  useEffect(() => {
    updateDaysOfMonth()
  }, [])
  useEffect(() => {
    updateDaysOfMonth()
  }, [props.date])
  return (
    <View style={{ width: props.dimensions }}>
      <FlatList
        initialNumToRender={42}
        numColumns={7}
        scrollEnabled={false}
        style={{ width: props.dimensions, flexWrap: 'wrap' }}
        data={daysOfMonth}
        keyExtractor={(item, index) => index.toString() + '.' + item + '-' + monthAndYear}
        renderItem={({ item, index }) => (
          <MonthlyCalendarItem
            title={item}
            itemWidth={props.dimensions / 7}
            itemHeight={props.dimensions / 7}
            selectable={item == '' ? false : true}
          />
          // <></>
        )}
      />
    </View>
  )
})

interface MonthlyCalendarDateSelectionViewProps {
  dimensions: number
  monthStyle?: ViewStyle | RegisteredStyle<ViewStyle>
  onPressMonth: (month: number) => void
}

const MonthlyCalendarDateSelectionView: React.FC<MonthlyCalendarDateSelectionViewProps> = (props) => {
  const months = dayjs.monthsShort()
  return (
    <View style={{ width: props.dimensions, height: props.dimensions }}>
      <FlatList
        numColumns={4}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={months}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => props.onPressMonth(index)}
            style={[
              {
                width: props.dimensions / 4,
                height: props.dimensions / 3.4,
                justifyContent: 'center',
                alignItems: 'center',
              },
              props.monthStyle,
            ]}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

// Edit: memo ain't working, will have to fix this later. Put everything back in MonthlyCalendar for now
// Had to refactor this into an individual component to use memo()
// interface WeekDaysHeaderAndCalendarViewProps {
//   dimensions: number
//   flatlistRef: RefObject<FlatList<any>>
//   calendarInitialScrollIndex: number
//   calendarUpdateMonthsFunction: Function
//   calendarData: dayjs.Dayjs[]
// }
// const WeekDaysHeaderAndCalendarView = memo((props: WeekDaysHeaderAndCalendarViewProps) => {
//   return (
//     <>
//       <WeekdaysHeader dimensions={props.dimensions} />
//       <FlatList
//         ref={props.flatlistRef}
//         bounces={false}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         getItemLayout={(data, index) => ({ length: props.dimensions, offset: props.dimensions * index, index })}
//         initialScrollIndex={props.calendarInitialScrollIndex}
//         decelerationRate="fast"
//         snapToAlignment="start"
//         snapToInterval={props.dimensions}
//         onScrollEndDrag={(e) => {
//           if (e.nativeEvent.targetContentOffset) {
//             const scrollIndex = e.nativeEvent.targetContentOffset?.x / props.dimensions
//             props.calendarUpdateMonthsFunction(Math.round(scrollIndex))
//           }
//         }}
//         data={props.calendarData}
//         keyExtractor={(item) => item.format('DD-MM-YYYY')}
//         renderItem={({ item }) => <MonthlyView dimensions={props.dimensions} date={item} />}
//       />
//     </>
//   )
// })

interface MonthlyCalendarProps {
  dimensions: number
  date: dayjs.Dayjs
  onChangeDate?: (date: dayjs.Dayjs) => void
  showDateSlider?: boolean
  onDateSliderNext?: () => void
  onDateSliderPrevious?: () => void
  dateSelectionViewMonthStyle?: ViewStyle | RegisteredStyle<ViewStyle>
  numMonthsToRender: number
}

export const MonthlyCalendar: React.FC<MonthlyCalendarProps> = (props) => {
  const [months, setMonths] = useState<dayjs.Dayjs[]>([])
  // Determines whether or not calendar will show the date selection (to select month/change year) view
  const [isSelectingDate, setIsSelectingDate] = useState(false)
  useEffect(() => {
    createMonthsArray(props.date)
  }, [])
  function createMonthsArray(date: dayjs.Dayjs) {
    let newMonthsArr: dayjs.Dayjs[] = [date]
    for (let i = 1; i <= props.numMonthsToRender; i++) {
      newMonthsArr.unshift(date.subtract(i, 'month'))
      newMonthsArr.push(date.add(i, 'month'))
    }
    setMonths(newMonthsArr)
  }
  useEffect(() => {
    if (months.length > 0) {
      const scrollIndex = props.numMonthsToRender - months[props.numMonthsToRender].diff(props.date, 'month')
      // If scrolled too far, create new array
      if (scrollIndex > months.length - 1) {
        createMonthsArray(props.date)
      } else {
        MonthlyCalendarFlatListRef.current?.scrollToIndex({ index: scrollIndex, animated: true })
        updateMonthsArr(scrollIndex)
      }
    }
  }, [props.date])
  const MonthlyCalendarFlatListRef = useRef<FlatList>(null)
  function updateMonthsArr(scrollIndex: number) {
    const difference = props.numMonthsToRender - scrollIndex
    let newMonthsArr: dayjs.Dayjs[] = months
    if (difference > 0) {
      newMonthsArr = newMonthsArr.slice(0, -difference)
      for (let i = 1; i <= Math.abs(difference); i++) {
        newMonthsArr.unshift(months[0].subtract(i, 'month'))
      }
    }
    // Checks for different < 0 and exclude difference == 0
    else if (difference < 0) {
      newMonthsArr = newMonthsArr.slice(Math.abs(difference), newMonthsArr.length)
      for (let i = 1; i <= Math.abs(difference); i++) {
        newMonthsArr.push(months[months.length - 1].add(i, 'month'))
      }
    }
    setMonths(newMonthsArr)
    MonthlyCalendarFlatListRef.current?.scrollToIndex({ index: props.numMonthsToRender, animated: false })
    props.onChangeDate && props.onChangeDate(newMonthsArr[props.numMonthsToRender])
  }
  useEffect(() => {
    months.length > 0 && props.onChangeDate && props.onChangeDate(months[props.numMonthsToRender])
  }, [months])
  return (
    <View style={{ width: props.dimensions, height: props.dimensions }}>
      {props.showDateSlider && (
        <MonthlyDateSlider
          containerStyle={Styles.marginBottom10}
          selectedDate={months.length > 0 ? months[props.numMonthsToRender] : props.date}
          isSelectingMonth={isSelectingDate}
          onPressNextMonth={() => {
            MonthlyCalendarFlatListRef.current?.scrollToIndex({ index: props.numMonthsToRender + 1, animated: true })
            updateMonthsArr(props.numMonthsToRender + 1)
          }}
          onPressPreviousMonth={() => {
            MonthlyCalendarFlatListRef.current?.scrollToIndex({ index: props.numMonthsToRender - 1, animated: true })
            updateMonthsArr(props.numMonthsToRender - 1)
          }}
          onPressNextYear={() => {
            createMonthsArray(months[props.numMonthsToRender].add(1, 'year'))
          }}
          onPressPreviousYear={() => {
            createMonthsArray(months[props.numMonthsToRender].subtract(1, 'year'))
          }}
          onPressDate={() => setIsSelectingDate(!isSelectingDate)}
        />
      )}
      {isSelectingDate ? (
        <MonthlyCalendarDateSelectionView
          dimensions={props.dimensions}
          monthStyle={props.dateSelectionViewMonthStyle}
          onPressMonth={(newSelectedMonth) => {
            const newSelectedDate = months[props.numMonthsToRender].set('month', newSelectedMonth)
            const newSelectedMonthIsInMonths = months.indexOf(newSelectedDate)
            if (newSelectedMonthIsInMonths != -1) {
              updateMonthsArr(newSelectedMonthIsInMonths)
            } else {
              createMonthsArray(newSelectedDate)
              setIsSelectingDate(false)
            }
          }}
        />
      ) : (
        // <WeekDaysHeaderAndCalendarView
        //   dimensions={props.dimensions}
        //   flatlistRef={MonthlyCalendarFlatListRef}
        //   calendarData={months}
        //   calendarInitialScrollIndex={props.numMonthsToRender}
        //   calendarUpdateMonthsFunction={updateMonthsArr}
        // />
        <FlatList
          ref={MonthlyCalendarFlatListRef}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({ length: props.dimensions, offset: props.dimensions * index, index })}
          initialScrollIndex={props.numMonthsToRender}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={props.dimensions}
          onScrollEndDrag={(e) => {
            if (e.nativeEvent.targetContentOffset) {
              const scrollIndex = e.nativeEvent.targetContentOffset?.x / props.dimensions
              updateMonthsArr(Math.round(scrollIndex))
            }
          }}
          data={months}
          keyExtractor={(item) => item.format('DD-MM-YYYY')}
          renderItem={({ item }) => (
            <>
              <WeekdaysHeader dimensions={props.dimensions} />
              <MonthlyView dimensions={props.dimensions} date={item} />
            </>
          )}
        />
      )}
    </View>
  )
}
