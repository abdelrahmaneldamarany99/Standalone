import { useState } from "react";

export default function useDelayJsx(duration) {
  const [delay, setDelay] = useState(true);

  setTimeout(() => {
    setDelay(false);
  }, duration);
  return {delay, setDelay}
}
