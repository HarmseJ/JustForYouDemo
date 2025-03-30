import { Stack, Avatar, Typography, Box } from "@mui/material";
import { TodaysPicks } from "../interfaces/TodaysPicks.interfaces";
import * as MuiIcons from "@mui/icons-material";

export const AvatarOptions = (props: {
  todaysOptions: TodaysPicks[] | null;
}) => {
  const { todaysOptions } = props;
  const Icons = MuiIcons as Record<string, MuiIcons.SvgIconComponent>;

  return (
    <Stack
      direction="row"
      spacing={1}
      marginBottom={5}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)",
        background: "linear-gradient(135deg,rgba(76, 107, 132, 0.41), #1a1a1a)",
        borderRadius: "25px",
        padding: "10px",
        marginTop: 1,
        minWidth: {
          xs: "50%",
          sm: "50%",
          md: "25%",
          lg: "25%"
        },
        maxWidth: {
          xs: "90%",
          sm: "90%",
          md: "30%",
          lg: "30%"
        },
        width: "fit-content",
      }}
    >
      {todaysOptions?.map((option, index) => {
        const IconComponent = Icons[option.iconName];

        return (
          <Box
            key={index}
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              width: "fit-content",
              height: "fit-content",
              maxHeight: "80px",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              borderRadius: "15px",
              userSelect: "none",
              // padding: "12px",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.05)",
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.035)",
                boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.6)",
              }
            }}
          >
            <Avatar
              sx={{
                width: "100px",
                height: "60px",
                background: `linear-gradient(135deg, rgb(10, 12, 17), #333)`,
                color: "white",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                borderRadius: 2
              }}
            >
              {IconComponent ? (
                <IconComponent
                  sx={{
                    fontSize: 40,
                  }}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: 40,
                  }}
                >
                  ?
                </Typography>
              )}
            </Avatar>

            <Typography
              fontWeight={400}
              sx={{
                marginTop: 1,
                fontSize: 12,
                opacity: 0.8,
                width: "100%",
                color: "#ddd",
              }}
            >
              {option.title}
            </Typography>
          </Box>
        )
      }
      )}
    </Stack>
  );
};