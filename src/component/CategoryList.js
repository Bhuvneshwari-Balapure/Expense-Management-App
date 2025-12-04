import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  TextInput,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export default function CategoryList({ categories, expense }) {
  const navigation = useNavigation();
  const [particularList, setParticularList] = React.useState([]);
  const [filter, setfilter] = React.useState([]);
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    setfilter(categories);
  }, [categories]);
  const openExpense = item => {
    // alert(id);
    const list = expense.filter(i => i.CategoryName === item.id);
    setParticularList(list);

    // console.log('particular list', particularList);
    navigation.navigate('ExpenseList', {
      list: list,
      categories: categories,
      categoryName: item.name,
    });
    console.log(list);
  };
  const handleSearch = text => {
    setSearch(text);
    let keyboard = text.toLowerCase().trim();
    if (keyboard === '') {
      setfilter(categories);
      return;
    } else {
      let filtered = categories.filter(i =>
        i.name.toLowerCase().includes(keyboard),
      );

      setfilter(filtered);
    }
  };
  return (
    // <ScrollView>
    <View style={{ flex: 1 }}>
      {' '}
      <View style={{ justifyContent: 'start', alignItems: 'center' }}>
        <TextInput
          placeholder="Search Category"
          placeholderTextColor="white"
          style={{
            backgroundColor: '#a4a3a3ff',
            color: 'white',
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 20,
            fontSize: 17,
            width: Dimensions.get('screen').width - 40,
            // height: 80,
          }}
          value={search}
          onChangeText={text => handleSearch(text)}
        />
      </View>
      <FlatList
        data={filter}
        keyExtractor={i => i.id}
        style={styles.flatlist}
        renderItem={({ item }) => {
          const total = expense
            .filter(i => i.CategoryName === item.id)
            .reduce((sum, i) => sum + i.amount, 0);
          return (
            <View style={styles.categoryList}>
              <View style={styles.catList}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {item.name}
                </Text>
                <View style={styles.Add}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    -${total}
                  </Text>
                  <Text
                    onPress={() => openExpense(item)}
                    style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}
                  >
                    +
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>

    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  flatlist: {
    marginVertical: 10,
    marginBottom: 60,
  },
  categoryList: {
    flexDirection: 'column',
    justifyContent: 'start',
    marginHorizontal: 30,
    marginBottom: 10,
  },
  catList: {
    backgroundColor: '#acababff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Add: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
});
