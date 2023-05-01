import React, { useState, useEffect } from "react";

function CreateLesson() {
  const [textboxes, setTextboxes] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);
  const course_id = urlParams.get("course_id");

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

  const HandleSubmit = (event) => {
    event.preventDefault();

    useEffect(() => {
      fetch("/teacher/create_module", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: textboxes,
          course_id: course_id,
          module_type: 0,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.error(error)),
      });
    });
  };

  return (
    <div>
      <form onSubmit={HandleSubmit}>
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
        <div style={{ width: "90vw", height: "100px", margin: "auto" }}>
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
