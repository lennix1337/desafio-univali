import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Listagem from './pages/Listagem';
import Form from './pages/Form';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Listagem} />
          <Route path='/cadastro' component={Form} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
