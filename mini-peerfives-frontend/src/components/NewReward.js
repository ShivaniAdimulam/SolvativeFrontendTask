import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddReward() {
  const [users, setUsers] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/getusers')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/givepoints', { from, to, points })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error adding points:', error);
        setMessage('Error adding points');
      });
  };

  return (
    <div>
      <h1>Add Points</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From:</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">Select Giver</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.userName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>To:</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">Select Receiver</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.userName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Points:</label>
          <input 
            type="number" 
            value={points} 
            onChange={(e) => setPoints(Number(e.target.value))} 
            required 
          />
        </div>
        <button type="submit">Add Points</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddReward;
