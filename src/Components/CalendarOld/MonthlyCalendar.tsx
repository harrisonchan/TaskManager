import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import React, { ReactNode, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, ViewStyle, FlatList } from 'react-native'
import { ColorPalette, TextStyles } from '../../Assets'
dayjs.extend(localeData)

interface MonthlyDateSliderProps {
  selectedMonth: dayjs.Dayjs
  onPressPrevious?: () => void
  onPressNext?: () => void
  onPressDate?: () => void
  isSelectingMonth?: boolean
  containerStyle?: ViewStyle
}

const MonthlyDateSlider: React.FC<MonthlyDateSliderProps> = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  useEffect(() => {
    props.selectedMonth && setSelectedMonth(props.selectedMonth)
  }, [selectedMonth, props.selectedMonth])
  return (
    <View
      style={[{ flexDirection: 'row', justifyContent: 'space-between' }, props.containerStyle && props.containerStyle]}>
      <TouchableOpacity onPress={props.onPressPrevious}>
        <Text style={TextStyles.subhead}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressDate}>
        <Text style={TextStyles.subhead}>
          {props.isSelectingMonth ? selectedMonth.format('YYYY') : selectedMonth.format('MMMM YYYY')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressNext}>
        <Text style={TextStyles.subhead}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

interface MonthlyCalendarItemProps {
  title?: string | number
  itemWidth: number
  itemHeight: number
  itemValue?: dayjs.Dayjs
  testProp?: boolean
  selectable?: boolean
}

const MonthlyCalendarItem: React.FC<MonthlyCalendarItemProps> = (props) => {
  const [isSelected, setIsSelected] = useState(false)
  return (
    <TouchableOpacity
      style={{
        height: props.itemHeight,
        width: props.itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected && props.title != undefined ? ColorPalette.primaryColor : 'transparent',
      }}
      onPress={() => {
        if (props.selectable) {
          setIsSelected(!isSelected)
        }
      }}
      onPressIn={() => setIsSelected(true)}
      onPressOut={() => setIsSelected(false)}
      activeOpacity={1}>
      <Text style={[TextStyles.body, props.testProp && { color: 'red' }]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

interface MonthlyCalendarProps {
  width: number
  height: number
  selectedMonth?: dayjs.Dayjs
  onChangeMonth: (selectedMonth: dayjs.Dayjs) => void
  dateSliderContainerStyle?: ViewStyle
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const [selectedMonthDateView, setSelectedMonthDateView] = useState<ReactNode[]>([])
  const [isSelectingMonth, setIsSelectingMonth] = useState(false)

  //Weekdays Header (Sun, Mon, Tue, etc.)
  let weekdaysHeader = dayjs
    .weekdaysMin()
    .map((weekday, i) => (
      <MonthlyCalendarItem
        key={weekday}
        title={weekday.split('')[0]}
        itemWidth={props.width / 7}
        itemHeight={props.height / 6}
      />
    ))

  let monthsSelectionView = dayjs.monthsShort().map((month, i) => (
    <TouchableOpacity
      activeOpacity={0.6}
      key={month}
      style={{
        width: props.width / 4 - 10,
        height: props.height / 3,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: ColorPalette.tertiaryColor,
        borderRadius: 5,
      }}
      onPress={() => {
        props.onChangeMonth(selectedMonth.month(i))
        setIsSelectingMonth(false)
      }}>
      <Text style={[TextStyles.body, TextStyles.white]}>{month}</Text>
    </TouchableOpacity>
  ))

  useEffect(() => {
    props.selectedMonth && setSelectedMonth(props.selectedMonth)
    const numberOfDaysInSelectedMonth = selectedMonth.daysInMonth()
    const selectedMonth1stDayOfWeek = selectedMonth.startOf('month').day()
    setSelectedMonthDateView([])

    //Add filters for days of week before 1st day in month
    for (let i = 0; i < selectedMonth1stDayOfWeek; i++) {
      setSelectedMonthDateView((prevState) => [
        ...prevState,
        <MonthlyCalendarItem key={-i} itemWidth={props.width / 7} itemHeight={props.height / 7} selectable />,
      ])
    }
    for (let i = 1; i <= numberOfDaysInSelectedMonth; i++) {
      let dateOfMonth = selectedMonth.date(i)
      setSelectedMonthDateView((prevState) => [
        ...prevState,
        <MonthlyCalendarItem
          key={i}
          title={i}
          itemWidth={props.width / 7}
          itemHeight={props.height / 6}
          itemValue={dateOfMonth}
          selectable
        />,
      ])
    }

    //Change Array Element Example
    const dateToHighlight = 29
    if (dateToHighlight <= numberOfDaysInSelectedMonth) {
      setSelectedMonthDateView((prevState) => [
        ...prevState.slice(0, selectedMonth1stDayOfWeek + (dateToHighlight - 1)),
        <MonthlyCalendarItem
          key={dateToHighlight}
          title={dateToHighlight}
          itemWidth={props.width / 7}
          itemHeight={props.height / 6}
          itemValue={selectedMonth.date(selectedMonth1stDayOfWeek)}
          selectable
          testProp
        />,
        ...prevState.slice(selectedMonth1stDayOfWeek + 1 + (dateToHighlight - 1)),
      ])
    }
  }, [selectedMonth, props.selectedMonth])

  const monthView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: props.width,
          height: props.height,
        }}>
        {/* {isSelectingMonth ? (
          <>{monthsSelectionView}</>
          ) : (
        )} */}
        {/* <> */}
        {weekdaysHeader}
        {selectedMonthDateView}
        {/* </> */}
      </View>
    )
  }

  return (
    <View style={{ alignItems: 'stretch', justifyContent: 'center' }}>
      <MonthlyDateSlider
        containerStyle={props.dateSliderContainerStyle && props.dateSliderContainerStyle}
        selectedMonth={selectedMonth}
        onPressPrevious={() =>
          isSelectingMonth
            ? props.onChangeMonth(selectedMonth.add(-12, 'M'))
            : props.onChangeMonth(selectedMonth.add(-1, 'M'))
        }
        onPressNext={() =>
          isSelectingMonth
            ? props.onChangeMonth(selectedMonth.add(12, 'M'))
            : props.onChangeMonth(selectedMonth.add(1, 'M'))
        }
        onPressDate={() => setIsSelectingMonth(!isSelectingMonth)}
        isSelectingMonth={isSelectingMonth}
      />
      {isSelectingMonth ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: props.width, height: props.height }}>
          {monthsSelectionView}
        </View>
      ) : (
        <FlatList
          horizontal
          style={{ width: props.width, height: props.height }}
          // style = {}
          data={[{}, {}]}
          // keyExtractor={()=>}
          renderItem={(month) => monthView()}
        />
      )}
      {/* {monthView()} */}
    </View>
  )
}

export default MonthlyCalendar
