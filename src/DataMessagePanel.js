import React, { useState, useEffect } from 'react';

const DataMessagePanel = () => {
  const [uiState, setUIState] = useState('waiting for a message');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event?.data && event?.data?.type === 'STATE') {
        let receivedState = event.data.payload.name;
        setUIState('message received: ' + receivedState);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="currentState dataMessage">
      <p>{uiState}</p>
    </div>
  );
};

export default DataMessagePanel;
