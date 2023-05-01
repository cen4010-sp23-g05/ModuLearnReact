import React, { useState, useEffect } from 'react';

function ViewLesson() {
  const [textboxes, setTextboxes] = useState([]);
  const [title, setTitle] = useState("");

  // add code to download info
  const urlParams = new URLSearchParams(window.location.search);
  const module_id = urlParams.get('module_id');

  useEffect(() => {
    fetch(`/module/get_info/${module_id}`)
    .then(response => response.json())
    .then(data => {
      setTitle(data.title);
    }).catch(error => console.error(error));

    fetch(`/module/get_content/${module_id}`)
    .then(response => response.json())
    .then(data => {
      setTextboxes(data);
    }).catch(error => console.error(error));
  });

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <div className="textboxes">
          {textboxes.map((textbox, index) => (
            <div key={index} className="textbox">
              {textbox.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewLesson;
