import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function RewardHistory() {
  const { id } = useParams();
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3000/rewards/${id}`)
      .then(response => {
        setHistory(response.data.data);
        setBalance(response.data.data.givenTo.rewardsPoints);
      })
      .catch(error => {
        console.error("There was an error fetching the reward history!", error);
      });
  }, [id]);

  return (
    <div>
      <h2>Reward History</h2>
      <div>
        <strong>Reward Balance: </strong>{balance}
      </div>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date-Time</th>
            <th>Rewards Received</th>
            <th>Sender User Name</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={record._id}>
              <td>{index + 1}</td>
              <td>{new Date(record.createdAt).toLocaleString()}</td>
              <td>{record.points}</td>
              <td>{record.givenBy.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Link to={`/${id}/rewards/new`}>Create New Reward</Link> */}
    </div>
  );
}

export default RewardHistory;
