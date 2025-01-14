"use client";

import { useState, useEffect } from "react";

const LocalTime = () => {
  const [currentTime, setCurrentTime] = useState("00:00");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const options = {
        timeZone: "Africa/Cairo",
        hour: "numeric",
        minute: "numeric",
      };
      const timeInCairo = new Date().toLocaleTimeString("en-US", options);
      setCurrentTime(timeInCairo);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentTime]);

  return (
    <div>
      <div className="flex">
        <p>Cairo {currentTime}</p>
      </div>
    </div>
  );
};

export default LocalTime;
