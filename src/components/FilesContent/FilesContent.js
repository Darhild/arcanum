import React from 'react';
import ContentTableRow from './../ContentTableRow';
import './FilesContent.css';

 const FilesContent = ({ content }) => {
  return (
    <div className="Main-InnerContent">
      <div className="ContentTable">
        <div className="ContentTable-Row ContentTable-Head">
          <div className="ContentTable-Col">Name</div>
          <div className="ContentTable-Col">Last commit</div>
          <div className="ContentTable-Col">Commit message</div>
          <div className="ContentTable-Col">Committer</div>
          <div className="ContentTable-Col ContentTable-Col_last">Updates</div>
        </div>
        {
          content.map(file => <ContentTableRow file={file} key={file.name} />) 
        }
      </div>
    </div>
  )
}

export default FilesContent;
