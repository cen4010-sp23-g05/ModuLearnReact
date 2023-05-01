import React, { useState, useEffect } from "react";

function CreateAssignment() {
  const [description, setDescription] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const course_id = urlParams.get("course_id");

  const HandleSubmit = (event) => {
    event.preventDefault();
    // do something with the description
    console.log(description);

    useEffect(() => {
      fetch("/teacher/create_module", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: description,
          course_id: course_id,
          module_type: 1,
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
      <h1>Create Assignment</h1>
      <form onSubmit={HandleSubmit}>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateAssignment;
