import React, { useState } from 'react';
//import './ViewLesson.css';

function ViewLesson() {
  const [textboxes, setTextboxes] = useState([]);

    // add code to download info

  const loadSample = () => {
    setTextboxes([
      { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { content: 'Fusce consequat accumsan tellus, id tincidunt elit tempus ut.' },
      { content: 'Cras vehicula, magna at auctor tincidunt, sapien turpis sodales odio, vel volutpat lorem magna sed metus.' },
    ]);
  };

  return (
    <div>
      <button type="button" onClick={loadSample}>
        Load sample lesson
      </button>
      <div className="textboxes">
        {textboxes.map((textbox, index) => (
          <div key={index} className="textbox">
            {textbox.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewLesson;
