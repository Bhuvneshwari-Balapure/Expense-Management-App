import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

export default function ButtonFile({
  title = '',
  type = 'operator' | 'number',
  onPress = Function,
}) {
  return (
    <View>
      <TouchableOpacity
        style={{
          flex: 1,
          color: 'white',
          fontWeight: 'bold',
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
          backgroundColor: 'gray',
          borderRadius: 25,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            // backgroundColor: 'gray',

            border: 1,
            boderColor: 'black',
            padding: 5,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
