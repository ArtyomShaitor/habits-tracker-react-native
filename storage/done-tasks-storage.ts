import { DataStorage } from "@/types/Storage";
import { Task } from "@/types/Task";
import { getDateString, getNow } from "@/utils/time";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "myHabits:done-tasks";
const StorageKey = (date: Date) => `${PREFIX}:${getDateString(date)}`;

type DoneTaskId = Task["id"];

export const DoneTasksStorage = new (class Persistant
  implements DataStorage<DoneTaskId>
{
  private getStorageKey() {
    const date = getNow();
    return StorageKey(date);
  }
  private async prune() {
    const storageKey = this.getStorageKey();
    const keys = (await AsyncStorage.getAllKeys()).filter(
      (key) => key.startsWith(PREFIX) && key !== storageKey,
    );
    await AsyncStorage.multiRemove(keys);
  }
  async getAll() {
    const data = await AsyncStorage.getItem(this.getStorageKey());
    if (!data) {
      return [];
    }
    const value: DoneTaskId[] = JSON.parse(data);

    return value;
  }
  async sync(items: DoneTaskId[]) {
    this.prune();
    const storageKey = this.getStorageKey();
    if (items.length < 1) {
      await AsyncStorage.removeItem(storageKey);
      return;
    }
    await AsyncStorage.setItem(storageKey, JSON.stringify(items));
  }
})();
