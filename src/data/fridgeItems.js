const API_URL = import.meta.env.VITE_BACKEND_URL;

if (!API_URL) {
  throw new Error('API URL is required. Did you forget to set VITE_BACKEND_URL in your .env?');
}

const baseURL = `${API_URL}/fridge/items`;

/**
 * Get all fridge items for the current user
 */
export const getFridgeItems = async () => {
  const res = await fetch(baseURL, {
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || 'Failed to fetch fridge items');
  }

  return res.json();
};

/**
 * Add a new item to the fridge
 * @param {Object} itemData - { name, quantity, category, nutrition, isFavorite }
 */
export const addFridgeItem = async (itemData) => {
  const res = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(itemData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || 'Failed to add fridge item');
  }

  return res.json();
};

/**
 * Delete a fridge item by ID
 * @param {string} itemId
 */
export const deleteFridgeItem = async (itemId) => {
  const res = await fetch(`${baseURL}/${itemId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || 'Failed to delete fridge item');
  }
};

/**
 * Toggle the isFavorite state of an item
 * @param {string} itemId
 * @param {boolean} isFavorite
 */
export const toggleFavorite = async (itemId, isFavorite) => {
  const res = await fetch(`${baseURL}/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ isFavorite }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || 'Failed to update favorite status');
  }

  return res.json();
};

/**
 * Get all favorite fridge items
 */
export const getFavorites = async () => {
  const res = await fetch(`${API_URL}/fridge/favorites`, {
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || 'Failed to fetch favorite items');
  }

  return res.json();
};

/**
 * Get fridge items by category
 * @param {string} category - One of: Dairy, Meat, Vegetables, Fruits, Grains, other
 */
export const getItemsByCategory = async (category) => {
  const res = await fetch(`${baseURL}/category/${category}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || 'Failed to fetch items by category');
  }

  return res.json();
};
