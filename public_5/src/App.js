import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/login';
import Home from './component/Home';
import Client from './component/Client';
import Worker from './component/Worker';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/client" element={<Client />} />
        <Route path="/worker" element={<Worker />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
