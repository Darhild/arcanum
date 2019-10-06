import React from 'react';
import FileName from './../FileName';
import './Folders.css';

const Folders = ({ content }) => {
    return (
      <div className="Main-InnerContent">
        <div className="Folders">
          { content 
            ? content.map((file) => {
              return <div className="Folders-Item" key={file.name}> 
                  <FileName file={ file } classes={['Folders-FileName']} />
                </div>            
            })
            : null
          }     
        </div>
      </div>  
    )
  }

export default Folders;