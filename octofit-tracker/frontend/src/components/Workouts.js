import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts component - Fetching from API endpoint:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts component - Raw API response:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts component - Processed workouts data:', workoutsData);
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts component - Error fetching workouts:', error);
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
        <p className="mt-3 text-muted">Loading workouts...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Workouts</h4>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    const difficultyLower = difficulty?.toLowerCase() || '';
    if (difficultyLower === 'easy' || difficultyLower === 'beginner') return 'success';
    if (difficultyLower === 'medium' || difficultyLower === 'intermediate') return 'warning';
    if (difficultyLower === 'hard' || difficultyLower === 'advanced') return 'danger';
    return 'secondary';
  };

  return (
    <div className="page-container">
      <div className="container">
        <h2 className="page-heading">💪 Workout Suggestions</h2>
        <div className="row">
          {workouts.length > 0 ? (
            workouts.map(workout => (
              <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card workout-card">
                  <div className="card-body">
                    <h5 className="card-title">{workout.name}</h5>
                    <span className={`badge bg-${getDifficultyBadge(workout.difficulty)} badge-difficulty mb-3`}>
                      {workout.difficulty}
                    </span>
                    <p className="card-text text-muted">{workout.description}</p>
                    <hr />
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <strong>Type:</strong> 
                        <span className="badge bg-info text-dark ms-2">{workout.workout_type}</span>
                      </li>
                      <li className="mb-2">
                        <strong>Duration:</strong> {workout.duration} minutes
                      </li>
                      <li className="mb-2">
                        <strong>Calories:</strong> 
                        <span className="badge bg-warning text-dark ms-2">{workout.calories_burned} cal</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center" role="alert">
                <p className="mb-0">No workout suggestions available at the moment.</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 text-muted">
          <small>Total Workouts: <strong>{workouts.length}</strong></small>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
