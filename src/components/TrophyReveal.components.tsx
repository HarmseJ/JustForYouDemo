import { useState, useEffect, useRef } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { QuestionMarkTwoTone, WorkspacePremiumTwoTone } from '@mui/icons-material';
import { GlobalProvider } from '../global/GlobalProvider.global';
import { JoinFull } from "@mui/icons-material";

export default function TrophyReveal() {
  const [openTooltip, setOpenTooltip] = useState<number | null>(null);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const speedDialRef = useRef<HTMLDivElement | null>(null);
  const { incomingPopups } = GlobalProvider();

  const actions = [
    {
      icon: incomingPopups[0]?.completed ? <JoinFull sx={{ color: '#FFD700', filter: 'drop-shadow(0px 0px 6px #FFD700)' }} /> : <QuestionMarkTwoTone sx={{ color: '#fff' }} />,
      name: incomingPopups[0]?.completed ? incomingPopups[0]?.name : 'Brewing',
    },
    { icon: '', name: '' },
    { icon: '', name: '' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (speedDialRef.current && !speedDialRef.current.contains(event.target as Node)) {
        setSpeedDialOpen(false);
        setOpenTooltip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div ref={speedDialRef}>
      <SpeedDial
        ariaLabel="Trophy Reveal SpeedDial"
        direction='down'
        open={speedDialOpen}
        onClick={() => setSpeedDialOpen((prev) => !prev)}
        icon={<WorkspacePremiumTwoTone
          sx={{
            color: '#FFD700',
            filter: 'drop-shadow(0px 0px 8px rgba(255, 217, 0, 0.4))',
            fontSize: '2.5rem'
          }}
        />}
        FabProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
            },
          }
        }}
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={index}
            icon={action.icon}
            tooltipTitle={openTooltip === index ? action.name : ''}
            tooltipOpen={openTooltip === index}
            onClick={(event) => {
              event.stopPropagation();
              setOpenTooltip(openTooltip === index ? null : index);
            }}
            tooltipPlacement='left'
            sx={{
              '& .MuiSpeedDialAction-staticTooltipLabel': {
                backgroundColor: 'transparent',
                // color: '#FFA500',
                color: 'rgb(255, 255, 255)',
                fontSize: '0.6rem',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
                borderRadius: '8px',
                padding: '6px 0px',
                border: "none",

                boxShadow: 'none',
              },
            }}
            FabProps={{
              sx: {
                background: 'inherit',
                boxShadow: '0px 2px 10px rgba(183, 175, 130, 0.58)',
                color: '#FFA500',
                '&:hover': {
                  background: 'rgba(61, 88, 99, 0.4)',
                },
                '&:active': {
                  background: 'rgba(61, 88, 99, 0.4)',
                },
              },
            }}
          />
        ))}
      </SpeedDial>
    </div>
  );
}