import React, { Component} from 'react';
import { cn } from '@bem-react/classname';
import './Search.css';

const cnSearch = cn('Search');

export default class Search extends Component {
  render() {
    return (
      <div className={cnSearch(null, [...this.props.classes])}>
        <form className="Search-Form"> 
          <input className="Search-Input MainHeader-SearchInput" type="text" />
          <input className="Btn Search-Submit" type="submit" value="" />
        </form>
      </div>
    )
  }  
}