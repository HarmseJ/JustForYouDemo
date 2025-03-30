import { Typography } from "@mui/material";

export const HomeTitle = (props: {
  todaysDate: string
}) => {
  const { todaysDate } = props;

  return(
    <Typography 
      paddingTop={2}
      margin={0} 
      variant="h3" 
      color="white" 
      fontFamily={"Dancing Script"} 
      letterSpacing={5}
    >
      {todaysDate}
    </Typography>
  );
}