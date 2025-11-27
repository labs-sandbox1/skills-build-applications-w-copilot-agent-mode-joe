import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users component - Fetching from API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users component - Raw API response:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Users component - Processed users data:', usersData);
        setUsers(usersData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Users component - Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border loading-spinner text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading users...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Users</h4>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="page-heading">👥 Users Management</h2>
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map(user => (
                    <tr key={user.id}>
                      <td><span className="badge bg-secondary">{user.id}</span></td>
                      <td><strong>{user.username}</strong></td>
                      <td>{user.email}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td><span className="badge bg-info text-dark">{user.team || 'No Team'}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      <p className="mb-0">No users found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 text-muted">
          <small>Total Users: <strong>{users.length}</strong></small>
        </div>
      </div>
    </div>
  );
}

export default Users;
