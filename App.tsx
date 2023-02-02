import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <React.Fragment></React.Fragment>
    </Provider>
  );
};

export default App;
