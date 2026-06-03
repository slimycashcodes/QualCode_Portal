import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Automatically inject credentials into outbound requests
API.interceptors.request.use((config) => {
  const session = localStorage.getItem('portal_session');
  if (session) {
    const { role } = JSON.parse(session);
    config.headers['X-Authenticated-Role'] = role; // Appends token role validation to Spring Boot
  }
  return config;
});

export const moduleService = {
  getAll: (params) => API.get('/modules', { params }),
  getById: (id) => API.get(`/modules/${id}`),
  create: (data) => API.post('/modules', data),
  update: (id, data) => API.put(`/modules/${id}`, data),
};