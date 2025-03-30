import { Typography } from "@mui/material";

export const DateTitle = (props: { fullDate: string }) => {
  const { fullDate } = props;

  return(
    <Typography 
      paddingBottom={1} 
      margin={0} 
      variant="body2" 
      color="white" 
      fontFamily={"Dancing Script"} 
      letterSpacing={5}>
          2/16/2025 - {fullDate}
      </Typography>
  );
}