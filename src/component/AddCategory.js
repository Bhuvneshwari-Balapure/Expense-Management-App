import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Addcategory() {
  const [categoryName, setCategoryName] = React.useState('');
  const [categories, setCategories] = React.useState([]);

  const AddCategoryName = async () => {
    if (categoryName === '') {
      alert('Enter Category');
      return;
    }
    const newCategory = {
      id: Date.now().toString(),
      name: categoryName,
      createdAt: new Date().toISOString().split('T')[0],
    };
    let OldList = await AsyncStorage.getItem('catList');
    let catList = OldList ? JSON.parse(OldList) : [];
    catList.push(newCategory);
    setCategories(catList);
    await AsyncStorage.setItem('catList', JSON.stringify(catList));
    alert('Category Added Successfully...');
    console.log('category list : ', catList);
    setCategoryName('');
  };
  return (
    <View style={styles.addCategory}>
      <TextInput
        placeholder="Create new Category"
        color="white"
        style={styles.InputField}
        value={categoryName}
        placeholderTextColor={'white'}
        onChangeText={setCategoryName}
      />
      <TouchableOpacity onPress={AddCategoryName}>
        <Text style={{ color: 'white', fontSize: 27 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  addCategory: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  InputField: {
    padding: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,

    borderBottomColor: '#9f9c9cff',
  },
});
