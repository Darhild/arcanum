import React from 'react';
import './FileContentRow.css';

const FileContentRow = ({ id, content}) => {
  return (
    <div className="FileContent-Row">        
      <div className="FileContent-Col FileContent-RowNum">{id}</div>
      <div className="FileContent-Col FileContent-RowContent">{content}</div>
    </div>      
  )
}

export default FileContentRow;