import React, { useState } from 'react';
import axios from 'axios';

function ViewAssignment() {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

    // add code to download info

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // or do something else with response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Assignment</h1>
      <p>{description}</p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ViewAssignment;
