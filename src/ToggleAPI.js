import React, { useState } from 'react';
import apiSettings from "./APISettings";

const ToggleAPI = () => {
  const [isChecked, setIsChecked] = useState(localStorage.getItem('error') === 'true');

  const handleClick = () => {
    //localStorage.setItem('error', !isChecked);
    isChecked? apiSettings.resetAPI() : apiSettings.setAPI();
    setIsChecked(!isChecked);
  };

  return (
    <button className="toggleAPI" onClick={handleClick}>
      API with error: {isChecked.toString()}
    </button>
  );
};

export default ToggleAPI;
