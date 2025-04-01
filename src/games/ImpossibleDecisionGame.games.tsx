import { useState } from "react";
import { Button, Container, Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import MessageIcon from '@mui/icons-material/Message';
import { GlobalProvider } from "../global/GlobalProvider.global";
import ThePopupPredicament from "./ThePopupPredicament.games";

const impossibleChoices = [
  { option1: "Press to continue" },
];

const ImpossibleDecisionGame = (props: { handleGameCompletion: (answers: any[]) => void }) => {
  const { handleGameCompletion } = props;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { incomingPopups } = GlobalProvider();
  const [selectedAnswers, setSelectedAnswers] = useState<{ optionNumber: number; optionText: string }[]>([]);

  const gameName = incomingPopups[0]?.name;
  const gameDescription = incomingPopups[0]?.about;
  const gameNameTextDecoration = 'linear-gradient(135deg, rgba(137, 137, 137, 0.33), hsl(195, 52.20%, 72.90%),rgba(169, 48, 48, 0.75), rgb(137, 137, 137))';

  const handleChoice = (optionNumber: number, optionText: string) => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, { optionNumber, optionText }]);

    if (currentQuestion < impossibleChoices.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgb(27, 30, 35)',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 5,
          textAlign: 'center',
          maxWidth: 420,
          borderRadius: 3,
          bgcolor: 'transparent',
          color: 'rgba(255, 255, 255, 0.77)',
          width: '100%',
        }}
      >
        {!completed ? (
          <>
            <Typography variant="h5" component="h2" fontWeight={600} gutterBottom sx={{
              background: gameNameTextDecoration,
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}>
              {gameName}
            </Typography>
            <MessageIcon sx={{ fontSize: 100, color: '#fbc02d' }} />
            <Typography variant="subtitle2" textAlign={"center"} sx={{ color: "rgba(255, 255, 255, 0.45)", margin: "0px 40px 0px 40px" }} gutterBottom>
              Since tapping a button for a cute message is far too easy, here’s a challenge. Welcome to <br />
              <span
                style={{
                  background: gameNameTextDecoration,
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {gameName}
              </span>
              <br />
              Game.
              <br />
              {gameDescription}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  height: 50,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #6a85b6 0%, #bac8e0 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a75a6 0%, #aab8d0 100%)',
                  },
                }}
                onClick={() => handleChoice(1, impossibleChoices[currentQuestion].option1)}
              >
                {impossibleChoices[currentQuestion].option1}
              </Button>
            </Box>

            <Box margin="40px" textAlign="center">
              <Typography variant="h6" color="rgba(107, 107, 107, 0.71)">
                <strong>Notice of The Pop-Up Predicament</strong>
              </Typography>

              <Typography
                fontSize="0.5rem"
                margin="10px 20px"
                color="rgba(107, 107, 107, 0.71)"
              >
                By participating in this recurring feature, you hereby acknowledge and accept any and all terms related to the frequency, content, and overall unpredictability of pop-ups. Completion of the game constitutes full and binding agreement to these conditions.
              </Typography>

              <Typography
                fontSize="0.85rem"
                fontWeight="bold"
                color="rgb(41, 94, 90)"
                marginTop="5px"
                borderRadius={2}
                sx={{
                  color: 'rgba(255, 255, 255, 0.42)',
                  WebkitBackgroundClip: 'text',
                }}
              >
                "The Pop-Up Predicament"
              </Typography>

              <Typography
                fontSize="0.85rem"
                color="rgba(107, 107, 107, 0.71)"
              >
                Like a surprise ad, <br /> but worse.
              </Typography>

              <ThePopupPredicament />
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" component="h2" fontWeight={600} color="white" gutterBottom>
              Let's go! You got your first trophy! You now have
              <br />
              <span
                style={{
                  background: gameNameTextDecoration,
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {gameName}
              </span>
              <br />
              Trophy!
            </Typography>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
              }}
            >
              <MessageIcon sx={{ fontSize: 80, color: '#fbc02d' }} />
            </motion.div>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 4,
                height: 50,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #388e3c 0%, #81c784 100%)',
                },
              }}
              onClick={() => handleGameCompletion(selectedAnswers)}
            >
              <Typography
                variant="button"
                sx={{
                  color: 'rgba(255, 255, 255, 0.77)',
                  fontWeight: "bold",
                  WebkitBackgroundClip: 'text',
                  fontSize: '1rem',
                }}
              >
                Claim!
              </Typography>
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ImpossibleDecisionGame;