import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
// import NewFile from "./src/component/NewFile";
function App() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />

        {/* <NewFile /> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
