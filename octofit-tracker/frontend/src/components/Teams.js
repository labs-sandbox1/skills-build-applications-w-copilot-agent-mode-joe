import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams component - Fetching from API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams component - Raw API response:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams component - Processed teams data:', teamsData);
        setTeams(teamsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams component - Error fetching teams:', error);
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
        <p className="mt-3 text-muted">Loading teams...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Teams</h4>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="page-heading">🤝 Teams</h2>
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Team Name</th>
                  <th>Description</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {teams.length > 0 ? (
                  teams.map(team => (
                    <tr key={team.id}>
                      <td><span className="badge bg-secondary">{team.id}</span></td>
                      <td><strong>{team.name}</strong></td>
                      <td>{team.description || <em className="text-muted">No description</em>}</td>
                      <td>{new Date(team.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      <p className="mb-0">No teams found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 text-muted">
          <small>Total Teams: <strong>{teams.length}</strong></small>
        </div>
      </div>
    </div>
  );
}

export default Teams;
