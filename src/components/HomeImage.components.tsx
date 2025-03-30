import { Box } from "@mui/material";

export const HomeImage = (props: { image: string | null}) => {
  const { image } = props;

  return (
    <Box
      component="img"
      src={image ? image : "Nothing"}
      alt="Flowers"
      sx={{
        width: '150px',
        height: '240px',
        borderRadius: '10px',
        marginTop: 1,
        boxShadow: '0px 2px 8px rgba(64, 64, 64, 0.7)',
      }}
    />
  );
}