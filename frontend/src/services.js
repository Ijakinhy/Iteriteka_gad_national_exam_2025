const API_URL = 'http://localhost:3001/services';

// Fetch all services from the backend
export async function fetchServices() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return await response.json();
}

// Add a new service to the backend
export async function addService(service) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  if (!response.ok) {
    throw new Error('Failed to add service');
  }
  return await response.json();
}