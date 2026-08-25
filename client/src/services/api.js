import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('formflow_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function loginRequest(credentials) {
  const { data } = await api.post('/auth/login', credentials);
  return data;
}

export async function getCurrentUser() {
  const { data } = await api.get('/auth/me');
  return data;
}

export async function logoutRequest() {
  const { data } = await api.post('/auth/logout');
  return data;
}

export async function getForms() {
  const { data } = await api.get('/forms');
  return data;
}

export async function createForm(form) {
  const { data } = await api.post('/forms', form);
  return data;
}

export async function getForm(formId) {
  const { data } = await api.get(`/forms/${formId}`);
  return data;
}

export async function updateForm(formId, form) {
  const { data } = await api.put(`/forms/${formId}`, form);
  return data;
}
