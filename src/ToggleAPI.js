import React, { useState } from 'react';

const ToggleAPI = () => {
  const [isChecked, setIsChecked] = useState(localStorage.getItem('error') === 'true');

  const handleClick = () => {
    localStorage.setItem('error', !isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <button className="toggleAPI" onClick={handleClick}>
      API with error: {isChecked.toString()}
    </button>
  );
};

export default ToggleAPI;
