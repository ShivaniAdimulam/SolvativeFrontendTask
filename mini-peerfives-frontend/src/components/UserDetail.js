import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/getuserdetails/${id}`)
      .then(response => {
        setUser(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, [id]);

  const handleP5History = () => {
    navigate(`/${id}/p5`);
  };

  const handleRewardHistory = () => {
    navigate(`/${id}/rewards`);
  };

  return (
    <div>
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={user.userName || ''}
            readOnly
          />
        </div>
        <button type="button" onClick={handleP5History}>
          {/* P5 Balance: {user.p5Points} */}
          P5 History
        </button>
        <button type="button" onClick={handleRewardHistory}>
          Rewards History
        </button>
      </form>
    </div>
  );
}

export default UserDetail;
