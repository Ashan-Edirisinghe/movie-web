const API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000';

// Add a movie rank
export const addRank = async (movieData) => {
  try {
    const response = await fetch(`${API_URL}/ranks/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movieTitle: movieData.movieTitle,
        movieId: movieData.movieId,
        movieImg: movieData.movieImg,
        count: movieData.count || 1
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add rank');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding rank:', error);
    throw error;
  }
};

// Update movie count
export const updateRankCount = async (movieId, count) => {
  try {
    const response = await fetch(`${API_URL}/ranks/count/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count })
    });

    if (!response.ok) {
      throw new Error('Failed to update rank');
      
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating rank:', error);
    throw error;
  }
};

// Find movie by title
export const findMovieByTitle = async (movieTitle) => {
  try {
    const response = await fetch(`${API_URL}/ranks/find/${encodeURIComponent(movieTitle)}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to find movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error finding movie:', error);
    throw error;
  }
};
