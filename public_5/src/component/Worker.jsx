import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Worker.css'
const Worker = () => {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [workerFirstName, setFirstName] = useState('');
  const [workerLastName, setLastName] = useState('');
  const [workerAdress, setAddress] = useState('');
  const [workerEmail, setEmail] = useState('');
  const [workerCategory, setCategory] = useState('');
  const [workerDateOfBirth, setDateOfBirth] = useState('');
  const [workerPhoneNumber, setPhoneNumber] = useState('');
  const [workerJob, setJob] = useState('');
  const [workerPassword, setWorkerPassword] = useState('');

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/workers/getWorkers');
      setWorkers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateWorker = (worker) => {
    setSelectedWorker(worker);
    setFirstName(worker.workerFirstName);
    setLastName(worker.workerLastName);
    setAddress(worker.workerAdress);
    setEmail(worker.workerEmail);
    setCategory(worker.workerCategory);
    setDateOfBirth(worker.workerDateOfBirth);
    setPhoneNumber(worker.workerPhoneNumber);
    setJob(worker.workerJob);
    setIsEditing(true);
  };

  const handleSaveUpdate = async () => {
    try {
      const updatedWorker = {
        ...selectedWorker,
        workerFirstName,
        workerLastName,
        workerAdress,
        workerEmail,
        workerCategory,
        workerDateOfBirth,
        workerPhoneNumber,
        workerJob,
      };

      const response = await axios.put(
        `http://localhost:4000/api/workers/update/${selectedWorker.workersId}`,
        updatedWorker
      );

      if (response.status === 200) {
        const updatedWorkers = workers.map((worker) =>
          worker.workersId === selectedWorker.workersId ? updatedWorker : worker
        );
        setWorkers(updatedWorkers);
        cancelEdit();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteWorker = async (workerId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/workers/deleteWorker/${workerId}`
      );

      if (response.status === 200) {
        const updatedWorkers = workers.filter((worker) => worker.workersId !== workerId);
        setWorkers(updatedWorkers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setSelectedWorker(null);
    setIsEditing(false);
    setFirstName('');
    setLastName('');
    setAddress('');
    setEmail('');
    setCategory('');
    setDateOfBirth('');
    setPhoneNumber('');
    setJob('');
    setWorkerPassword('');
  };

  return (
    <div>
    
      <h2>Workers</h2>
      {isEditing && selectedWorker ? (
        <div>
          <h3>Edit Worker</h3>
          <form className="worker-form">
            <label>
              First Name:
              <input
                type="text"
                value={workerFirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={workerLastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={workerAdress}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={workerEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={workerCategory}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="text"
                value={workerDateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                value={workerPhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
            <label>
              Job:
              <input
                type="text"
                value={workerJob}
                onChange={(e) => setJob(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={setWorkerPassword}
                onChange={(e) => setWorkerPassword (e.target.value)}
              />
            </label>
            <button type="button" onClick={handleSaveUpdate}>
              Save
            </button>
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        
        <table className="clients-worker">
  <thead>
  
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Address</th>
      <th>Email</th>
      <th>Category</th>
      <th>Date of Birth</th>
      <th>Phone Number</th>
      <th>Job</th>
      <th>Image </th>
      <th>Active Task</th>
      <th>Actions</th>
    </tr>
    
  </thead>
  <tbody>
    {workers.map((worker) => (
      <tr key={worker.workersId}>
        <td>{worker.workerFirstName}</td>
        <td>{worker.workerLastName}</td>
        <td>{worker.workerAdress}</td>
        <td>{worker.workerEmail}</td>
        <td>{worker.workerCategory}</td>
        <td>{worker.workerDateOfBirth}</td>
        <td>{worker.workerPhoneNumber}</td>
        <td>{worker.workerJob}</td>
        <td>
        <img src={worker.imageUrl} alt="Worker" />
        </td>
        <td>{worker.activeTask}</td>
        <td>
          <button onClick={() => handleUpdateWorker(worker)}>Update</button>
          {' '}
          <button onClick={() => handleDeleteWorker(worker.workersId)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}
    </div>
  );
};

export default Worker;
