import React from 'react';
import DataLoader from './DataLoader';
import { createStyles } from './createStyles';

const App = () => {
  const styles = createStyles();

  return (
    <div>
      <style>{styles}</style>
      <DataLoader />
    </div>
  );
};

export default App;
