import React from 'react';
import './App.css';
import Header from './components/Header';
import Title from './components/Title';
import ContentMenu from './components/ContentMenu';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <main className="Main">
      <Header/>
      <Title/>
      <ContentMenu/>
      <Content/>
      <Footer/>
      
    </main>
  );
}

export default App;
