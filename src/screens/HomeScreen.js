import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateHeader from '../component/DateHeader';
import BalanceCard from '../component/BalanceCard';
import AddCategory from '../component/AddCategory';
import CategoryList from '../component/CategoryList';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import BottomBar from '../component/BottomBar';
export default function HomeScreen() {
  const [categories, setCategories] = React.useState([]);
  const [expenseData, setexpenseData] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState('');
  const navigation = useNavigation();
  React.useEffect(() => {
    loadCategory();
    loadExpense();
    // clearData();
  }, [categories, expenseData]);
  // const clearData = async () => {
  //   await AsyncStorage.clear();
  // };
  const loadCategory = async () => {
    let data = await AsyncStorage.getItem('catList');
    if (data) {
      setCategories(JSON.parse(data));
    }
    // console.log('Home Screen Category', categories);
  };

  const loadExpense = async () => {
    let ExpenseData = await AsyncStorage.getItem('expenseList');
    if (ExpenseData) {
      setexpenseData(JSON.parse(ExpenseData));
    }
    // console.log('Expense Data From Home Screen: ', expenseData);
  };
  const filterdCategory = categories.filter(d =>
    selectedMonth ? d.createdAt.startsWith(selectedMonth) : true,
  );
  const selectedCategoryIds = filterdCategory.map(c => c.id);

  // 3. Filter expenses whose CategoryName matches selected month categories
  const filteredExpenses = expenseData.filter(exp =>
    selectedCategoryIds.includes(exp.CategoryName),
  );

  const MonthlyBalance = filteredExpenses.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  return (
    <View style={styles.home}>
      <DateHeader onSelectMonth={setSelectedMonth} />
      <BalanceCard total={MonthlyBalance} />
      <AddCategory />
      <CategoryList
        categories={categories.filter(c =>
          selectedMonth ? c.createdAt.startsWith(selectedMonth) : true,
        )}
        expense={expenseData}
      />
      {/* <BottomBar /> */}
      <TouchableOpacity
        style={styles.bottomBtn}
        onPress={() => navigation.navigate('AddExpense', { categories })}
      >
        <Text style={{ color: 'white', fontSize: 40 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: 'gray',
  },
  bottomBtn: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#b5b5b5ff',
    width: 60,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
