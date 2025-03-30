import { Typography } from "@mui/material";
import { TodaysPicks } from "../interfaces/TodaysPicks.interfaces";

export const OptionsTitle = (props: {
  todaysOptions: TodaysPicks[] | null;
}) => {
  const { todaysOptions } = props;

  const todaysCompliment = () => {
    if (todaysOptions?.length === 1) {
      return "Today's Compliment";
    } else {
      return "Today's Compliments";
    }
  }

  return (
    <>
      <Typography
        paddingTop={4}
        fontWeight={0}
        fontFamily="monospace"
        fontSize="0.9rem"
      >
        {todaysCompliment()}
      </Typography>
    </>
  );
}