import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseModal from '../component/AddExpenseModal';
import ExpenseList from '../component/ExpenseList';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseModal}
        options={{
          title: 'Add Expenses',
          headerShown: true,
          headerStyle: { backgroundColor: '#5e5e5eff' },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="ExpenseList"
        component={ExpenseList}
        options={{
          title: 'Expense List',
          headerShown: true,
          headerStyle: { backgroundColor: '#5e5e5eff' },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}
