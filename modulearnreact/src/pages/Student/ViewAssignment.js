import React, { useState, useEffect } from "react";

function ViewAssignment() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("--:--");
  const [totalPoints, setTotalPoints] = useState("");

  useEffect(() => {
    fetch(`/module/get_info/${module_id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setDueDate(data.due_date);
        setTotalPoints(data.total_points)
      })
      .catch((error) => console.error(error));

    fetch(`/module/get_content/${module_id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.error(error));
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    return;
  };

  return (
    <div>
      <div>
        <h1>{title}</h1>
        <h2>{dueDate}</h2>
        <h2>{totalPoints}</h2>
      </div>
      <div>
        <h1>Assignment</h1>
        <p>{description}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ViewAssignment;
