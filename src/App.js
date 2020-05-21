import React from 'react';
import {Provider, ActionLink} from '@tesler-ui/core'
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider useEpics={false}>
        <ActionLink>test</ActionLink>
      </Provider>
    </div>
  );
}

export default App;
