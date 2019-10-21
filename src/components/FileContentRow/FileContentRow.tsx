import React from 'react';
import './FileContentRow.css';

interface FileContentRowProps {
  id: number,
  content: string
}

const FileContentRow = ({ id, content}: FileContentRowProps) => {
  return (
    <div className="FileContent-Row">        
      <div className="FileContent-Col FileContent-RowNum">{id}</div>
      <div className="FileContent-Col FileContent-RowContent">{content}</div>
    </div>      
  )
}

export default FileContentRow;