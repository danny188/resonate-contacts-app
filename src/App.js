import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Unable to fetch contacts: ', error);
    }
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Contacts</h1>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="contact-list">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <h2>{contact.name}</h2>
            <p>Phone: {contact.phone}</p>
            <p>Email: {contact.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;