import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import moment from 'moment';

const CalendarComponent: React.FC = () => {
  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const { width } = useWindowDimensions();

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={[styles.container, width > 768 ? styles.containerDesktop : {}]}>
      <Calendar
        style={{height:800, width:900, fonteSize:20}}
        current={today}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: '#9128E2',
          },
        }}
        theme={{
          selectedDayBackgroundColor: '#9128E2',
          todayTextColor: '#9128E2',
          arrowColor: '#9128E2',
        }}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 500,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDesktop: {
    
    width: 500,
    alignSelf: 'center',
    marginTop: 32,
  },
});

export default CalendarComponent;
