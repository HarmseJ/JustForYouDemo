import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

export default function ThePopupPredicament() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          marginTop: 2,
          background: 'rgba(0, 0, 0, 0.18)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          padding: '10px 20px',
          borderRadius: '8px',
          textTransform: 'none',
          transition: '0.3s',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.38)',
          },
        }}
      >
        Learn More
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            background: '#1b1f2a',
            color: '#e0e0e0',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 3,
            fontSize: '1.8rem',
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#ffffff',
            background: 'linear-gradient(135deg, rgba(20, 25, 40, 0.9) 0%, rgba(35, 50, 65, 0.95) 100%)',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
          id="customized-dialog-title"
        >
          The Popup Predicament
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ padding: '30px', fontSize: '1.1rem', color: '#dcdcdc' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '16px' }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}
            >
              The Challenge Awaits!
            </Typography>
          </Box>
          <Typography gutterBottom sx={{ lineHeight: '1.6', color: '#e0e0e0' }}>
            <b>The Popup Predicament</b> is the latest addition to <b>Just for You</b>, and it plays by its own rules!
            Without warning, a game will suddenly appear, and there's only one way forward—you have to participate/win.
          </Typography>
          <Typography gutterBottom sx={{ lineHeight: '1.6', color: '#b0b0b0' }}>
            Every challenge is different, with its own name, mechanics, and surprises. Some will be a breeze,
            while others will challenge you at every step. But no matter the difficulty, victory always comes with a reward—
            a <b>one-of-a-kind trophy</b> to add to your collection.
          </Typography>
          <Typography gutterBottom sx={{ lineHeight: '1.6', fontWeight: 'bold', color: '#ffffff', textAlign: 'center' }}>
            Victory is within your grasp—go earn it!
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', padding: '16px' }}>
          <Button
            onClick={handleClose}
            sx={{
              background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '8px',
              textTransform: 'none',
              transition: '0.3s',
              '&:hover': {
                background: 'linear-gradient(135deg, #e63b5a 0%, #e64022 100%)',
              },
            }}
          >
            Got It!
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}