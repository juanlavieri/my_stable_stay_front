import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
// Import other pages here

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* Define other routes here */}
      </Switch>
    </Router>
  );
}

export default App;
