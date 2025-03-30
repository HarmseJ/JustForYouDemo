import { GetFullDateAndDay } from "../interfaces/GetDateAndDay.interfaces";

export default function GetTime(): GetFullDateAndDay {
  const date = new Date();
  const timezone = { timeZone: "America/New_York" };

  const fullDate = date.toLocaleDateString("en-US", timezone);
  const day = date.toLocaleDateString("en-US", { ...timezone, weekday: "long" });

  return { fullDate, day };
}