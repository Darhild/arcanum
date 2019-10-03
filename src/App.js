import React from 'react';
import './App.css';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import MainTitle from './components/MainTitle';
import ContentMenu from './components/ContentMenu';
import ConnectedContent from './containers/ConnectedContent';
import Footer from './components/Footer';

function App() {
  return (
    <main class="Main">
      <Header/>
      <Breadcrumbs/>
      <MainTitle/>
      <ContentMenu/>
      <ConnectedContent/>
      <Footer/>      
    </main>
  );
}

export default App;
