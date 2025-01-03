import './App.css';
import Header from './components/Header';
import UserPanel from './components/UserPanel';
import User from './components/User';
import React, { useEffect, useState } from 'react';
import Admin from './components/Admin';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then(res => res.json())
      .then(data => {
        const formattedData = data.map(user => ({
          name: user.name,
          age: user.age,
          description: user.description
        }));
        setUsers(formattedData);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <main>
          <UserPanel />
          <nav>
            <Link to="/">Home</Link>
            <Link to="/admin" style={{ marginLeft: '10px' }}>Admin</Link> {/* Кнопка для перехода */}
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {users.map((user, index) => (
                    <User
                      key={index}
                      name={user.name}
                      age={user.age}
                      description={user.description}
                    />
                  ))}
                </div>
              }
            />
            <Route path="/admin" element={<Admin />} /> {}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
