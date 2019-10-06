import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Files from './components/Files';
import File from './components/File';
import Breadcrumbs from './components/Breadcrumbs';
import MainTitle from './components/MainTitle';
import Footer from './components/Footer';

function App(props) {
  return (
    <main className="Main">
      <Header/>
      <Breadcrumbs/>
      <MainTitle/>
      <Switch>
        <Route path="/api/repos/:repositoryId/blob/" component={File} />
        <Route path ="/api/repos/:repositoryId/" component={Files} />          
        <Route path ="/api/repos/" component={Files} /> 
        <Redirect from='/' to='/api/repos/'/>          
      </Switch>  
      <Footer/>      
    </main>
  );
}

export default App;
