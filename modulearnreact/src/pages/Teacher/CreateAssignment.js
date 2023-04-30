import React, { useState } from 'react';

function CreateAssignment() {
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the description
    console.log(description);
  };

  return (
    <div>
      <h1>Create Assignment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateAssignment;
