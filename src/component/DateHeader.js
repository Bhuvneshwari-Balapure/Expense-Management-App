import { Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function DateHeader({ onSelectMonth }) {
  const year = new Date().getFullYear(); // current year
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    new Date().getMonth(),
  );

  const selectMonth = index => {
    setSelectedMonthIndex(index);

    const monthNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

    onSelectMonth(`${year}-${monthNumber}`); // send month to parent
  };

  return (
    <ScrollView
      horizontal
      // style={{ paddingVertical: 5 }}
      showsHorizontalScrollIndicator={false}
    >
      {months.map((mon, index) => (
        <TouchableOpacity key={index} onPress={() => selectMonth(index)}>
          <Text
            style={[
              styles.monthStyle,
              selectedMonthIndex === index && styles.selected,
            ]}
          >
            {mon} {year}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  monthStyle: {
    color: '#ccc',
    marginHorizontal: 20,
    fontSize: 18,
  },
  selected: {
    color: 'white',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
});
