import { getDateString, getTimeString, isToday, getNow } from "../time";

jest.mock("../time", () => ({
  ...jest.requireActual("../time"),
  getNow: jest.fn(() => new Date("2024-01-02 12:00")),
}));

describe("getTimeString", () => {
  it("should return time in HH:MM (24h format)", () => {
    const date = new Date("2024-01-01 09:58");

    expect(getTimeString(date)).toBe("09:58");
  });

  it("should return time in HH:MM (12h format)", () => {
    const date = new Date("2024-01-01 09:58 PM");

    expect(getTimeString(date)).toBe("21:58");
  });
});

describe("getDateString", () => {
  it("should return date string in YYYY-MM-DD format for different date formats", () => {
    const formats = [
      "2024-01-01", // simple date
      "2024-01-01 09:58", // date with time
      "2024-1-1", // date without leading zero
    ];

    formats.forEach((format) => {
      const date = new Date(format);

      expect(getDateString(date)).toBe("2024-01-01");
    });
  });
});

describe("isToday (mock the today's date as 2th January 2024", () => {
  beforeEach(() => {
    jest.mock("../time", () => ({
      ...jest.requireActual("../time"),
      getNow: jest.fn(() => new Date("2024-01-02 12:00")),
    }));
  });

  it("should return true if today's date was passed", () => {
    const today = getNow();
    const date = getNow();
    // let's add 1 hour difference between "today" date and current date
    date.setHours(date.getHours() + 1);
    expect(isToday(date, today)).toBe(true);
  });

  it("should return false if not today's date was passed", () => {
    const today = getNow();
    const date = getNow();
    // let's add 1 hour difference between "today" date and current date
    date.setDate(date.getDate() + 1);
    expect(isToday(date, today)).toBe(false);
  });
});
