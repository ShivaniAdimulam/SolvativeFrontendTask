import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserForm() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [p5Points, setP5Points] = useState(0); // New state for p5Points

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { userName, p5Points }; // Include p5Points in the user object
    axios.post('http://localhost:3000/adduser', user)
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error("There was an error creating the user!", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name</label> {/* Update label to User Name */}
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>P5 Points</label> {/* Label for p5Points */}
          <input
            type="number"
            value={p5Points}
            onChange={(e) => setP5Points(Number(e.target.value))}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}

export default UserForm;
