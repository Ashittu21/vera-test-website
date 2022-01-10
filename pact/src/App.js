import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home.js';
import Page from './components/Page.js';
import Nav from './components/Nav.js';

window.GALLERY_ID = window.GALLERY_ID || 25695;
window.GALLERY_BASENAME = window.GALLERY_BASENAME || "/through-their-eyes";

const App = () => {
  return (
    <BrowserRouter basename={window.GALLERY_BASENAME}>
      <>
        <Nav isHome={true} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:slug" component={Page} />
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;