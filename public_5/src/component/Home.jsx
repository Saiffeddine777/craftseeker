import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Users from './Client.jsx';
import Worker from './Worker.jsx';
import Login from './login.jsx';
import './Home.css'
const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');
  const [data, setData] = useState([]);

  const changeTab = (tabName) => {
    setActiveTab(tabName);
  };

  const fetchClients = () => {
    axios
      .get('http://localhost:4000/api/clients/getall')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchWorker = () => {
    axios
      .get('http://localhost:4000/api/workers/getworkers')
      .then((response) => {
        setData(response.data);
       
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchClients();
    fetchWorker();
  }, []);


  const handleLogout = () => {
    navigate('/login');
  };

  let content;
  if (activeTab === 'Users') {
    content = <Users data={data} />;
  } else if (activeTab === 'Worker') {
    content = <Worker data={data} />;
  } else if (activeTab === 'Login') {
    content = <Login />;
   
  }

  return (
    <div>
      <nav className="tab-navigation">
        <ul>
          <li>
            <button
              className={activeTab === 'Users' ? 'active' : ''}
              onClick={() => changeTab('Users')}
            >
              Clients
            </button>
          </li>
          <li>
            <button
              className={activeTab === 'Worker' ? 'active' : ''}
              onClick={() => changeTab('Worker')}
            >
              Worker
            </button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      {content}
    </div>
  );
};

export default Home;
