import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState, useLayoutEffect } from 'react';
export default function ExpenseList() {
  const route = useRoute();
  const { list, categories, categoryName } = route.params;
  const navigation = useNavigation();
  //  list particular category ke expense ki list h
  console.log('categories from expense list  : ', categories);
  console.log('expense from expense list  : ', list);
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: categoryName });
  }, [categoryName]);
  return (
    <View style={styles.expenseList}>
      {/* <Text>Expense list</Text> */}
      <View style={styles.box}>
        <FlatList
          data={list}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const category = categories.find(d => d.id === item.categoryName);
            const getdate = new Date(Number(item.id));
            const d = getdate.getDate();
            const m = getdate.getMonth() + 1;
            const y = getdate.getFullYear();

            return (
              <View>
                <View style={styles.expense}>
                  <View>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      {item.expenseName}
                    </Text>
                    <Text style={{ color: '#7a7a7aff', fontWeight: 'bold' }}>
                      {d}/{m}/{y}
                    </Text>
                  </View>

                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    ${item.amount}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  expenseList: {
    flex: 1,
    backgroundColor: 'gray',
    padding: 30,
  },
  box: {
    backgroundColor: '#afaeaeff',
    padding: 10,
    borderRadius: 8,
  },
  expense: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
  },
});
