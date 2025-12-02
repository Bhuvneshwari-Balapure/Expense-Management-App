import {
  Button,
  FlatList,
  TextInput,
  View,
  Text,
  Modal,
  Alert,
} from 'react-native';
import ButtonFile from './ButtonFile';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function NewFile() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState('');
  const key = [
    'C',
    'X',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '00',
    '=',
  ];
  const getType = item => {
    if (!isNaN(item) || item === '.' || item === '00') {
      return 'number';
    } else {
      return 'operator';
    }
  };
  const handlePress = item => {
    // Alert.alert('Button Pressed', getType(item));
    if (item === 'C') {
      setValue1('');
      setValue2('');
      setOperator('');
      setResult('');
    } else if (item === 'X') {
      handleBackspace();
    } else if (item === '=') {
      handleCalculation();
    }
    if (getType(item) === 'number') {
      handleNumber(item);
    } else if (getType(item) === 'operator') {
      handleOperator(item);
    }
  };
  const handleNumber = num => {
    if (operator === '') {
      setValue1(value1 + num);
    } else {
      setValue2(value2 + num);
    }
  };
  const handleOperator = op => {
    if (value1 !== '') {
      setOperator(op);
    }
  };

  const handleBackspace = () => {
    if (value2 !== '') {
      setValue2(value2.slice(0, -1));
    } else if (operator !== '') {
      setOperator('');
    } else if (value1 !== '') {
      setValue1(value1.slice(0, -1));
    }
  };
  const handleCalculation = () => {
    let n1 = parseFloat(value1);
    let n2 = parseFloat(value2);
    let ans = 0;
    switch (operator) {
      case '+':
        ans = n1 + n2;
        break;
      case '-':
        ans = n1 - n2;
        break;
      case '*':
        ans = n1 * n2;
        break;
      case '/':
        ans = n1 / n2;
        break;
      case '%':
        ans = n1 % n2;
        break;
      default:
        return;
    }
    setResult(ans);
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'gray' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: 30,
        }}
      >
        <Text style={{ fontSize: 26, color: 'white' }}>
          {value1 + operator + value2}
        </Text>
        <Text style={{ fontSize: 30, color: 'white' }}>{result}</Text>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 90,
        }}
      >
        <FlatList
          data={key}
          numColumns={4}
          renderItem={({ item }) => {
            return (
              <ButtonFile
                title={item}
                type={
                  !isNaN(item) || item === '.' || item === '00'
                    ? 'number'
                    : 'operator'
                }
                onPress={() => {
                  handlePress(item);
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
}
