import { Typography } from "@mui/material";

export const TitleMessage = (props: {
  titleMessage: string | null
}) => {
  const { titleMessage } = props;
  return (
    <Typography
      variant="subtitle2"
      color="grey.300"
      fontFamily="Courier New"
      fontSize="1.1rem"
    >
      {titleMessage}
    </Typography>
  );
}