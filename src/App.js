import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import routes from './routes/routes';

function App() {
  return (

    <BrowserRouter>
      {routes}
    </BrowserRouter>

  );
}

export default App;
