import React, { Suspense } from 'react';
import Routes from './config/routes';

function App() {
  return (
    <Suspense fallback={null}>
      <Routes />
    </Suspense>
  );
}

export default App;
