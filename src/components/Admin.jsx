import React, { useState } from 'react';

export default function Admin() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Добавлен');
        setFormData({ name: '', age: '', description: '' }); 
      } else {
        alert('erorr: ' + result.message);
      }
    } catch (error) {
      console.error('erorr:', error);
      alert('erorr.');
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>

      <input
        id="inputName"
        placeholder="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        id="inputAge"
        placeholder="age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        id="inputDescription"
        placeholder="description"
        name="description"
        type="text"
        value={formData.description}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
