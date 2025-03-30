import { useState } from "react";
import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import ClickMeDialog from './components/ClickMeDialog.components';
import { HomeTitle } from './components/HomeTitle.components';
import { DateTitle } from './components/DateTitle.components';
import { HomeImage } from './components/HomeImage.components';
import { TitleMessage } from './components/TitleMessage.components';
import { ClickMeButton } from './components/ClickMeButton.components';
import { OptionsTitle } from './components/OptionsTitle.components';
import { AvatarOptions } from './components/AvatarOptions.components';
import { GlobalProvider } from "./global/GlobalProvider.global";
import CountdownTimer from './upcoming/CountDownTimer.upcoming';
import TrophyReveal from './components/TrophyReveal.components';
import ImpossibleDecisionGame from './games/ImpossibleDecisionGame.games';
import { IncomingPopups } from './interfaces/IncomingPopUps.interfaces';
import GetTime from './components/GetTime.components';

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const { incomingData, loading, incomingPopups, updatePopUp, todaysData } = GlobalProvider();
  const fullDate = GetTime().fullDate
  const todaysDate = GetTime().day

  const gameToShow = incomingPopups?.find((popup: IncomingPopups) =>
    popup.start_on === GetTime().fullDate && !popup.completed
  )

  // handle game completion
  const handleGameCompletion = (answers: { optionNumber: number; optionText: string }[]) => {
    if (!gameToShow?.id) return;

    updatePopUp({ updatedData: { id: gameToShow.id, answers } });
  };

  const todaysImage = todaysData?.data[0]?.image ? todaysData?.data[0]?.image : null
  const todaysTitle = todaysData?.data[0]?.title ? todaysData?.data[0]?.title : null
  const todaysMessage = todaysData?.data[0]?.message ? todaysData?.data[0]?.message : null

  const todaysPicks = todaysData?.picks ? todaysData?.picks : null

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const notificationbox = () => {
    return (
      <>
        <Paper
          elevation={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "75%",
            maxWidth: "500px",
            height: "120px",
            maxHeight: "120px",
            marginTop: 3,
            borderRadius: "15px",
            backgroundImage: "url('https://images.pexels.com/photos/14449523/pexels-photo-14449523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            boxShadow: "0px 4px 20px rgb(0, 0, 0), 0px 0px 30px rgb(0, 0, 0) inset",
            textShadow: "2px 5px 25px rgb(0, 0, 0)",
            userSelect: "none",
          }}
        >
          {/* CountdownTimer */}
          <CountdownTimer />

          <Typography
            fontWeight={"bold"}
            sx={{
              fontSize: "0.9rem",
              textTransform: "uppercase",
              padding: "2.5px 0px",
            }}
          >
            Introducing:
          </Typography>

          <Divider orientation="vertical" variant="middle"  sx={{
            borderColor: "white",
            height: "1px",
            width: "50%",
            margin: 0,
            backgroundColor: "white",
          }}/>

          <Typography
            fontWeight="light"
            sx={{
              fontSize: "0.9rem",
            }}
          >
            The Popup Predicament
          </Typography>

          <Typography
                fontSize="0.65rem"
                color="rgba(107, 107, 107, 0.71)"
              >
                Like a surprise ad, but worse.
              </Typography>
        </Paper>
      </>
    );
  }

  // if dataFound is false, show loading screen
  if (!todaysData || loading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="rgb(40, 44, 52)">
        <Typography variant="h4" color="white">Loading...</Typography>
        <Typography variant="subtitle1" color="white" textAlign={'center'} margin={2}>
          No data was found, or the retrieval process is taking longer than expected.
        </Typography>
      </Box>
    );
  }

  if (incomingData && gameToShow) {
    return <ImpossibleDecisionGame key={gameToShow.id} handleGameCompletion={handleGameCompletion} />;
  }

  return (
    <>
      {/* Main Box */}
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'center'}
        minHeight={'100vh'}
        height={'fit-content'}
        width={'100vw'}
        bgcolor={'rgb(27, 30, 35)'}
        textAlign={'center'}
      >
        {/* Upcoming */}
        {gameToShow === undefined ? null : notificationbox()}

        {/* Speed Dial */}
        <Container
          sx={{
            position: 'relative',
            width: 'fit-content',
            top: 100,
            right: 125,
            zIndex: 1,
            height: '0px',
            paddingLeft: 5
          }}
        >
          <TrophyReveal />
        </Container>

        {/* Title */}
        <HomeTitle todaysDate={todaysDate} />

        {/* Date Title */}
        <DateTitle fullDate={fullDate} />

        {/* Home Image */}
        <HomeImage image={todaysImage} />

        {/* Message Container */}
        <Container
          sx={{
            padding: 2,
            // marginTop: 2,
            borderRadius: '15px',
            // boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.57)',
            maxWidth: '400px',
            border: '3px solid transparent',
            position: 'relative',
            textAlign: 'center',
          }}
        >
          {/* Title Message */}
          <TitleMessage titleMessage={todaysTitle} />

          {/* "Click Me" Button */}
          <ClickMeButton handleClickOpen={handleClickOpen} />
        </Container>

        {/* Options Title */}
        <OptionsTitle todaysOptions={todaysPicks} />

        {/* Avatar Options */}
        <AvatarOptions todaysOptions={todaysPicks} />

        {/* "Click Me" Dialog */}
        <ClickMeDialog handleClose={handleClose} open={open} message={todaysMessage} />
      </Box>
    </>
  );
}

export default App;