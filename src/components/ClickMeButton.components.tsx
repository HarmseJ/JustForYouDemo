import { Button, Typography } from "@mui/material";
import { JSX } from "react";

export const ClickMeButton = (props: {
  handleClickOpen: () => void;
}): JSX.Element => {
  const { handleClickOpen } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClickOpen}
      sx={{
        width: '200px',
        height: '40px',
        marginTop: 1.5,
        backgroundColor: 'rgba(22, 37, 55, 0.63)',
        borderRadius: '10px',
      }}
    >
      <Typography
        sx={{
          fontSize: '1.1rem',
          color: 'white',
          fontFamily: "Dancing Script",
          textTransform: 'none' 
        }}
      >
        Message
      </Typography>
    </Button>
  );
}