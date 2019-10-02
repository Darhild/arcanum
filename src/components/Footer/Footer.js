import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div class="MainFooter">
        <div class="MainFooter-Text">Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021</div>
        <div class="MainFooter-Info">
          <div class="MainFooter-Version">UI: 0.1.15</div>
          <div class="MainFooter-Copyright">
            © 2007—2019 <span class="Link Link_color_accent">Yandex</span></div>
        </div>
      </div>
    )
  }    
}