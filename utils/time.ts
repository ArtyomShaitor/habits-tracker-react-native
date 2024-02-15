import type { Day } from "@/types/Dates";

const DAYS_OF_WEEK: Day[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const getNow = () => new Date();

export const getTimeString = (date: Date): string => {
  // Get the hours and minutes from the date object
  const hours = date.getHours().toString().padStart(2, "0"); // Ensure two digits
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits

  // Format the time as "XX:YY"
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
};

export const getDateString = (date: Date): string => {
  // Get the year, month, and day from the date object
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
  const day = date.getDate().toString().padStart(2, "0"); // Ensure two digits

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const isToday = (date: Date | Day, todayDate: Date = getNow()) => {
  if (date instanceof Date) {
    const todayFormatted = getDateString(todayDate);
    const dateFormatted = getDateString(date);

    return todayFormatted === dateFormatted;
  } else {
    const todayIndex = todayDate.getDay();

    const dayIndex = DAYS_OF_WEEK.indexOf(date);
    if (dayIndex < 0) {
      throw new Error(
        `the date must be on of the: ${DAYS_OF_WEEK}. Got ${date} instead`,
      );
    }
    return todayIndex === dayIndex;
  }
};
