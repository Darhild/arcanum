import React from 'react';
import './Footer.css';

 const Footer = () => {
  return (
    <div className="MainFooter">
      <div className="MainFooter-Text">Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021</div>
      <div className="MainFooter-Info">
        <div className="MainFooter-Version">UI: 0.1.15</div>
        <div className="MainFooter-Copyright">
          © 2007—2019 <span className="Link Link_color_accent">Yandex</span></div>
      </div>
    </div>
  )  
}

export default Footer;