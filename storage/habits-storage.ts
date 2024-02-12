import { DataStorage } from "@/types/Storage";
import { Habit } from "@/types/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "myHabits:habits";

export const HabitStorage = new (class Persistant
  implements DataStorage<Habit>
{
  private serialize(items: Habit[]) {
    return JSON.stringify(items);
  }
  private deserialize(habits: Habit[]) {
    return habits.map((habit) => {
      if (habit.schedule.type === "single") {
        habit.schedule.date = new Date(habit.schedule.date);
      }

      if (habit.schedule.type === "daily") {
        habit.schedule.time = new Date(habit.schedule.time);
      }

      if (habit.schedule.type === "weekly") {
        habit.schedule.time = new Date(habit.schedule.time);
      }
      return habit;
    });
  }
  async getAll() {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }

    const value: Habit[] = this.deserialize(JSON.parse(data));
    return value;
  }
  async sync(items: Habit[]) {
    if (items.length < 1) {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return;
    }

    await AsyncStorage.setItem(STORAGE_KEY, this.serialize(items));
  }
})();
