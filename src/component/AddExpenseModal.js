import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExpenseModal() {
  const navigation = useNavigation();
  const route = useRoute();
  const { categories } = route.params;
  const [saveExpense, setSaveExpense] = React.useState({
    category: '',
    expenseName: '',
    amount: '',
  });

  const dropDown = categories.map(i => ({
    label: i.name,
    value: i.id,
  }));
  // console.log('Category From Expense page : ', dropDown);
  const handleChange = (name, value) => {
    setSaveExpense(values => ({ ...values, [name]: value }));
  };
  const handleSubmit = async () => {
    const { category, expenseName, amount } = saveExpense;
    if (!category || !expenseName || !amount) {
      alert('Please fill all the fields');
      return;
    } else {
      const newExpense = {
        id: Date.now().toString(),
        CategoryName: category,
        expenseName,
        amount: Number(amount),
      };
      let OldExpenseData = await AsyncStorage.getItem('expenseList');
      let ExpenseList = OldExpenseData ? JSON.parse(OldExpenseData) : [];
      ExpenseList.push(newExpense);
      await AsyncStorage.setItem('expenseList', JSON.stringify(ExpenseList));
      alert('Expense Saved Successfully...');
      setSaveExpense({
        category: '',
        expenseName: '',
        amount: '',
      });
      navigation.pop(1);

      // console.log('Expense List : ', ExpenseList);
    }
  };
  return (
    <View style={styles.AddExpense}>
      <View style={styles.ExpenseBox}>
        <Text style={styles.title}>Expense Modal</Text>
        <RNPickerSelect
          value={saveExpense.category}
          onValueChange={val => handleChange('category', val)}
          items={dropDown}
          placeholder={{ label: 'Select Category', value: '' }}
        />
        <TextInput
          placeholder="Enter Expense"
          placeholderTextColor="#fff"
          style={styles.input}
          value={saveExpense.expenseName}
          onChangeText={text => handleChange('expenseName', text)}
        />
        <TextInput
          placeholder="Enter Amount "
          placeholderTextColor="#fff"
          style={styles.input}
          value={saveExpense.amount}
          onChangeText={text => handleChange('amount', text)}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.saveBtn}>Save Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  AddExpense: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ExpenseBox: {
    borderWidth: 1,

    padding: 20,
    borderRadius: 30,
    borderColor: '#727171ff',
    paddingVertical: 50,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    AlignText: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#787878ff',
    padding: 8,
    borderRadius: 8,
    color: 'white',
    width: 250,
  },
  saveBtn: {
    backgroundColor: '#515050ff',
    padding: 14,
    borderRadius: 30,
    color: 'white',
    border: 2,
  },
});
