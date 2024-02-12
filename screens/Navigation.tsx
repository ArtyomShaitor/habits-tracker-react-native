import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "@/screens/HomeScreen";
import { HabitsListScreen } from "@/screens/HabitsListScreen";
import { HabitDetailsScreen } from "@/screens/HabitDetailsScreen";
import { SelectOptionScreen } from "@/screens/SelectOptionScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
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
            options={{
              headerTitle: "Details",
            }}
          />
          <Stack.Screen
            name="SelectOption"
            // @ts-ignore
            component={SelectOptionScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
