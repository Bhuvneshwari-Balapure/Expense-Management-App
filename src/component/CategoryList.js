import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export default function CategoryList({ categories, expense }) {
  const navigation = useNavigation();
  const [particularList, setParticularList] = React.useState([]);

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
  return (
    // <ScrollView>

    <FlatList
      data={categories}
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
    // </ScrollView>
  );
}
const styles = StyleSheet.create({
  flatlist: {
    marginVertical: 10,
    marginBottom: 86,
  },
  categoryList: {
    flexDirection: 'column',
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
