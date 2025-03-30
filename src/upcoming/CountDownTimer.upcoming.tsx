import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

// Function to get the fixed date & time for the countdown
const getFixedEndTime = () => {
  const targetDate = new Date(Date.UTC(2025, 2, 10, 4, 0, 0));
  return targetDate.getTime();
};

const CountdownTimer: React.FC = () => {
  const endTime = getFixedEndTime();
  const [timeInSeconds, setTimeInSeconds] = useState<number>(() => {
    // Retrieve from localStorage if available
    const savedTime = localStorage.getItem("countdownTime");
    return savedTime ? parseInt(savedTime, 10) : Math.floor((endTime - Date.now()) / 1000);
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const timeLeft = Math.floor((endTime - now) / 1000);
      setTimeInSeconds(timeLeft > 0 ? timeLeft : 0);
      localStorage.setItem("countdownTime", timeLeft.toString());
    };

    updateCountdown(); // Initial update
    const timerId = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerId);
  }, [endTime]);

  // Calculate weeks, days, hours, minutes, seconds
  const weeks = Math.floor(timeInSeconds / (7 * 24 * 60 * 60));
  const days = Math.floor((timeInSeconds % (7 * 24 * 60 * 60)) / (24 * 60 * 60));
  const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
  const seconds = timeInSeconds % 60;

  return (
    <Typography>
      {weeks > 0 && `${weeks}w `}
      {days > 0 && `${days}d `}
      {hours > 0 && `${hours}h `}
      {minutes > 0 && `${minutes}m `}
      {seconds}s
    </Typography>
  );
};

export default CountdownTimer;