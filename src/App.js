import React from 'react';
import DataLoader from './DataLoader';
import { createStyles } from './createStyles';

const App = () => {
  const styles = createStyles();
  localStorage.setItem('error', false);

  return (
    <div>
      <style>{styles}</style>
      <DataLoader />
    </div>
  );
};

export default App;
