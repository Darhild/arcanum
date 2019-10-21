import React from 'react';
import FileName from '../FileName';
import './ContentTableRow.css';
import { CommitInfo } from '../../server/formatters';

interface ContentTableRowProps {
  file: CommitInfo
}

const ContentTableRow = ({ file }: ContentTableRowProps) => {  
  if (file) {
    return (
      <div className="ContentTable-Row">
        <div className="ContentTable-Col ContentTable-Col_name">
          <FileName file={ file } />
        </div>        
        <div className="ContentTable-Col ContentTable-Col_commit"><span className="Link Link_color_accent">{file.lastCommit ? file.lastCommit : ''}</span></div>
        <div className="ContentTable-Col ContentTable-Col_message">{file.message ? file.message : ''}</div>
        <div className="ContentTable-Col ContentTable-Col_committer"> <span className="Link Link_user">{file.committer ? file.committer : ''}</span></div>
        <div className="ContentTable-Col ContentTable-Col_updated ContentTable-Col_last">{file.commitDate ? file.commitDate : ''}</div>
      </div>
    )
  } 

  return ( <div>
    Error!
  </div>
  )    
}

export default ContentTableRow;