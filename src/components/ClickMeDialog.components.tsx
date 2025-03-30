import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ClickMeDialog(props: {
  handleClose: () => void;
  open: boolean;
  message: string | null;
}) {
  const { open, handleClose, message } = props;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        slots={{ transition: Transition }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        sx={{
          borderRadius: '50px',
          '& .MuiPaper-root': {
            backgroundColor: 'rgb(61, 70, 77)',
            color: 'white',
            borderRadius: '20px',
            minHeight: '218px',
            alignItems: 'center',
          },
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <DialogContentText
            id="alert-dialog-slide-description"
            fontFamily={'Dancing Script'}
            fontSize={18}
            color="rgba(255, 255, 255, 0.5)"
          >
            {message}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button sx={{ color: 'rgb(20, 20, 20)', fontWeight: 'bold' }} onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}