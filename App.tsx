import { StatusBar } from "expo-status-bar";
import { TasksProvider } from "./hooks/useTasks";
import { HabitsProvider } from "./hooks/useHabits";
import { Navigation } from "@/screens/Navigation";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <HabitsProvider>
        <TasksProvider>
          <Navigation />
        </TasksProvider>
      </HabitsProvider>
    </>
  );
}
