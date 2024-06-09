import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function P5History() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3000/getuserdetails/${id}`).then(response => {
      setBalance(response.data.data.p5Points);
    });
    axios.get(`http://localhost:3000/p5/${id}`).then(response => {
      setHistory(response.data.data);
    });
  }, [id]);

  const handleDelete = (transactionId) => {
    axios.put(`http://localhost:3000/deletetransaction/${transactionId}`).then(() => {
      setHistory(history.filter(t => t._id !== transactionId));
    });
  };

  return (
    <div>
      <h1>P5 History</h1>
      <div>
        <Link to={`/${id}/rewards/new`}>
          <button>Create New Reward</button>
        </Link>
        <p>P5 Balance: {balance}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date-Time</th>
            <th>P5 Given</th>
            <th>User Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={record.id}>
              <td>{index + 1}</td>
              <td>{new Date(record.createdAt).toLocaleString()}</td>
              <td>{record.points}</td>
              <td>{record.givenTo.userName}</td>
              <td>
                <button onClick={() => handleDelete(record._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default P5History;
