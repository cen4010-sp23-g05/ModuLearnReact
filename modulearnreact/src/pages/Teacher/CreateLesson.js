import React, { useState } from 'react';

function CreateLesson() {
  const [textboxes, setTextboxes] = useState([]);

  const addTextbox = () => {
    setTextboxes([...textboxes, ""]);
  };

  const removeTextbox = (index) => {
    const newTextBoxes = [...textboxes];
    newTextBoxes.splice(index, 1);
    setTextboxes(newTextBoxes);
  };

  const handleChange = (event, index) => {
    const newTextBoxes = [...textboxes];
    newTextBoxes[index] = event.target.value;
    setTextboxes(newTextBoxes);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(textboxes); // or send data to server or do other processing
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {textboxes.map((textbox, index) => (
          <div key={index}>
            <input
              type="text"
              value={textbox}
              onChange={(event) => handleChange(event, index)}
            />
            <button type="button" onClick={() => removeTextbox(index)}>
              Delete
            </button>
          </div>
        ))}
        <div style={{width:"90vw", height:"100px", margin:"auto"}}>
            <button type="button" onClick={addTextbox}>
                Add Textbox
            </button>
            <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CreateLesson;
