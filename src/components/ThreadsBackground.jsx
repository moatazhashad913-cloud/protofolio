import React from "react";
import Threads from "./Threads";

const ThreadsBackground = ({
  color = [0.65, 0.96, 0.2],
  amplitude = 0.9,
  distance = 0.2,
  enableMouseInteraction = false,
  className = "",
  onReady,
}) => {
  React.useEffect(() => {
    const id = requestAnimationFrame(() => onReady?.());
    return () => cancelAnimationFrame(id);
  }, [onReady]);

  return (
    <div
      className={`absolute inset-0 -z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <Threads
        color={color}
        amplitude={amplitude}
        distance={distance}
        enableMouseInteraction={enableMouseInteraction}
      />
    </div>
  );
};

export default ThreadsBackground;
