import logo from './logo.svg';
import './App.css';
import Quote from './components/Quote';
import CompanyNews from './components/CompanyNews';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { useState } from 'react';
function App() {

  
  return (

    <div className="App">

<Router>

<Routes>
  <Route path='/'  Component={Quote}   exact/>

  
  <Route   path='/news' Component={CompanyNews}    />

</Routes>
</Router>
      
    </div>
  );
}

export default App;
