import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 500) {
  // 1. Create a local state to hold our final stabilized value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 2. Set up a background timer to update our stabilized state after the delay
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 3. THE CLEANUP ENGINE: If the user types another letter before the delay ends, 
    // this cleanup runs automatically, destroying the old timer before it can fire!
    return () => {
      clearTimeout(timerId);      
    };
  }, [value, delay]); // Re-runs every single time 'value' (the typing text) changes

  // 4. Return our clean, stabilized debounced value
  return debouncedValue;
}
