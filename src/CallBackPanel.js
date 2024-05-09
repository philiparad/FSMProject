import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import callbackStatus from "./CallbackStatus";

const CallBackPanel = observer(() => {
  const [uiState, setUIState] = useState('waiting for a message');

  return (
    <div className="currentState callBackPanel">
    {callbackStatus.msg}
    </div>
  );
});

export default CallBackPanel;
