import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "@/screens/HomeScreen";
import { HabitsListScreen } from "@/screens/HabitsListScreen";
import { HabitDetailsScreen } from "@/screens/HabitDetailsScreen";
import { DummyTasksProvider } from "./hooks/useDummyTasks";
import { DummyHabitsProvider } from "./hooks/useDummyHabits";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <DummyHabitsProvider>
        <DummyTasksProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="HabitsList" component={HabitsListScreen} />
              </Stack.Group>
              <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                  name="HabitDetails"
                  // @ts-ignore
                  component={HabitDetailsScreen}
                  options={{ headerTitle: "Details" }}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </DummyTasksProvider>
      </DummyHabitsProvider>
    </>
  );
}
