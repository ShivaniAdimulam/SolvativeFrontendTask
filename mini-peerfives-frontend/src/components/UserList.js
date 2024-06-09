import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/getusers')
      .then(response => {
        console.log('API response:',response.data.data); // Log the response
        if (response.data.data) {
          setUsers(response.data.data);
        } else {
          throw new Error('API response is not an array');
        }
      })
      .catch(error => {
        console.error('There was an error fetching the users:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Users List</h1>
      <Link to="/new">
        <button>Create New User</button>
      </Link>
      <Link to="/add-reward">
        <button>Send Rewards to User</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>P5 Balance</th>
            <th>Reward Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.userName}</td>
              <td>{user.p5Points}</td>
              <td>{user.rewardsPoints}</td>
              <td>
                <Link to={`/${user._id}`}>
                  <button>Check and edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
