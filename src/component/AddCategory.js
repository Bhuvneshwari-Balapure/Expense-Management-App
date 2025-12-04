import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
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
    OldList = OldList ? JSON.parse(OldList) : [];
    let already = OldList.filter(
      i => i.name.toLowerCase().trim() === categoryName.toLowerCase().trim(),
    );

    if (already.length > 0) {
      alert('Category alerady Exist');
    } else {
      // let catList = OldList ? JSON.parse(OldList) : [];
      OldList.push(newCategory);
      setCategories(OldList);

      await AsyncStorage.setItem('catList', JSON.stringify(OldList));

      alert('Category Added Successfully...');
      console.log('category list : ', OldList);
      setCategoryName('');
    }
  };

  return (
    <View style={styles.main}>
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
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',

    justifyContent: 'flex-start',
    alignItems: 'start',
  },
  addCategory: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  InputField: {
    padding: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,

    borderBottomColor: '#9f9c9cff',
  },
});
