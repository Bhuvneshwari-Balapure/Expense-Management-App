import { View, Text, StyleSheet } from 'react-native';

export default function BalanceCard({ total }) {
  return (
    <View style={styles.BalanceCard}>
      <Text
        style={{ fontWeight: 'bold', color: 'white', paddingHorizontal: 5 }}
      >
        Balance{' '}
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'white',
          fontSize: 20,
          paddingHorizontal: 5,
        }}
      >
        ${total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  BalanceCard: {
    backgroundColor: '#acababff',

    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,

    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 50,
  },
});
