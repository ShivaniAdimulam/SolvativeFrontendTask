import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetail';
import P5History from './components/P5History';
import RewardHistory from './components/RewardHistory';
import NewReward from './components/NewReward';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/new" element={<UserForm />} />
          <Route path="/:id" element={<UserDetail />} />
          <Route path="/:id/p5" element={<P5History />} />
          <Route path="/:id/rewards" element={<RewardHistory />} />
          <Route path="/:id/rewards/new" element={<NewReward />} />
          <Route path="/add-reward" element={<NewReward />} /> {/* Add the route for the new component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
