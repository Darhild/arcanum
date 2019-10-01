import React from 'react';
import './App.css';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import MainTitle from './components/MainTitle';
import ContentMenu from './components/ContentMenu';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <main className="Main">
      <Header/>
      <Breadcrumbs/>
      <MainTitle/>
      <ContentMenu/>
      <Content/>
      <Footer/>      
    </main>
  );
}

export default App;
