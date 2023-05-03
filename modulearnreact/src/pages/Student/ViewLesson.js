import React, { useState, useEffect } from 'react';

function ViewLesson() {
  const [textboxes, setTextboxes] = useState([]);
  const [title, setTitle] = useState("");

  // add code to download info

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const module_id = urlParams.get('module_id');

    fetch(`/test/module/get_info`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        module_id: module_id,
      })
    })
    .then(response => response.json())
    .then(data => {
      setTitle(data.title);
    }).catch(error => console.error(error));

    fetch(`/test/module/get_content`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        module_id: module_id,
        module_type: 0
      })
    })
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
