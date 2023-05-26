import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clients.css'

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [clientFirstName, setClientFirstName] = useState('');
  const [clientLastName, setClientLastName] = useState('');
  const [clientAdress, setClientAdress] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientDateOfBirth, setClientDateOfBirth] = useState('');
  const [clientPassword, setClientPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/clients/getall');
      setClients(response.data);
      console.log();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClient = (client) => {
    setSelectedClient(client);
    setClientFirstName(client.clientFirstName);
    setClientLastName(client.clientLastName);
    setClientAdress(client.clientAdress);
    setClientEmail(client.clientEmail);
    setClientPhone(client.clientPhone);
    setClientDateOfBirth(client.clientDateOfBirth);
    setClientPassword(client.clientPassword);
    setImageUrl(client.imageUrl);
    setIsEditing(true);
  };

  const handleSaveUpdate = async () => {
    try {
      const updatedClient = {
        ...selectedClient,
        clientFirstName,
        clientLastName,
        clientAdress,
        clientEmail,
        clientPhone,
        clientDateOfBirth,
        clientPassword,
        imageUrl,
      };

      const response = await axios.put(
        `http://localhost:4000/api/clients/updateUser/${selectedClient.clientId}`,
        updatedClient
      );

      if (response.status === 200) {
        const updatedClients = clients.map((client) =>
          client.clientId === selectedClient.clientId ? updatedClient : client
        );
        setClients(updatedClients);
        cancelEdit();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/clients/delete/${clientId}`
      );

      if (response.status === 200) {
        const updatedClients = clients.filter((client) => client.clientId !== clientId);
        setClients(updatedClients);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setSelectedClient(null);
    setIsEditing(false);
    setClientFirstName('');
    setClientLastName('');
    setClientAdress('');
    setClientEmail('');
    setClientPhone('');
    setClientDateOfBirth('');
    setClientPassword('');
    setImageUrl('');
  };
  const formatDOB = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };
  return (
    <div>
      <h2>Clients</h2>
      {isEditing && selectedClient ? (
        <div>
          <h3>Edit Client</h3>
          <form className="client-form">
            <label>
              First Name:
              <input
                type="text"
                value={clientFirstName}
                onChange={(e) => setClientFirstName(e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={clientLastName}
                onChange={(e) => setClientLastName(e.target.value)}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={clientAdress}
                onChange={(e) => setClientAdress(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
            </label>
            <label>
              Date of Birth:
              <input
                type="text"
                value={formatDOB(clientDateOfBirth)}
                onChange={(e) => setClientDateOfBirth(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={clientPassword}
                onChange={(e) => setClientPassword(e.target.value)}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
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
        <table className="client-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>lastname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Image </th>

              <th>Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.clientId}>
                <td>{client.clientId}</td>
                <td>{client.clientFirstName} </td>
                <td>{client.clientLastName}</td>
                <td>{client.clientEmail}</td>
                <td>{client.clientPhone}</td>
                <td>{formatDOB(client.clientDateOfBirth)}</td>
                <td>
        <img src={client.imageUrl} alt="Client" />
      </td>
                
                <td>
                  <button onClick={() => handleUpdateClient(client)}>Edit</button>
                  {' '}
                  <button onClick={() => handleDeleteClient(client.clientId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientTable;
