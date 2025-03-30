import { ImageTitleMessage } from "./ImageTitleMessage.interfaces";
import { TodaysPicks } from "./TodaysPicks.interfaces";

export interface IncomingData {
  id: number;
  day: string;
  showNext: boolean;
  data: ImageTitleMessage[]
  picks: TodaysPicks[]
}