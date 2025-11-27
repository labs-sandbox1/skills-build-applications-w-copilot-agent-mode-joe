import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard component - Fetching from API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard component - Raw API response:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard component - Processed leaderboard data:', leaderboardData);
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard component - Error fetching leaderboard:', error);
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
        <p className="mt-3 text-muted">Loading leaderboard...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Leaderboard</h4>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return 'rank-other';
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="page-heading">🏆 Leaderboard</h2>
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Total Points</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <tr key={entry.id}>
                        <td>
                          <span className={`rank-badge ${getRankClass(rank)}`}>
                            {rank}
                          </span>
                        </td>
                        <td><strong>{entry.user}</strong></td>
                        <td><span className="badge bg-info text-dark">{entry.team}</span></td>
                        <td><strong className="text-primary">{entry.total_points}</strong> pts</td>
                        <td>{new Date(entry.last_updated).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      <p className="mb-0">No leaderboard data found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-3 text-muted">
          <small>Total Participants: <strong>{leaderboard.length}</strong></small>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
