import React, { useState, useEffect } from 'react';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ contentTitle: '', description: '', status: 'Not Started' });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch tasks when the component mounts or when a new task is added/updated
  useEffect(() => {
    fetch('http://localhost:3000/seetask', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setTasks(data.tasks || []))
      .catch(error => console.error('Fetch tasks error:', error));
  }, [token]);

  const handleCreateOrUpdate = () => {
    const url = editId ? `http://localhost:3000/${editId}` : 'http://localhost:3000/create';
    const method = editId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(data => {
        if (editId) {
          setTasks(tasks.map(t => (t._id === editId ? data : t)));
        } else {
          setTasks([...tasks, data]);
        }
        setTask({ contentTitle: '', description: '', status: 'Not Started' });
        setEditId(null);
      })
      .catch(error => console.error('Create/Edit task error:', error));
  };

  const handleEdit = (taskToEdit) => {
    setTask({
      contentTitle: taskToEdit.contentTitle,
      description: taskToEdit.description,
      status: taskToEdit.status,
    });
    setEditId(taskToEdit._id);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => setTasks(tasks.filter(t => t._id !== id)))
      .catch(error => console.error('Delete task error:', error));
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
      <h2>{editId ? 'Edit Task' : 'Create Task'}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={task.contentTitle}
          onChange={(e) => setTask({ ...task, contentTitle: e.target.value })}
          placeholder="Content Title"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Description"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          onClick={handleCreateOrUpdate}
          style={{
            padding: '10px',
            backgroundColor: editId ? '#007bff' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {editId ? 'Update Task' : 'Create Task'}
        </button>
      </div>

      <h2>All Tasks</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(t => (
          <li key={t._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{t.contentTitle}</h3>
            <p style={{ margin: '5px 0' }}>{t.description}</p>
            <p style={{ margin: '5px 0' }}>Status: <strong>{t.status}</strong></p>
            <p style={{ margin: '5px 0' }}>Created At: {new Date(t.createdAt).toLocaleString()}</p>
            <p style={{ margin: '5px 0' }}>Completed At: {t.completedAt ? new Date(t.completedAt).toLocaleString() : 'N/A'}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => handleEdit(t)}
                style={{ padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
