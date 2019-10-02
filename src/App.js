import React from 'react';
import './App.css';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import MainTitle from './components/MainTitle';
import ContentMenu from './components/ContentMenu';
import ContentContainer from './containers/ContentContainer';
import Footer from './components/Footer';

function App() {
  return (
    <main class="Main">
      <Header/>
      <Breadcrumbs/>
      <MainTitle/>
      <ContentMenu/>
      <ContentContainer/>
      <Footer/>      
    </main>
  );
}

export default App;
